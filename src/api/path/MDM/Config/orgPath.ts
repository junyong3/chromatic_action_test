export const MDM_ORG_API_PATH = {
  /**
   * * get: 조직정보 목록
   */
  ORG_LIST: '/mdm/org/list',
  ORG_DETAIL: (id: string) => `/mdm/org/${id}`,
  CREATE_ORG: '/mdm/org/save',
  UPDATE_ORG: '/mdm/org/update',
  DELETE_ORG: '/mdm/org/delete',
}
