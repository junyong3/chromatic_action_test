import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function OrganizationListHeader() {
  return (
    <ListHeader
      title="조직정보"
      navigation={{
        home: To.MDMHome,
        menuList: ['조직정보'],
      }}
      button={{
        text: '부서 추가',
        link: To.MDMConfigOrgCreate,
        sbkind: 'pages/MDM/config/Org/Create',
      }}
    />
  )
}

export default OrganizationListHeader
