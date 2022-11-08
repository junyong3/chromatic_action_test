import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { MemberQueryKey } from '@domain/Commerce/pages/Member/Props'

export const useBankListCall = () => {
  const { isSuccess, data } = useQueryWrap<Array<string>>(
    MemberQueryKey.accountBankList,
    () => Instance.get(COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT_BANK_LIST)
  )

  return { isSuccess, data }
}
