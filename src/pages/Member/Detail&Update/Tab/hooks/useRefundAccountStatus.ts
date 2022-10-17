import { useEffect } from 'react'
import { RefundAccountSaveDto } from '@api/model/Commerce/payment'
import useMemberPaymentStore, {
  buttonTypeHandleTS,
} from '@stores/Commerce/Member/member.payment.store'

export const useRefundAccountStatus = (
  refundAccountData: RefundAccountSaveDto,
  onSubmit: () => void,
  setIsRemoveRefundAccountDialog: (data: boolean) => void
) => {
  const [setFormBtnInfo] = useMemberPaymentStore((state) => [
    state.setButtonData,
  ])
  // api 값 여부에 따라 상태값 변경
  useEffect(() => {
    const formButtonObj: buttonTypeHandleTS = {
      type: 'save',
    }

    if (refundAccountData.customerName) {
      // 수정
      formButtonObj.type = 'update'
      formButtonObj.refundsBtnHandler = () => {
        onSubmit()
      }
      formButtonObj.cancelBtnHandler = () => {
        setIsRemoveRefundAccountDialog(true)
      }
    } else {
      // 저장
      formButtonObj.type = 'save'
      formButtonObj.refundsBtnHandler = () => {
        onSubmit()
      }
    }
    setFormBtnInfo(formButtonObj)
  }, [
    onSubmit,
    refundAccountData,
    setFormBtnInfo,
    setIsRemoveRefundAccountDialog,
  ])
}
