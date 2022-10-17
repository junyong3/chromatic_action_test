import create from 'zustand'
import { ProductInfoTS } from '@pages/Product/Props'

export interface ProductSearchCondition {
  productName: string
  productCode: string
  customerName: string[]
  productType: string[]
}

interface ProductStoreState {
  searchCondition: ProductSearchCondition
  setSearchCondition: (searchCondition: ProductSearchCondition) => void

  productDataSet: ProductInfoTS
  setProductDataSet: (dataSet: Partial<ProductInfoTS>) => void
}

export const useProductStore = create<ProductStoreState>((set) => ({
  searchCondition: {
    productName: '',
    productCode: '',
    customerName: [],
    productType: [],
  },
  setSearchCondition: (searchCondition: ProductSearchCondition) =>
    set(() => ({ searchCondition })),

  productDataSet: {
    availableDays: [],
    basicUnit: '',
    boxQuantity: 0,
    brandType: '',
    consumptionPeriod: 0,
    group: '',
    isAutomaticOrdering: '',
    isUse: false,
    isUseSingleBarcode: '',
    leadTime: 0,
    loadedQuantityPerPallet: 0,
    materialCode: '',
    materialName: '',
    materialType: '',
    maxDeliveryAllowablePeriod: 0,
    maxOrderQuantity: 0,
    minDeliveryAllowablePeriod: 0,
    minOrderQuantity: 0,
    orderUnit: '',
    orderUnitQuantity: 0,
    ph1: '',
    ph2: '',
    ph3: '',
    procurementCategory: '',
    shelfLife: '',
    singleBarcode: 0,
    supplyStatus: false,
    warehousingUnit: 0,
  } as ProductInfoTS,
  setProductDataSet: (dataSet: Partial<ProductInfoTS>) => {
    set(({ productDataSet }) => ({
      productDataSet: { ...productDataSet, ...dataSet },
    }))
  },
}))
