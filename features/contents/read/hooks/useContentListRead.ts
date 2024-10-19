import { trpc } from '@/utils/trpc';
import { useCallback } from 'react';

interface UseContentListReadProps {
  isMyContent: boolean;
}

const numberOfContentsFetch = 30;

export const useContentListRead = ({
  isMyContent,
}: UseContentListReadProps) => {
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

  return { data, loadMoreContentList };
};
