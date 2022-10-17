export const IAM_API_PATH = {
  /**
   * * post: 로그인
   */
  LOGIN: '/users/sign-in',
  /**
   * * post: 비밀번호 변경
   */
  CHANGE_PASSWORD: '/users/reset-password',
  /**
   * * post: refresh 토큰 발급
   */
  REFRESH_TOKENS: '/users/refresh-tokens',
  /**
   * * get: 내부회원 목록
   */
  USER_LIST: '/users',
  /**
   * * get: 내부회원 상세
   * @param id 내부회원 아이디
   */
  USER: (id: string) => `/users/${id}`,
  /**
   * * get: 역할 목록
   * * post: 역할 생성
   */
  ROLE_LIST: '/roles',
  /**
   * * get: 역할 상세
   * * put: 역할 수정
   * * delete: 역할 삭제
   * @param id 역할 아이디
   */
  ROLE: (id: string) => `/roles/${id}`,
  /**
   * * get: 역할 생성을 위한 데이터
   */
  ROLE_PREPARE: '/roles/prepare-creation',
  /**
   * * get: 권한 목록
   * * post: 권한 생성
   */
  PERMISSION_LIST: '/permissions',
  /**
   * * get: 권한 상세
   * * put: 권한 수정
   * * delete: 권한 삭제
   * @param id 권한 아이디
   */
  PERMISSION: (id: string) => `/permissions/${id}`,
} as const
