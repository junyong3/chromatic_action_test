export const ORG_API_PATH = {
  /**
   * * get: 조직정보 목록
   */
  ORG_LIST: '/org/list',
  ORG_DETAIL: (id: string) => `/org/${id}`,
  ORG_CREATE: '/org/save',
  ORG_UPDATE: '/org/update',
  ORG_DELETE: '/org/delete',
}
