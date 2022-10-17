export const FACTORY_API_PATH = {
  /**
   * * get: 조직정보 목록
   */
  FACTORY_LIST: '/factory/list',
  FACTORY_DETAIL: (id: string) => `/factory/${id}`,
  FACTORY_CREATE: '/factory/save',
  FACTORY_UPDATE: '/factory/update',
  FACTORY_DELETE: '/factory/delete',
}
