export const MDM_GOODS_PRODUCT_API_PATH = {
  /**
   * * get: 제상품 목록
   */
  PRODUCT_LIST: '/mdm/product/list',
  /**
   * * get: 제상품 상세
   * * post: 제상품 수정
   * @param id 제상품 아이디
   */
  PRODUCT_DETAIL: (id: string) => `/mdm/product/${id}`,
  /**
   * * get: 거래처 목록
   */
  CUSTOMER_LIST: '/mdm/product/customer/list',
  /**
   * * post: 제상품 생성
   */
  CREATE_PRODUCT: '/mdm/product',
}
