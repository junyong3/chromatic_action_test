import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'

function PaymentListHeader() {
  return (
    <ListHeader
      title="결제 목록 조회"
      navigation={{
        home: To.CommerceHome,
        menuList: ['결제 관리'],
      }}
    />
  )
}

export default PaymentListHeader
