import create from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  ClientTS,
  PartnersSearchConditionTS,
  TransactionStatus,
} from '@domain/MDM/pages/Partners/Props'

interface ClientStoreState {
  searchCondition: PartnersSearchConditionTS
  setSearchCondition: (dataSet: Partial<PartnersSearchConditionTS>) => void

  clientDateSet: ClientTS
  setClientDataSet: (dataSet: Partial<ClientTS>) => void
}

export const useClientStore = create<
  ClientStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools((set) => ({
    searchCondition: {
      keyGoods: undefined,
      transactionStatus: TransactionStatus.NO,
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<PartnersSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),
    clientDateSet: {
      clientCode: '',
      clientName: '',
      clientType: '초샵 오프라인',
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
      receivingAddress: {
        postcode: '',
        address1: '',
        address2: '',
      },
      handlingCategory: [],
      productList: [],
      contractFile: '',
    },
    setClientDataSet: (dataSet: Partial<ClientTS>) => {
      set(({ clientDateSet }) => ({
        clientDateSet: { ...clientDateSet, ...dataSet },
      }))
    },
  }))
)
