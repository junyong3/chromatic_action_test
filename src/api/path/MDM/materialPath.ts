export const MDM_MATERIAL_API_PATH = {
  /**
   * * get: 원부자재 목록
   */
  MATERIAL_LIST: '/material/list',
  /**
   * * get: 원부자재 상세
   * * post: 원부자재 수정
   * @param id 원부자재 아이디
   */
  MATERIAL_DETAIL: (id: string) => `/material/${id}`,
  /**
   * * get: 거래처 목록
   */
  CUSTOMER_LIST: '/material/customer/list',
  /**
   * * post: 원부자재 생성
   */
  CREATE_MATERIAL: '/material',
}
