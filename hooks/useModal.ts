import { useCallback, useState } from 'react';

type UseModalOptions = {
  isShowModal: boolean;
  toggleShowModal: (isShow: boolean) => void;
};

export const useModal = (): UseModalOptions => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleShowModal = useCallback((isShow: boolean) => {
    setIsShowModal(isShow);
  }, []);

  return { isShowModal, toggleShowModal };
};
