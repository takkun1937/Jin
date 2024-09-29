export const RoutePath = {
  Home: '/',
  Login: '/api/auth/signin',
  MyContent: '/my-content',
  MyContentEdit: '/my-content/edit',
  MyContentList: '/my-content/list',
  MyContentPost: '/my-content/post',
} as const;

export const ModalType = {
  None: 'none',
  Confirm: 'confirm',
  Completed: 'completed',
  Error: 'error',
} as const;

export const ErrorType = {
  Unauthorized: 'Unauthorized',
  GetContentCategory: 'getContentCategory',
  GetMyContentList: 'getMyContentList',
  ValidCreateContent: 'validCreateContent',
  DeleteContent: 'deleteContent',
  UpdateContent: 'updateContent',
  ServerError: 'serverError',
};
