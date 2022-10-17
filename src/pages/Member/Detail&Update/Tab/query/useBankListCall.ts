import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { MemberQueryKey } from '@pages/Member/Props'

export const useBankListCall = () => {
  const { isSuccess, data } = useQueryWrap<Array<string>>(
    MemberQueryKey.accountBankList,
    () =>
      NetworkService.commercePayment.get(
        COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT_BANK_LIST
      )
  )

  return { isSuccess, data }
}
