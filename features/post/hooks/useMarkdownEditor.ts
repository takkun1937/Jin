import { useErrorHandler } from '@/hooks/useErrorHandler';
import { trpc } from '@/utils/trpc';

export const useMarkdownEditor = () => {
  const { handleError } = useErrorHandler();
  const { data, error } = trpc.content.getContentCategory.useQuery();

  if (error) {
    handleError(error);
  }

  return { contentCategories: data ?? [] };
};
