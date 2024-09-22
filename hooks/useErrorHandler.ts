import { modalAtom } from '@/atoms';
import { ErrorType, ModalType, RoutePath } from '@/common/constants';
import { TRPCClientError } from '@trpc/client';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ZodError } from 'zod';

export const useErrorHandler = () => {
  const router = useRouter();
  const setModalAtom = useSetAtom(modalAtom);

  const handleError = useCallback(
    (error: unknown) => {
      console.log(error);
      if (error instanceof TRPCClientError || error instanceof Error) {
        switch (error.message) {
          case ErrorType.Unauthorized: {
            router.push(RoutePath.Login);
          }
          case ErrorType.GetContentCategory: {
            setModalAtom(ModalType.GetContentCategoryError);
            break;
          }
          case ErrorType.GetMyContents: {
            setModalAtom(ModalType.GetContentsError);
            break;
          }
          case ErrorType.ServerError: {
            setModalAtom(ModalType.ServerError);
            break;
          }
        }
      } else if (error instanceof ZodError) {
        switch (error.issues[0].message) {
          case ErrorType.PostContentValidate: {
            setModalAtom(ModalType.PostContentValidateError);
            break;
          }
          default: {
            setModalAtom(ModalType.ValidateError);
            break;
          }
        }
      } else {
        setModalAtom(ModalType.ServerError);
      }
    },
    [router, setModalAtom],
  );

  return { handleError };
};
