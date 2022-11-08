import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  PartnersSearchConditionTS,
  TransactionStatus,
  VenderTS,
} from '@domain/MDM/pages/Partners/Props'

interface VenderStoreState {
  searchCondition: PartnersSearchConditionTS
  setSearchCondition: (dataSet: Partial<PartnersSearchConditionTS>) => void

  venderDateSet: VenderTS
  setVenderDataSet: (dataSet: Partial<VenderTS>) => void
}

export const useVenderStore = create<
  VenderStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools((set) => ({
    searchCondition: {
      keyGoods: undefined,
      transactionStatus: TransactionStatus.YES,
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<PartnersSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),
    venderDateSet: {
      venderCode: '',
      venderName: '',
      address: {
        postcode: '',
        address1: '',
        address2: '',
      },
      businessNumber: '',
      manager: '',
      phone: '',
      account: {
        bank: '',
        accountNumber: undefined,
      },
      handlingCategory: [],
      productList: [],
      contractFile: '',
    },
    setVenderDataSet: (dataSet: Partial<VenderTS>) => {
      set(({ venderDateSet }) => ({
        venderDateSet: { ...venderDateSet, ...dataSet },
      }))
    },
  }))
)
