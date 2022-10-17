import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { RefundAccountSaveDto } from '@api/model/Commerce/payment'
import { MemberQueryKey } from '@pages/Member/Props'

export const RefundAccountCall = (memberId: string) => {
  const { isSuccess, data, isLoading } = useQueryWrap<RefundAccountSaveDto>(
    MemberQueryKey.refundAccount,
    () =>
      NetworkService.commercePayment.get(
        COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT,
        { userId: memberId }
      )
  )

  return { isSuccess, data, isLoading }
}
