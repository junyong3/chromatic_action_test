import { To } from '@routes/To'
import SidebarLayout from './SidebarLayout'

function CommerceLayout() {
  return (
    <SidebarLayout
      menuList={[
        { label: '회원 관리', to: To.CommerceMemberList },
        { label: '문의 관리', to: To.CommerceInquiry },
        { label: '공지 관리', to: To.CommerceNoticeList },
        { label: '리뷰 관리', to: To.CommerceReviewList },
        { label: '상품 관리', to: To.CommerceProductList },
        { label: '전시 관리', to: To.CommerceExhibit },
        { label: '검색 관리', to: To.CommerceSearch },
        { label: '적립금 관리', to: To.CommercePoint },
        { label: '쿠폰 관리', to: To.CommerceCouponList },
        { label: '알림 관리', to: To.CommerceNoti },
        { label: '주문 관리', to: To.CommerceOrderList },
        { label: '결제 관리', to: To.CommercePaymentList },
        { label: '반품/교환 관리', to: To.CommerceTakeBackList },
        { label: '기초정보 관리', to: To.CommerceInfo },
      ]}
    />
  )
}

export default CommerceLayout
