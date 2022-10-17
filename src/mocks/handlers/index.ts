import { Example } from '@mocks/handlers/Example'
import { PaymentMock } from '@mocks/handlers/PaymentMock'
import { CouponMock } from '@mocks/handlers/CouponMock'
import { PointMock } from '@mocks/handlers/PointMock'
import { MemberMock } from '@mocks/handlers/MemberMock'
import { OrgMock } from '@mocks/handlers/OrgMock'
import { MaterialMock } from '@mocks/handlers/MaterialMock'
import { ProductMock } from './ProductMock'
import { FactoryMock } from '@mocks/handlers/FactoryMock'

// 개발 하면서 사용해야하는 mock api를 추가해서 사용한다
const mockApiMerge = () => {
  return [
    PaymentMock.PaymentList,
    PaymentMock.PaymentHistory,
    PaymentMock.UpdatePayment,
    PointMock.CreatePointPaymentTarget,
    PointMock.PointList,
    PointMock.PointFailedList,
    PointMock.DeletePointPayment,
    CouponMock.CouponList,
    CouponMock.VerifyCouponCode,
    CouponMock.CreateCoupon,
    CouponMock.UpdateCoupon,
    CouponMock.CouponSetActive,
    CouponMock.CouponDetail,
    CouponMock.ProductList,
    CouponMock.CategoryList,
    CouponMock.CustomerList,
    MemberMock.CSCouponList,
    MemberMock.MemberCouponList,
    MemberMock.GiveMemberCoupon,
    MemberMock.DeleteMemberCoupon,
    MemberMock.MemberPointHistoryList,
    MemberMock.UseMemberPoint,
    MemberMock.GiveMemberPoint,
    MemberMock.ToggleMemberCouponExposed,
    MemberMock.ToggleMemberPointHistoryExposed,
    MaterialMock.MaterialList,
    MaterialMock.MaterialDetail,
    MaterialMock.MaterialDelete,
    MaterialMock.CustomerList,
    MaterialMock.MaterialCreate,
    MaterialMock.MaterialUpdate,
    OrgMock.OrgList,
    OrgMock.OrgDetail,
    OrgMock.OrgUpdate,
    OrgMock.OrgDelete,
    OrgMock.OrgCreate,
    FactoryMock.FactoryList,
    FactoryMock.FactoryDelete,
    FactoryMock.FactoryCreate,
    FactoryMock.FactoryUpdate,
    FactoryMock.FactoryDetail,
    ProductMock.ProductList,
    ProductMock.ProductDetail,
    ProductMock.ProductDelete,
    ProductMock.CustomerList,
    ProductMock.ProductCreate,
    ProductMock.ProductUpdate,
    Example.test,
  ]
}

export const mockAPiList = [...mockApiMerge()]
