export const RoutePath = {
  Home: '/',
  Login: '/api/auth/signin',
  MyPage: '/my-page',
  PostContent: '/post-content',
} as const;

export const ModalType = {
  None: 'none',
  Completed: 'completed',
  ServerError: 'serverError',
  GetContentCategoryError: 'getContentCategoryError',
  GetContentsError: 'getContentsError',
  LogoutConfirm: 'logoutConfirm',
  PostContent: 'postContent',
  DraftOverwriteConfirm: 'draftOverwriteConfirm',
  PostContentValidateError: 'postContentValidateError',
  ValidateError: 'validateError',
} as const;

export const ErrorType = {
  Unauthorized: 'Unauthorized',
  GetContentCategory: 'getContentCategory',
  GetMyContents: 'getMyContents',
  PostContentValidate: 'postContentValidate',
  ServerError: 'serverError',
};
