export const HEALTH_CRET_API_PATH = {
  /**
   * * get: 로케이션 정보
   */
  LIST_HEALTH_CRET: '/mdm/healthCertificate/list',
  DETAIL_HEALTH_CRET: (id: string) => `/mdm/healthCertificate/${id}`,
  CREATE_HEALTH_CRET: '/mdm/healthCertificate/save',
  UPDATE_HEALTH_CRET: '/mdm/healthCertificate/update',
  DELETE_HEALTH_CRET: '/mdm/healthCertificate/delete',
}
