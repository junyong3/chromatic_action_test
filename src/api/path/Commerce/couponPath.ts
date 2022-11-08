export const COMMERCE_COUPON_API_PATH = {
  /**
   * * get: 적립금 목록
   */
  COUPON_LIST: '/admin/coupon/list',
  /**
   * * get: 쿠폰 상세
   * @param id 쿠폰 아이디
   */
  COUPON_DETAIL: (id: string) => `/admin/coupon/${id}`,
  /**
   * * patch: 쿠폰 활성상태 변경
   */
  SET_ACTIVE: (id: string) => `/admin/coupon/${id}/active`,
  /**
   * * post: 쿠폰 이름 유효성 검사
   */
  VALIDATE_COUPON_CODE: '/admin/verify/couponCode',
  /**
   * * post: 쿠폰 생성
   */
  CREATE_COUPON: '/admin/coupon',
  /**
   * * post: 쿠폰 임시 생성
   */
  CREATE_COUPON_TEMP: '/admin/coupon/temp',
  /**
   * * get: 제품 목록
   */
  PRODUCT_LIST: '/admin/product/list',
  /**
   * * get: 카테고리 목록
   */
  CATEGORY_LIST: '/admin/category/list',
  /**
   * * get: 고객 목록
   */
  CUSTOMER_LIST: '/admin/customer/list',
}
