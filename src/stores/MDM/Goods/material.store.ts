import create from 'zustand'
import { MaterialInfoTS } from '@domain/MDM/pages/Goods/Material/Props'

export interface MaterialSearchCondition {
  materialName: string
  materialCode: string
  customerName: string[]
  materialType: string[]
}

interface MaterialStoreState {
  searchCondition: MaterialSearchCondition
  setSearchCondition: (searchCondition: MaterialSearchCondition) => void

  materialDataSet: MaterialInfoTS
  setMaterialDataSet: (dataSet: Partial<MaterialInfoTS>) => void
}

export const useMaterialStore = create<MaterialStoreState>((set) => ({
  searchCondition: {
    materialName: '',
    materialCode: '',
    customerName: [],
    materialType: [],
  },
  setSearchCondition: (searchCondition: MaterialSearchCondition) =>
    set(() => ({ searchCondition })),

  materialDataSet: {
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
  } as MaterialInfoTS,
  setMaterialDataSet: (dataSet: Partial<MaterialInfoTS>) => {
    set(({ materialDataSet }) => ({
      materialDataSet: { ...materialDataSet, ...dataSet },
    }))
  },
}))
