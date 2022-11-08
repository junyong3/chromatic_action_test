import create from 'zustand'
import {
  PurchasePriceTS,
  PurchasePriceSearchConditionTS,
} from '@domain/MDM/pages/Goods/PurchasePrice/Props'

interface MaterialPurchasePriceStoreState {
  searchCondition: PurchasePriceSearchConditionTS
  setSearchCondition: (dataSet: Partial<PurchasePriceSearchConditionTS>) => void

  materialPurchasePriceDateSet: PurchasePriceTS
  setMaterialPurchasePriceDataSet: (dataSet: Partial<PurchasePriceTS>) => void

  selectPurchasePriceId: string
  setPurchasePriceId: (selectPurchasePriceId: string) => void
}

export const useMaterialPurchasePriceStore =
  create<MaterialPurchasePriceStoreState>((set) => ({
    searchCondition: {
      baseDate: '',
      supplier: '',
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<PurchasePriceSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),
    materialPurchasePriceDateSet: {
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
    setMaterialPurchasePriceDataSet: (dataSet: Partial<PurchasePriceTS>) => {
      set(({ materialPurchasePriceDateSet }) => ({
        materialPurchasePriceDateSet: {
          ...materialPurchasePriceDateSet,
          ...dataSet,
        },
      }))
    },
    selectPurchasePriceId: '',
    setPurchasePriceId: (selectPurchasePriceId: string) =>
      set({ selectPurchasePriceId }),
  }))
