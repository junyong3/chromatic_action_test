export const MDM_WAREHOUSE_API_PATH = {
  /**
   * * get: 창고정보 목록
   */
  WAREHOUSE_LIST: '/mdm/warehouse/list',
  WAREHOUSE_DETAIL: (id: string) => `/mdm/warehouse/${id}`,
  CREATE_WAREHOUSE: '/mdm/warehouse/save',
  UPDATE_WAREHOUSE: '/mdm/warehouse/update',
  DELETE_WAREHOUSE: '/mdm/warehouse/delete',
}
