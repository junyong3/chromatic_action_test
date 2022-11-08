import { IAM_API_PATH as API } from '@api/path/IAM/iamPath'

export const IAMMockPath = {
  UserList: `${API.USER_LIST}`,
  UserDetail: `${API.USER(':id')}`,
  RoleList: `${API.ROLE_LIST}`,
  RolePrepare: `${API.ROLE_PREPARE}`,
  CreateRole: `${API.ROLE_LIST}`,
  RoleDetail: `${API.ROLE(':id')}`,
  UpdateRole: `${API.ROLE(':id')}`,
  DeleteRole: `${API.ROLE(':id')}`,
  PermissionList: `${API.PERMISSION_LIST}`,
  CreatePermission: `${API.PERMISSION_LIST}`,
  PermissionDetail: `${API.PERMISSION(':id')}`,
  UpdatePermission: `${API.PERMISSION(':id')}`,
  DeletePermission: `${API.PERMISSION(':id')}`,
}
