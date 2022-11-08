export const MDM_PARTNERS_API_PATH = {
  /**
   * * get: 협력체 목록
   * @param target vender | client
   */
  PARTNERS_LIST: (target: 'vender' | 'client') =>
    `/mdm/partners/${target}/list`,
  /**
   * * post: 협력체 추가
   * @param target vender | client
   */
  CREATE_PARTNERS: (target: 'vender' | 'client') => `/mdm/partners/${target}`,
  /**
   * * get: 협력체 상세
   * * patch: 협력체 수정
   * * delete: 협력체 삭제
   * @param target vender | client
   * @param id 아이디
   */
  PARTNERS_DETAIL: (target: 'vender' | 'client', id: string) =>
    `/mdm/partners/${target}/detail/${id}`,
  /**
   * post: 대표 상품 목록
   */
  KEY_GOODS_LIST: '/mdm/keyGoods/list',
}
