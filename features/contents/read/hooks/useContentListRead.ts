import { ContentListType } from '@/types';
import { trpc } from '@/utils/trpc';
import { useCallback, useEffect, useState } from 'react';

interface UseContentListReadProps {
  isMyContent: boolean;
}

const numberOfContentsFetch = 3;

export const useContentListRead = ({
  isMyContent,
}: UseContentListReadProps) => {
  const [contentList, setContentList] = useState<ContentListType>([]);
  const { data, fetchNextPage } = isMyContent
    ? trpc.content.getMyContentList.useInfiniteQuery(
        {
          limit: numberOfContentsFetch,
        },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      )
    : trpc.content.getContentList.useInfiniteQuery(
        {
          limit: numberOfContentsFetch,
        },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
      );

  const loadMoreContentList = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    setContentList(data?.pages.flatMap((page) => page.contents) ?? []);
  }, [data]);

  return { contentList, loadMoreContentList };
};
