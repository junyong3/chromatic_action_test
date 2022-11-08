import { Stack } from '@mui/material'
import Page from '@components/Page'
import CouponSearchBox from '@domain/Commerce/pages/Coupon/List/CouponSearchBox'
import CouponDataGrid from '@domain/Commerce/pages/Coupon/List/CouponDataGrid'
import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function CouponListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <ListHeader
          title="쿠폰 목록 조회"
          navigation={{
            home: To.CommerceHome,
            menuList: ['쿠폰 관리'],
          }}
          button={{
            text: '쿠폰 생성',
            link: To.CommerceCouponCreate,
            sbkind: 'pages/Commerce/Coupon/Create',
          }}
        />
        <CouponSearchBox />
        <CouponDataGrid />
      </Stack>
    </Page>
  )
}

export default CouponListPage
