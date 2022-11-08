export const LOCATION_API_PATH = {
  /**
   * * get: 로케이션 정보
   */
  LOCATION_LIST: '/mdm/location/list',
  LOCATION_DETAIL: (id: string) => `/mdm/location/${id}`,
  LOCATION_CREATE: '/mdm/location/save',
  LOCATION_UPDATE: '/mdm/location/update',
  LOCATION_DELETE: '/mdm/location/delete',
}
