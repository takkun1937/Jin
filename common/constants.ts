export const RoutePath = {
  Home: '/',
  PostContent: '/post-content',
} as const;

export const ApiPath = {
  Content: '/api/content',
  ContentCategory: '/api/content-category',
} as const;

export const ModalType = {
  None: 'none',
  Success: 'success',
  Error: 'error',
  Logout: 'logout',
  PostContent: 'postContent',
  ValidateMdValueError: 'validateMdValueError',
} as const;
