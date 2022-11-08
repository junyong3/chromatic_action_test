import { Tab } from '@components/Tab'
import { useNavigate, useParams } from 'react-router-dom'
import {
  MemberCouponTab,
  MemberPointTab,
  MemberRefundAccountTab,
  MemberPaymentTab,
} from './Tab'
import { To } from '@routes/To'

function MemberTab() {
  const { id } = useParams()
  const navigate = useNavigate()
  if (!id) {
    // id 가 없는 경우 목록으로 페이지 이동시킨다.
    navigate(To.CommerceMemberList)
  }

  const tabList = [
    {
      tabKey: 'card',
      label: '카드',
      children: <MemberPaymentTab />,
    },
    {
      tabKey: 'refund-account',
      label: '환급 계좌',
      children: <MemberRefundAccountTab memberId={id as string} />,
    },
    { label: '쿠폰', children: <MemberCouponTab memberId={id as string} /> },
    { label: '적립금', children: <MemberPointTab memberId={id as string} /> },
    { label: 'TAB4', children: <div>TAB44444</div> },
    { label: 'TAB5', children: <div>TAB55555</div> },
  ]
  return <Tab tabList={tabList} />
}

export default MemberTab
