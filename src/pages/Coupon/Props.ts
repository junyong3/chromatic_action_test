export const CouponQueryKey: {
  [key: string]: any
  list: readonly string[]
  detail: (couponId: string) => readonly string[]
} = {
  list: ['CouponList'] as const,
  detail: (couponId: string) => ['CouponDetail', couponId] as const,
  dataGridPagination: (
    key: keyof typeof CouponQueryKey,
    { page, limit }: { page: number; limit: number }
  ) => {
    return [...CouponQueryKey[key], limit, page] as const
  },
}

export type isValidateTS = {
  error: boolean
  msg: string
} | null

export type InputDataProps = {
  disabled?: boolean
}
