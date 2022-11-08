export const COMMERCE_REVIEW_API_PATH = {
  /**
   * * get: 리뷰 목록
   */
  REVIEW_LIST: '/admin/review/list',
  /**
   * * get: 리뷰 목록
   */
  REVIEW_REPORT_LIST: (id: string) => `/admin/review/report/list/${id}`,
  /**
   * * 리뷰 상세
   */
  REVIEW_DETAIL: (id: string) => `/admin/review/detail/${id}`,
}
