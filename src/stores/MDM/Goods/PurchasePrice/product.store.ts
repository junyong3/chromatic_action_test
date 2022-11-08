import create from 'zustand'
import {
  PurchasePriceTS,
  PurchasePriceSearchConditionTS,
} from '@domain/MDM/pages/Goods/PurchasePrice/Props'

interface ProductPurchasePriceStoreState {
  searchCondition: PurchasePriceSearchConditionTS
  setSearchCondition: (dataSet: Partial<PurchasePriceSearchConditionTS>) => void

  productPurchasePriceDateSet: PurchasePriceTS
  setProductPurchasePriceDataSet: (dataSet: Partial<PurchasePriceTS>) => void

  selectPurchasePriceId: string
  setPurchasePriceId: (selectPurchasePriceId: string) => void
}

export const useProductPurchasePriceStore =
  create<ProductPurchasePriceStoreState>((set) => ({
    searchCondition: {
      baseDate: '',
      supplier: '',
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<PurchasePriceSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),

    productPurchasePriceDateSet: {
      id: undefined,
      goods: {
        code: '',
        name: '',
      },
      supplier: '',
      price: 0,
      availableStartDate: undefined,
      register: '',
    },
    setProductPurchasePriceDataSet: (dataSet: Partial<PurchasePriceTS>) => {
      set(({ productPurchasePriceDateSet }) => ({
        productPurchasePriceDateSet: {
          ...productPurchasePriceDateSet,
          ...dataSet,
        },
      }))
    },
    selectPurchasePriceId: '',
    setPurchasePriceId: (selectPurchasePriceId: string) =>
      set({ selectPurchasePriceId }),
  }))
