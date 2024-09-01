export const RoutePath = {
  Home: '/',
  MyPage: '/my-page',
  PostContent: '/post-content',
} as const;

export const ApiPath = {
  SignIn: '/api/auth/signin',
  MyContents: '/api/my-contents',
  ContentCategory: '/api/content-category',
} as const;

export const ResponseErrorType = {
  BadRequest: { message: 'Bad Request', status: 400 },
  Unauthorized: { message: 'Unauthorized', status: 401 },
  InternalServerError: { message: 'Internal Server Error', status: 500 },
} as const;

export const ModalType = {
  None: 'none',
  Success: 'success',
  Error: 'error',
  Logout: 'logout',
  PostContent: 'postContent',
  ConfirmDraftOverwrite: 'confirmDraftOverwrite',
  ValidateMdValueError: 'validateMdValueError',
} as const;
