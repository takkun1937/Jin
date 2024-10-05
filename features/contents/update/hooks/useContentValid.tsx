import { ErrorType } from '@/common/constants';
import { useModalHandler } from '@/hooks/useModalHandler';
import { contentSchema } from '@/server/schema/content';
import { ContentType } from '@/types';
import { useCallback } from 'react';

export const useContentValid = () => {
  const { handleErrorModal } = useModalHandler();

  const validContent = useCallback(
    (postContent: ContentType): boolean => {
      try {
        contentSchema.parse(postContent);
        return true;
      } catch (error) {
        console.log(error);
        handleErrorModal(new Error(ErrorType.ValidContent));
        return false;
      }
    },
    [handleErrorModal],
  );

  return { validContent };
};
