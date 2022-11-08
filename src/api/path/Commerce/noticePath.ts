export const COMMERCE_NOTICE_API_PATH = {
  /**
   * * get: 공지 목록
   */
  NOTICE_LIST: '/admin/contact/notices',
  /**
   * * post: 공지 생성
   */
  CREATE_NOTICE: '/admin/contact/notices',
  /**
   * * get: 공지 상세
   * * patch: 공지 수정
   * * delete: 공지 삭제
   * @param id 공지 아이디
   */
  NOTICE_DETAIL: (id: string) => `/admin/contact/notices/${id}`,
}
