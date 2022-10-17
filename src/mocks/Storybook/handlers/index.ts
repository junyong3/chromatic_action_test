import { NoticeMock } from '@mocks/handlers/NoticeMock'
import { Example } from '@mocks/handlers/Example'
import { PaymentMock } from '@mocks/handlers/PaymentMock'
import { CouponMock } from '@mocks/handlers/CouponMock'
import { MemberMock } from '@mocks/handlers/MemberMock'
import { PointMock } from '@mocks/handlers/PointMock'
import { PermissionMock } from '@src/mocks/handlers/PermissionMock'
import { RoleMock } from '@src/mocks/handlers/RoleMock'
import { UserMock } from '@mocks/handlers/UserMock'
import { OrgMock } from '@mocks/handlers/OrgMock'
import { MaterialMock } from '@src/mocks/handlers/MaterialMock'
import { ProductMock } from '@mocks/handlers/ProductMock'
import { FactoryMock } from '@mocks/handlers/FactoryMock'

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
    ...OrgMock,
    ...FactoryMock,
    ...MaterialMock,
    ...ProductMock,
    ...Example,
  }

  return Object.values(mockList)
}

export const StorybookMockAPIList = [...mockApiMerge()]
