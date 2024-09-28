import { modalAtom } from '@/atoms';
import { ErrorType, RoutePath } from '@/common/constants';
import { TRPCClientError } from '@trpc/client';
import { useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ZodError } from 'zod';

type CompletedModalType = 'postContent' | 'saveDraftContent';

export const useModalHandler = () => {
  const router = useRouter();
  const t = useTranslations();
  const setModalAtom = useSetAtom(modalAtom);

  const handleCompetedModal = useCallback(
    (completedModalType: CompletedModalType) => {
      switch (completedModalType) {
        case 'postContent': {
          setModalAtom({
            modal: {
              type: 'completed',
              title: t('modal.title.post_content_completed'),
              message: t('modal.message.post_content_completed'),
            },
          });
          break;
        }
        case 'saveDraftContent': {
          setModalAtom({
            modal: {
              type: 'completed',
              title: t('modal.title.save_draft_content_completed'),
              message: t('modal.message.save_draft_content_completed'),
            },
          });
          break;
        }
        default: {
          setModalAtom(RESET);
        }
      }
    },
    [setModalAtom, t],
  );

  const handleErrorModal = useCallback(
    (error: unknown) => {
      console.log(error);
      if (error instanceof TRPCClientError || error instanceof Error) {
        switch (error.message) {
          case ErrorType.Unauthorized: {
            router.push(RoutePath.Login);
          }
          case ErrorType.GetContentCategory: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.get_content_category_error'),
                message: t('modal.message.get_content_category_error'),
              },
            });
            break;
          }
          case ErrorType.GetMyContentList: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.get_my_content_list_error'),
                message: t('modal.message.get_my_content_list_error'),
              },
            });
            break;
          }
          case ErrorType.ValidPostContent: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.valid_post_content_error'),
                message: t('modal.message.valid_post_content_error'),
              },
            });
            break;
          }
          case ErrorType.ServerError: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.server_error'),
                message: t('modal.message.server_error'),
              },
            });
            break;
          }
        }
      } else if (error instanceof ZodError) {
        switch (error.issues[0].message) {
          case ErrorType.ValidPostContent: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.valid_post_content_error'),
                message: t('modal.message.valid_post_content_error'),
              },
            });
            break;
          }
          default: {
            setModalAtom({
              modal: {
                type: 'error',
                title: t('modal.title.valid_error'),
                message: t('modal.message.valid_error'),
              },
            });
            break;
          }
        }
      } else {
        setModalAtom({
          modal: {
            type: 'error',
            title: t('modal.title.server_error'),
            message: t('modal.message.server_error'),
          },
        });
      }
    },
    [router, setModalAtom, t],
  );

  return { handleCompetedModal, handleErrorModal };
};
