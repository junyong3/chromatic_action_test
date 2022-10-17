import create from 'zustand'
import { devtools } from 'zustand/middleware'
import dayjs from 'dayjs'

/**
 * * NORMAL 정상
 * * SECESSION 탈퇴
 * * DORMANCY 휴면
 */
export const MemberStatus = {
  NORMAL: 1,
  SECESSION: 2,
  DORMANCY: 3,
} as const

/**
 * * YES 주문금지
 * * NO 주문가능
 */
export const OrderCheck = {
  YES: 'Y',
  NO: 'N',
} as const

type Union<T> = T[keyof T]
export type MemberStatusTS = Union<typeof MemberStatus>
export type OrderCheckTS = Union<typeof OrderCheck>

export type MemberSearchConditionTS = {
  memberStatus: MemberStatusTS[]
  orderCheck: OrderCheckTS[]
  keyword: string
}

export type MemberDataSet = {
  id: string
  name: string
  email: string
  phone: string
  registerRoute: undefined | '자체' | '네이버' | '카카오' | '애플'
  registerDate: string
  memberStatus: MemberStatusTS
  orderCheck: OrderCheckTS
  fcmToken: string
  useWebPushYN: 'Y' | 'N'
}

interface MemberStoreState {
  searchCondition: MemberSearchConditionTS
  setSearchCondition: (dataSet: Partial<MemberSearchConditionTS>) => void
  memberDataSet: MemberDataSet
  setMemberDataSet: (dataSet: Partial<MemberDataSet>) => void
  isAvailableSave: boolean
  setIsAvailableSave: (value: boolean) => void
  isCardAddDialogOpen: boolean
  exposeToggleTarget: null | {
    id: string
    isExposed: boolean
  }
  isExposeToggleDialogOpen: boolean
}

const useMemberStore = create<
  MemberStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools((set) => ({
    searchCondition: {
      memberStatus: [MemberStatus.NORMAL, MemberStatus.SECESSION],
      orderCheck: [OrderCheck.YES, OrderCheck.NO],
      keyword: '',
    },
    setSearchCondition: (dataSet: Partial<MemberSearchConditionTS>) =>
      set(({ searchCondition }) => ({
        searchCondition: { ...searchCondition, ...dataSet },
      })),
    memberDataSet: {
      id: '',
      name: '',
      email: '',
      phone: '',
      registerRoute: undefined,
      registerDate: '',
      memberStatus: MemberStatus.NORMAL,
      orderCheck: OrderCheck.NO,
      fcmToken: '',
      useWebPushYN: 'Y',
    },
    setMemberDataSet: (dataSet: Partial<MemberDataSet>) => {
      if (dataSet.registerDate)
        dataSet.registerDate = dayjs(dataSet.registerDate).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      set(({ memberDataSet }) => ({
        memberDataSet: { ...memberDataSet, ...dataSet },
      }))
    },
    isAvailableSave: false,
    setIsAvailableSave: (value: boolean) => set({ isAvailableSave: value }),
    isCardAddDialogOpen: false,
    exposeToggleTarget: null,
    isExposeToggleDialogOpen: false,
  }))
)

export default useMemberStore
