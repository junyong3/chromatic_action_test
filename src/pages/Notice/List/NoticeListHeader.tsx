import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'

function NoticeListHeader() {
  return (
    <ListHeader
      title="공지사항 조회"
      button={{
        text: '공지 생성',
        link: To.CommerceNoticeCreate,
        sbKind: 'pages/Commerce/NoticeCreateUpdate',
      }}
      navigation={{
        home: To.CommerceHome,
        menuList: ['공지 관리'],
      }}
    />
  )
}

export default NoticeListHeader
