import { To } from '@routes/To'
import SidebarLayout from './SidebarLayout'

function IAMLayout() {
  return (
    <SidebarLayout
      menuList={[
        { label: '역할 관리', to: To.IAMRoleList },
        {
          label: '사용자 관리',
          to: To.IAMUserList,
        },
        {
          label: '권한 관리',
          to: To.IAMPermissionList,
        },
      ]}
    />
  )
}

export default IAMLayout
