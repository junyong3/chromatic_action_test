export const COMMERCE_NOTICE_API_PATH = {
  /**
   * * get: 공지 목록
   */
  NOTICE_LIST: '/contact/notices',
  /**
   * * post: 공지 생성
   */
  CREATE_NOTICE: '/contact/notices',
  /**
   * * get: 공지 상세
   * * patch: 공지 수정
   * * delete: 공지 삭제
   * @param id 공지 아이디
   */
  NOTICE_DETAIL: (id: string) => `/contact/notices/${id}`,
}
