import { Example } from './Example'
import { PaymentMock } from './Commerce/PaymentMock'
import { CouponMock } from './Commerce/CouponMock'
import { PointMock } from './Commerce/PointMock'
import { MemberMock } from './Commerce/MemberMock'
import { OrgMock } from './MDM/Config/OrgMock'
import { FactoryMock } from './MDM/Config/FactoryMock'
import { WarehouseMock } from './MDM/Config/WarehouseMock'
import { MaterialMock } from './MDM/Goods/MaterialMock'
import { ProductMock } from './MDM/Goods/ProductMock'
import { PurchasePriceMock } from './MDM/Goods/PurchasePriceMock'
import { SellingPriceMock } from './MDM/Goods/SellingPriceMock'
import { PartnersMock } from './MDM/PartnersMock'
import { AreaMock } from './MDM/Config/AreaMock'
import { LocationMock } from './MDM/Config/LocationMock'
import { CategoryMock as MDMCategoryMock } from './MDM/CategoryMock'
import { HealthCRETMock } from '@mocks/handlers/MDM/AddInfo/HealthCRETMock'
import { ReviewMock } from '@mocks/handlers/Commerce/ReviewMock'

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
    MDMCategoryMock.materialCategoryList,
    MDMCategoryMock.updateCategory,
    MaterialMock.MaterialList,
    MaterialMock.MaterialDetail,
    MaterialMock.DeleteMaterial,
    MaterialMock.CustomerList,
    MaterialMock.CreateMaterial,
    MaterialMock.UpdateMaterial,
    ReviewMock.ReviewList,
    ReviewMock.ReviewDetail,
    ReviewMock.ReportList,
    PartnersMock.VenderList,
    PartnersMock.CreateVender,
    PartnersMock.VenderDetail,
    PartnersMock.UpdateVender,
    PartnersMock.DeleteVender,
    PartnersMock.ClientList,
    PartnersMock.CreateClient,
    PartnersMock.ClientDetail,
    PartnersMock.UpdateClient,
    PartnersMock.DeleteClient,
    PartnersMock.KeyGoodsList,
    HealthCRETMock.HealthCRETList,
    HealthCRETMock.HealthCRETDetail,
    HealthCRETMock.UpdateHealthCRET,
    HealthCRETMock.CreateHealthCRET,
    HealthCRETMock.DeleteHealthCRET,
    OrgMock.OrgList,
    OrgMock.OrgDetail,
    OrgMock.UpdateOrg,
    OrgMock.DeleteOrg,
    OrgMock.OrgCreate,
    LocationMock.LocationList,
    LocationMock.LocationDetail,
    LocationMock.LocationUpdate,
    LocationMock.LocationDelete,
    LocationMock.LocationCreate,
    WarehouseMock.WarehouseList,
    WarehouseMock.DeleteWarehouse,
    WarehouseMock.UpdateWarehouse,
    WarehouseMock.WarehouseDetail,
    WarehouseMock.CreateWarehouse,
    AreaMock.AreaList,
    AreaMock.AreaDelete,
    AreaMock.AreaUpdate,
    AreaMock.AreaDetail,
    AreaMock.AreaCreate,
    FactoryMock.FactoryList,
    FactoryMock.DeleteFactory,
    FactoryMock.CreateFactory,
    FactoryMock.UpdateFactory,
    FactoryMock.FactoryDetail,
    ProductMock.ProductList,
    ProductMock.ProductDetail,
    ProductMock.ProductDelete,
    ProductMock.CustomerList,
    ProductMock.CreateProduct,
    ProductMock.UpdateProduct,

    PurchasePriceMock.MaterialPurchasePriceList,
    PurchasePriceMock.MaterialPurchasePriceHistory,
    PurchasePriceMock.CreateMaterialPurchasePrice,
    PurchasePriceMock.MaterialPurchasePriceDetail,
    PurchasePriceMock.UpdateMaterialPurchasePrice,
    PurchasePriceMock.DeleteMaterialPurchasePrice,
    PurchasePriceMock.ProductPurchasePriceList,
    PurchasePriceMock.ProductPurchasePriceHistory,
    PurchasePriceMock.CreateProductPurchasePrice,
    PurchasePriceMock.ProductPurchasePriceDetail,
    PurchasePriceMock.UpdateProductPurchasePrice,
    PurchasePriceMock.DeleteProductPurchasePrice,
    PurchasePriceMock.MaterialListForPurchasePrice,
    PurchasePriceMock.ProductListForPurchasePrice,

    SellingPriceMock.ProductSellingPriceList,
    SellingPriceMock.ProductSellingPriceHistory,
    SellingPriceMock.CreateProductSellingPrice,
    SellingPriceMock.ProductSellingPriceDetail,
    SellingPriceMock.UpdateProductSellingPrice,
    SellingPriceMock.DeleteProductSellingPrice,
    SellingPriceMock.ProductListForSellingPrice,

    Example.test,
  ]
}

export const mockAPiList = [...mockApiMerge()]
