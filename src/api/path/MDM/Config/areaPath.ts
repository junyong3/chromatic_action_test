export const AREA_API_PATH = {
  /**
   * * get: 조직정보 목록
   */
  AREA_LIST: '/mdm/area/list',
  AREA_DETAIL: (id: string) => `/mdm/area/${id}`,
  AREA_CREATE: '/mdm/area/save',
  AREA_UPDATE: '/mdm/area/update',
  AREA_DELETE: '/mdm/area/delete',
}
