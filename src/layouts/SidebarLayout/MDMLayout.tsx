import { To } from '@routes/To'
import SidebarLayout from './SidebarLayout'

function MDMLayout() {
  return (
    <SidebarLayout
      menuList={[
        {
          label: '구성',
          subMenuList: [
            { label: '조직정보', to: To.MDMConfigOrg },
            { label: '공장/센터정보', to: To.MDMConfigFactory },
            { label: '창고정보', to: To.MDMConfigWarehouse },
            { label: '구역정보', to: To.MDMConfigArea },
            { label: '로케이션정보', to: To.MDMConfigLocation },
          ],
        },
        {
          label: '원부자재/제상품',
          subMenuList: [
            { label: '원부자재 관리', to: To.MDMGoodsMaterial },
            { label: '제상품 관리', to: To.MDMGoodsProduct },
            {
              label: '원부자재 구매 가격 관리',
              to: To.MDMGoodsMaterialPurchasePrice,
            },
            {
              label: '제상품 구매 가격 관리',
              to: To.MDMGoodsProductPurchasePrice,
            },
            {
              label: '제상품 판매 가격 관리',
              to: To.MDMGoodsMaterialSellingPrice,
            },
          ],
        },
        {
          label: '협력사',
          subMenuList: [
            { label: '매입처 관리', to: To.MDMHome },
            { label: '매출처 관리', to: To.MDMHome },
          ],
        },
        {
          label: '생산정보',
          subMenuList: [
            { label: '생산 라인 관리', to: To.MDMHome },
            { label: 'BOM 관리', to: To.MDMHome },
            { label: '공정도 관리', to: To.MDMHome },
          ],
        },
        {
          label: '기기정보',
          subMenuList: [{ label: '기기 관리', to: To.MDMHome }],
        },
        {
          label: '배송정보',
          subMenuList: [{ label: '배송지역 관리', to: To.MDMHome }],
        },
        {
          label: '부가정보',
          subMenuList: [{ label: '보건증 관리', to: To.MDMHome }],
        },
      ]}
    />
  )
}

export default MDMLayout
