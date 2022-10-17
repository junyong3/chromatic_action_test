export const MemberQueryKey: {
  [key: string]: any
  list: readonly string[]
  detail: (memberId: string) => readonly string[]
} = {
  list: ['MemberList'] as const,
  detail: (memberId: string) => ['MemberDetail', memberId] as const,
  cardList: ['MemberCardList'] as const,
  refundAccount: ['MemberRefundAccount'] as const,
  couponList: ['MemberCouponList'] as const,
  pointHistoryList: ['MemberPointHistoryList'] as const,
  accountBankList: ['AccountBankList'] as const,
  csCouponList: ['CsCouponList'] as const,
  dataGridPagination: (
    key: keyof typeof MemberQueryKey,
    { page, limit }: { page: number; limit: number }
  ) => {
    return [...MemberQueryKey[key], limit, page] as const
  },
}

export interface MemberDataGridProp {
  pageType: 'update' | 'detail'
}
