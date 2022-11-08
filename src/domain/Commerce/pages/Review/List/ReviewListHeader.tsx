import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'

function ReviewListHeader() {
  return (
    <ListHeader
      title="리뷰 목록 조회"
      navigation={{
        home: To.CommerceHome,
        menuList: ['리뷰 관리'],
      }}
    />
  )
}

export default ReviewListHeader
