import { MDM_FACTORY_API_PATH as FACTORY_API } from '@api/path/MDM/Config/factoryPath'
import { MDM_ORG_API_PATH as ORG_API } from '@api/path/MDM/Config/orgPath'
import { MDM_WAREHOUSE_API_PATH as WAREHOUSE_API } from '@api/path/MDM/Config/warehousePath'
import { MDM_GOODS_MATERIAL_API_PATH as MATERIAL_API } from '@api/path/MDM/Goods/materialPath'
import { MDM_GOODS_PRODUCT_API_PATH as PRODUCT_API } from '@api/path/MDM/Goods/productPath'
import { MDM_GOODS_PURCHASE_PRICE_API_PATH as PURCHASE_PRICE_API_PATH } from '@api/path/MDM/Goods/purchasePrice'
import { MDM_GOODS_SELLING_PRICE_API_PATH as SELLING_PRICE_API_PATH } from '@api/path/MDM/Goods/sellingPrice'
import { MDM_PARTNERS_API_PATH as PARTNERS_API } from '@api/path/MDM/partnersPath'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { HEALTH_CRET_API_PATH as CRET_API } from '@api/path/MDM/AddInfo/healthCertificatePath'

export const MDMMockPath = {
  FactoryList: `${FACTORY_API.FACTORY_LIST}`,
  FactoryDetail: `${FACTORY_API.FACTORY_DETAIL(':factoryCode')}`,
  CreateFactory: `${FACTORY_API.CREATE_FACTORY}`,
  UpdateFactory: `${FACTORY_API.UPDATE_FACTORY}`,
  DeleteFactory: `${FACTORY_API.DELETE_FACTORY}`,

  OrgList: `${ORG_API.ORG_LIST}`,
  OrgDetail: `${ORG_API.ORG_DETAIL(':deptCode')}`,
  CreateOrg: `${ORG_API.CREATE_ORG}`,
  UpdateOrg: `${ORG_API.UPDATE_ORG}`,
  DeleteOrg: `${ORG_API.DELETE_ORG}`,

  WarehouseList: `${WAREHOUSE_API.WAREHOUSE_LIST}`,
  WarehouseDetail: `${WAREHOUSE_API.WAREHOUSE_DETAIL(':warehouseCode')}`,
  CreateWarehouse: `${WAREHOUSE_API.CREATE_WAREHOUSE}`,
  UpdateWarehouse: `${WAREHOUSE_API.UPDATE_WAREHOUSE}`,
  DeleteWarehouse: `${WAREHOUSE_API.DELETE_WAREHOUSE}`,

  MaterialList: `${MATERIAL_API.MATERIAL_LIST}`,
  MaterialDetail: `${MATERIAL_API.MATERIAL_DETAIL(':id')}`,
  DeleteMaterial: `${MATERIAL_API.MATERIAL_DETAIL(':id')}`,
  MaterialCustomerList: `${MATERIAL_API.CUSTOMER_LIST}`,
  CreateMaterial: `${MATERIAL_API.CREATE_MATERIAL}`,
  UpdateMaterial: `${MATERIAL_API.MATERIAL_DETAIL(':id')}`,

  ProductList: `${PRODUCT_API.PRODUCT_LIST}`,
  ProductDetail: `${PRODUCT_API.PRODUCT_DETAIL(':id')}`,
  CreateProduct: `${PRODUCT_API.CREATE_PRODUCT}`,
  UpdateProduct: `${PRODUCT_API.PRODUCT_DETAIL(':id')}`,
  DeleteProduct: `${PRODUCT_API.PRODUCT_DETAIL(':id')}`,
  ProductCustomerList: `${PRODUCT_API.CUSTOMER_LIST}`,

  MaterialPurchasePriceList: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_LIST(
    GoodsType.Material
  )}`,
  MaterialPurchasePriceHistory: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_HISTORY(
    GoodsType.Material,
    ':id'
  )}`,
  CreateMaterialPurchasePrice: `${PURCHASE_PRICE_API_PATH.CREATE_PURCHASE_PRICE(
    GoodsType.Material
  )}`,
  MaterialPurchasePriceDetail: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_DETAIL(
    GoodsType.Material,
    ':id'
  )}`,

  ProductPurchasePriceList: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_LIST(
    GoodsType.Product
  )}`,
  ProductPurchasePriceHistory: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_HISTORY(
    GoodsType.Product,
    ':id'
  )}`,
  CreateProductPurchasePrice: `${PURCHASE_PRICE_API_PATH.CREATE_PURCHASE_PRICE(
    GoodsType.Product
  )}`,
  ProductPurchasePriceDetail: `${PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_DETAIL(
    GoodsType.Product,
    ':id'
  )}`,
  MaterialListForPurchasePrice: `${PURCHASE_PRICE_API_PATH.MATERIAL_LIST_FOR_PURCHASE_PRICE}`,
  ProductListForPurchasePrice: `${PURCHASE_PRICE_API_PATH.PRODUCT_LIST_FOR_PURCHASE_PRICE}`,

  ProductSellingPriceList: `${SELLING_PRICE_API_PATH.SELLING_PRICE_LIST}`,
  ProductSellingPriceHistory: `${SELLING_PRICE_API_PATH.SELLING_PRICE_HISTORY(
    ':id'
  )}`,
  CreateProductSellingPrice: `${SELLING_PRICE_API_PATH.CREATE_SELLING_PRICE}`,
  ProductSellingPriceDetail: `${SELLING_PRICE_API_PATH.SELLING_PRICE_DETAIL(
    ':id'
  )}`,
  ProductListForSellingPrice: `${SELLING_PRICE_API_PATH.PRODUCT_LIST_FOR_SELLING_PRICE}`,

  VenderList: `${PARTNERS_API.PARTNERS_LIST('vender')}`,
  CreateVender: `${PARTNERS_API.CREATE_PARTNERS('vender')}`,
  VenderDetail: `${PARTNERS_API.PARTNERS_DETAIL('vender', ':id')}`,

  ClientList: `${PARTNERS_API.PARTNERS_LIST('client')}`,
  CreateClient: `${PARTNERS_API.CREATE_PARTNERS('client')}`,
  ClientDetail: `${PARTNERS_API.PARTNERS_DETAIL('client', ':id')}`,

  KeyGoodsList: `${PARTNERS_API.KEY_GOODS_LIST}`,

  HealthCertificateList: `${CRET_API.LIST_HEALTH_CRET}`,
  HealthCertificateDetail: `${CRET_API.DETAIL_HEALTH_CRET(
    ':healthCertificateCode'
  )}`,
  CreateHealthCertificate: `${CRET_API.CREATE_HEALTH_CRET}`,
  UpdateHealthCertificate: `${CRET_API.UPDATE_HEALTH_CRET}`,
  DeleteHealthCertificate: `${CRET_API.DELETE_HEALTH_CRET}`,
}
