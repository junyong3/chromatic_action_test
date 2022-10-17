import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'

function CouponListHeader() {
  return (
    <ListHeader
      title="쿠폰 목록 조회"
      navigation={{
        home: To.CommerceHome,
        menuList: ['쿠폰 관리'],
      }}
      button={{
        text: '쿠폰 생성',
        link: To.CommerceCouponCreate,
        sbKind: 'pages/Commerce/Coupon/CouponCreateUpdate',
      }}
    />
  )
}

export default CouponListHeader
