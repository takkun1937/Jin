import { useModalHandler } from '@/hooks/useModalHandler';
import { trpc } from '@/utils/trpc';

export const useMarkdownEditor = () => {
  const { handleErrorModal } = useModalHandler();
  const { data, error } = trpc.content.getContentCategory.useQuery();

  if (error) {
    handleErrorModal(error);
  }

  return { contentCategories: data ?? [] };
};
