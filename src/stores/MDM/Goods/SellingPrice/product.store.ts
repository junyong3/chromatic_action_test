import create from 'zustand'
import {
  SellingPriceSearchConditionTS,
  SellingPriceTS,
} from '@domain/MDM/pages/Goods/SellingPrice/Props'

interface ProductSellingPriceStoreState {
  searchCondition: SellingPriceSearchConditionTS
  setSearchCondition: (dataSet: Partial<SellingPriceSearchConditionTS>) => void

  productSellingPriceDateSet: SellingPriceTS
  setProductSellingPriceDataSet: (dataSet: Partial<SellingPriceTS>) => void

  selectSellingPriceId: string
  setSellingPriceId: (selectSellingPriceId: string) => void
}

export const useProductSellingPriceStore =
  create<ProductSellingPriceStoreState>((set) => ({
    searchCondition: {
      baseDate: '',
      customer: '',
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<SellingPriceSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),

    productSellingPriceDateSet: {
      id: undefined,
      goods: {
        code: '',
        name: '',
      },
      customer: '',
      price: 0,
      availableStartDate: undefined,
      register: '',
    },
    setProductSellingPriceDataSet: (dataSet: Partial<SellingPriceTS>) => {
      set(({ productSellingPriceDateSet }) => ({
        productSellingPriceDateSet: {
          ...productSellingPriceDateSet,
          ...dataSet,
        },
      }))
    },
    selectSellingPriceId: '',
    setSellingPriceId: (selectSellingPriceId: string) =>
      set({ selectSellingPriceId }),
  }))
