import { GoodsType } from '@domain/MDM/pages/Goods/Props'

export const MDM_GOODS_PURCHASE_PRICE_API_PATH = {
  /**
   * * get: 구매 가격 목록
   * @param target material | product
   */
  PURCHASE_PRICE_LIST: (target: GoodsType) =>
    `/mdm/goods/${target}PurchasePrice/list`,
  /**
   * * post: 구매 가격 추가
   * @param target material | product
   */
  CREATE_PURCHASE_PRICE: (target: GoodsType) =>
    `/mdm/goods/${target}PurchasePrice`,
  /**
   * * get: 원부자재/제상품 구매 가격 상세
   * * patch: 원부자재/제상품 구매 가격 수정
   * * delete: 원부자재/제상품 구매 가격 삭제
   * @param target material | product
   * @param id 구매 가격 id
   */
  PURCHASE_PRICE_DETAIL: (target: GoodsType, id: string) =>
    `/mdm/goods/${target}PurchasePrice/${id}`,
  /**
   * * get: 원부자재/제상품 구매 가격 변동 내역
   * @param target material | product
   * @param id 구매 가격 id
   */
  PURCHASE_PRICE_HISTORY: (target: GoodsType, id: string) =>
    `/mdm/goods/${target}PurchasePrice/${id}/history`,
  /**
   * get: 원부자재 목록
   */
  MATERIAL_LIST_FOR_PURCHASE_PRICE:
    '/mdm/goods/materialPurchasePrice/material/list',
  /**
   * get: 제상품 목록
   */
  PRODUCT_LIST_FOR_PURCHASE_PRICE:
    '/mdm/goods/productPurchasePrice/product/list',
}
