export const MDM_GOODS_SELLING_PRICE_API_PATH = {
  /**
   * * get: 판매 가격 목록
   */
  SELLING_PRICE_LIST: '/mdm/goods/ProductSellingPrice/list',
  /**
   * * post: 판매 가격 추가
   */
  CREATE_SELLING_PRICE: '/mdm/goods/ProductSellingPrice',
  /**
   * * get: 제상품 판매 가격 상세
   * * patch: 제상품 판매 가격 수정
   * * delete: 제상품 판매 가격 삭제
   * @param id 판매 가격 id
   */
  SELLING_PRICE_DETAIL: (id: string) => `/mdm/goods/ProductSellingPrice/${id}`,
  /**
   * * get: 제상품 판매 가격 변동 내역
   * @param id 판매 가격 id
   */
  SELLING_PRICE_HISTORY: (id: string) =>
    `/mdm/goods/ProductSellingPrice/${id}/history`,
  /**
   * get: 제상품 목록
   */
  PRODUCT_LIST_FOR_SELLING_PRICE: '/mdm/goods/productSellingPrice/product/list',
}
