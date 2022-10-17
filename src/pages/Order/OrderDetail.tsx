import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { SubHeader } from '@compositions/Header'
import NetworkService from '@api/NetworkService'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { UpdatePaymentReq } from '@api/model/Commerce/payment'
import OrderDetailBody from '@pages/Order/Detail/OrderDetailBody'
import Page from '@components/Page'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import useOrderStore, { cancelTS } from '@stores/Commerce/Order/order.store'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { useMutationWrap } from '@queries/useMutation'
import LoadingService from '@services/LoadingService'
import { serverErrorCodeDialogMsg } from '@components/Dialog/ServerErrorCodeDialogMsg'

const cancelInitInputDate = {
  cancelType: 'all' as cancelTS,
  cancelAccount: '',
  cancelReason: {
    value: '',
    etcMsg: '',
  },
  refundsAccountInfo: {
    bankCode: '',
    accountNumber: '',
    accountUser: '',
  },
}
function OrderDetail() {
  const [isCancelError, setIsCancelError] = useState<boolean>(false)
  const [dialogCode, setDialogCode] = useState<string>('CANCEL_COMPLETE_DONE')
  const {
    cancelReqCall: isCancelDialog,
    setCancelReqCall: setCancelDialog,
    selectRowData,
  } = useOrderStore()
  const formContext = useForm<typeof cancelInitInputDate>({
    mode: 'onChange',
    defaultValues: cancelInitInputDate,
  })
  const { mutate: update } = useMutationWrap()

  // 결제 취소 버튼 event
  const onClickNoticeCancel = () => {
    LoadingService.show()
    console.log(formContext.getValues())
    // api call
    update(
      NetworkService.commerce.patch<UpdatePaymentReq>(
        COMMERCE_PAYMENT_API_PATH.PAYMENT_DETAIL(selectRowData.id),
        formContext.getValues()
      ),
      {
        onSuccess: () => {
          // const errorCode = 'cancel'
          // if (errorCode === 'cancel') {
          //   setDialogCode('ACCOUNT_HOLDER_INFO')
          //   setIsCancelError(true)
          // }
          SnackbarService.show(MSG.SUCCESS.PAYMENT_CANCEL)
        },
        onError: () => {
          console.log('error')
        },
        onSettled: () => {
          setCancelDialog(false)
          LoadingService.close()
        },
      }
    )
  }
  return (
    <Page>
      <SubHeader title={'주문 상세'} />
      <FormProvider {...formContext}>
        <OrderDetailBody />
      </FormProvider>
      <Dialog
        size="sm"
        open={isCancelDialog}
        title="경고"
        onClose={() => setCancelDialog(false)}
        content={`정말로 ${formContext.getValues(
          'cancelAccount'
        )}원을 결제 취소 하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setCancelDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogCancelButton'}
              onClick={onClickNoticeCancel}
            >
              결제 취소
            </Button>
          </>
        }
      />
      {dialogCode ? (
        <Dialog
          size="sm"
          open={isCancelError}
          title={serverErrorCodeDialogMsg(dialogCode).title}
          onClose={() => setIsCancelError(false)}
          content={serverErrorCodeDialogMsg(dialogCode).content}
          actions={
            <>
              <Button onClick={() => setIsCancelError(false)}>닫기</Button>
            </>
          }
        />
      ) : null}
    </Page>
  )
}

export default OrderDetail
