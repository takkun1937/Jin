import { useModalHandler } from '@/hooks/useModalHandler';
import { trpc } from '@/utils/trpc';
import { useEffect } from 'react';

export const useMarkdownEditor = () => {
  const { handleErrorModal } = useModalHandler();
  const { data, error } = trpc.content.getContentCategory.useQuery();

  if (error) {
    handleErrorModal(error);
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    // コンポーネントがマウントされたときにイベントリスナーを登録
    window.addEventListener('beforeunload', handleBeforeUnload);

    // コンポーネントがアンマウントされたときにイベントリスナーを解除
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { contentCategories: data ?? [] };
};
