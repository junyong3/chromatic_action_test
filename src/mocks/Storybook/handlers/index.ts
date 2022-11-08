import { Example } from '@mocks/handlers/Example'
import { AreaMock } from '@mocks/handlers/MDM/Config/AreaMock'
import { PermissionMock } from '@mocks/handlers/IAM/PermissionMock'
import { RoleMock } from '@mocks/handlers/IAM/RoleMock'
import { UserMock } from '@mocks/handlers/IAM/UserMock'
import { NoticeMock } from '@mocks/handlers/Commerce/NoticeMock'
import { PaymentMock } from '@mocks/handlers/Commerce/PaymentMock'
import { CouponMock } from '@mocks/handlers/Commerce/CouponMock'
import { MemberMock } from '@mocks/handlers/Commerce/MemberMock'
import { PointMock } from '@mocks/handlers/Commerce/PointMock'
import { OrgMock } from '@mocks/handlers/MDM/Config/OrgMock'
import { MaterialMock } from '@src/mocks/handlers/MDM/Goods/MaterialMock'
import { ProductMock } from '@src/mocks/handlers/MDM/Goods/ProductMock'
import { PurchasePriceMock } from '@src/mocks/handlers/MDM/Goods/PurchasePriceMock'
import { SellingPriceMock } from '@src/mocks/handlers/MDM/Goods/SellingPriceMock'
import { FactoryMock } from '@mocks/handlers/MDM/Config/FactoryMock'
import { WarehouseMock } from '@mocks/handlers/MDM/Config/WarehouseMock'
import { PartnersMock } from '@mocks/handlers/MDM/PartnersMock'
import { LocationMock } from '@mocks/handlers/MDM/Config/LocationMock'
import { CategoryMock as CommerceCategoryMock } from '@mocks/handlers/Commerce/CategoryMock'
import { CategoryMock as MDMCategoryMock } from '@mocks/handlers/MDM/CategoryMock'
import { HealthCRETMock } from '@mocks/handlers/MDM/AddInfo/HealthCRETMock'
import { ReviewMock } from '@mocks/handlers/Commerce/ReviewMock'

const mockApiMerge = () => {
  // 스토리북에서 사용하고 싶음 mock api를 추가 해준다.
  const mockList = {
    ...PermissionMock,
    ...RoleMock,
    ...UserMock,
    ...NoticeMock,
    ...PaymentMock,
    ...PointMock,
    ...CouponMock,
    ...MemberMock,
    ...CommerceCategoryMock,
    ...MDMCategoryMock,
    ...OrgMock,
    ...AreaMock,
    ...FactoryMock,
    ...WarehouseMock,
    ...MaterialMock,
    ...ProductMock,
    ...PurchasePriceMock,
    ...SellingPriceMock,
    ...PartnersMock,
    ...LocationMock,
    ...HealthCRETMock,
    ...ReviewMock,
    ...Example,
  }

  return Object.values(mockList)
}

export const StorybookMockAPIList = [...mockApiMerge()]
