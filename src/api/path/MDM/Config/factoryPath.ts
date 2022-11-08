export const MDM_FACTORY_API_PATH = {
  /**
   * * get: 조직정보 목록
   */
  FACTORY_LIST: '/mdm/factory/list',
  FACTORY_DETAIL: (id: string) => `/mdm/factory/${id}`,
  CREATE_FACTORY: '/mdm/factory/save',
  UPDATE_FACTORY: '/mdm/factory/update',
  DELETE_FACTORY: '/mdm/factory/delete',
}
