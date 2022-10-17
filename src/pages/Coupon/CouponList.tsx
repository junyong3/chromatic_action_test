import Page from '@components/Page'
import CouponListHeader from './List/CouponListHeader'
import CouponSearchBox from '@pages/Coupon/List/CouponSearchBox'
import CouponDataGrid from '@pages/Coupon/List/CouponDataGrid'
import { Stack } from '@mui/material'

function CouponList() {
  return (
    <Page>
      <Stack spacing={3}>
        <CouponListHeader />
        <CouponSearchBox />
        <CouponDataGrid />
      </Stack>
    </Page>
  )
}

export default CouponList
