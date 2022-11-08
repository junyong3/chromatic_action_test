import { FormProvider, useForm } from 'react-hook-form'
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import {
  MemberTabProps,
  RefundAccountFormRowProps,
} from '@domain/Commerce/pages/Member/Detail&Update/Tab/Props'
import InputTextField from '@components/TextField/InputTextField'
import CancelForm from '@components/SearchForm/CancelForm'
import { Box } from '@mui/material'
import useMemberPaymentStore from '@stores/Commerce/Member/member.payment.store'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { useBankListCall } from '@domain/Commerce/pages/Member/Detail&Update/Tab/query/useBankListCall'
import { RefundAccountCall } from '@domain/Commerce/pages/Member/Detail&Update/Tab/query/useRefundAccountCall'
import { useMutationWrap } from '@queries/useMutation'
import { AxiosError } from 'axios'
import LoadingService from '@services/LoadingService'
import Instance from '@api/Instance'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import {
  AdminRemoveRefundAccountDto,
  AdminSaveRefundAccountDto,
} from '@api/model/Commerce/payment'
import { useErrorStore } from '@stores/error.store'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { ErrorRes } from '@api/model/res'
import { useRefundAccountStatus } from '@domain/Commerce/pages/Member/Detail&Update/Tab/hooks/useRefundAccountStatus'
import { useQueryClient } from 'react-query'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { MemberQueryKey } from '@domain/Commerce/pages/Member/Props'
import InputSelect from '@components/Select/InputSelect'

const InitRefundAccount = {
  bank: '',
  accountNumber: '',
  customerName: '',
}

function MemberRefundAccountTab({ memberId }: MemberTabProps) {
  const queryClient = useQueryClient()
  // dialog flag state
  const [isRemoveRefundAccountDialog, setIsRemoveRefundAccountDialog] =
    useState(false)
  // const [isCancelError, setIsCancelError] = useState<boolean>(false)
  // const [DialogCode, setDialogCode] = useState<string>('')
  // zustand story
  const [formButtonInfo] = useMemberPaymentStore((state) => [state.formButton])
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  // api react-query
  const { data: bankList } = useBankListCall()
  const { data: refundAccountInfo, isLoading } = RefundAccountCall(memberId)
  const { mutate: save } = useMutationWrap<AdminSaveRefundAccountDto>()
  const { mutate: remove } = useMutationWrap<AdminRemoveRefundAccountDto>()

  // useForm
  const formContext = useForm<typeof InitRefundAccount>({
    mode: 'onBlur',
    defaultValues: refundAccountInfo ?? InitRefundAccount,
  })

  // init DataSetting
  useEffect(() => {
    if (isLoading) {
      LoadingService.show()
    } else {
      LoadingService.close()
    }
    formContext.reset(refundAccountInfo)

    return () => {
      LoadingService.close()
    }
  }, [formContext, isLoading, refundAccountInfo])

  // btn valid check
  const { isValid } = formContext.formState
  // submit save evnet
  // remove event
  const removeRefundAccount = () => {
    LoadingService.show()
    remove(
      Instance.patch(COMMERCE_PAYMENT_API_PATH.REMOVE_REFUND_ACCOUNT, {
        userId: memberId,
      }),
      {
        onSuccess: () => {
          onSuccess('remove')
        },
        onError: onError,
        onSettled: onSettled,
      }
    )
  }

  // useMutation result Fn
  const onSuccess = useCallback(
    (status: string) => {
      const snackMsg =
        status === 'save'
          ? MSG.SUCCESS.SAVE_REFUNDS
          : MSG.SUCCESS.DELETE_REFUNDS
      SnackbarService.show(snackMsg)
      queryClient.invalidateQueries(MemberQueryKey.refundAccount)
    },
    [queryClient]
  )
  const onError = useCallback(
    ({ response }: AxiosError<ErrorRes<AdminSaveRefundAccountDto>>) => {
      const code = response?.data.code
      setIsSystemError(true, code)
    },
    [setIsSystemError]
  )

  const onSubmit = useCallback(() => {
    formContext.handleSubmit((success) => {
      LoadingService.show()
      save(
        Instance.patch(COMMERCE_PAYMENT_API_PATH.SAVE_REFUND_ACCOUNT, {
          userId: memberId,
          ...success,
        }),
        {
          onSuccess: () => {
            onSuccess('save')
          },
          onError: onError,
          onSettled: onSettled,
        }
      )
    })()
  }, [formContext, memberId, onError, onSuccess, save])
  // save, update status setting
  useRefundAccountStatus(
    refundAccountInfo ?? InitRefundAccount,
    onSubmit,
    setIsRemoveRefundAccountDialog
  )

  const onSettled = () => {
    LoadingService.close()
  }

  // remove Event
  const onRemoveRefundAccount = () => {
    removeRefundAccount()
    setIsRemoveRefundAccountDialog(false)
  }

  return (
    <Box p={3}>
      <FormProvider {...formContext}>
        <form onSubmit={onSubmit}>
          <CancelForm
            isTab={true}
            confirmLabel={formButtonInfo.refundsBtnLabel}
            cancelLabel={formButtonInfo.cancelBtnLabel}
            disabled={!isValid}
            onPaymentCancel={formButtonInfo.refundsBtnHandler}
            onCancel={formButtonInfo.cancelBtnHandler}
          >
            <RefundAccountFormRow label={'은행사'}>
              <InputSelect
                name={'bank'}
                data-cy={'bank'}
                required
                label={'은행사'}
                placeholder={'은행사'}
                options={bankList ?? []}
              />
            </RefundAccountFormRow>
            <RefundAccountFormRow label={'계좌 번호'}>
              <InputTextField
                required
                name={'accountNumber'}
                data-cy={'accountNumber'}
                isNumber={true}
                size={'small'}
                placeholder={'숫자만 입력'}
                validation={{
                  minLength: 10,
                }}
                inputProps={{
                  maxLength: 20,
                }}
                sx={{ width: '280px' }}
              />
            </RefundAccountFormRow>
            <RefundAccountFormRow label={'예금주명'}>
              <InputTextField
                required
                name={'customerName'}
                data-cy={'customerName'}
                size={'small'}
                placeholder={'예금주'}
                validation={{
                  validate: {
                    validNumber: (value) => {
                      let reFormatVal = value
                      reFormatVal = value.replace(/,/g, '')
                      return !!reFormatVal.trim().length
                    },
                  },
                  minLength: 1,
                }}
                inputProps={{
                  maxLength: 30,
                }}
                sx={{ width: '220px' }}
              />
            </RefundAccountFormRow>
          </CancelForm>
        </form>
      </FormProvider>
      <Dialog
        size="sm"
        open={isRemoveRefundAccountDialog}
        title="경고"
        onClose={() => setIsRemoveRefundAccountDialog(false)}
        content={`정말로 환급 계좌 정보를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsRemoveRefundAccountDialog(false)}>
              닫기
            </Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={onRemoveRefundAccount}
            >
              환급 계좌 삭제
            </Button>
          </>
        }
      />
      {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
    </Box>
  )
}

function RefundAccountFormRow(
  props: PropsWithChildren<RefundAccountFormRowProps>
) {
  const { label, children } = props
  return (
    <SearchFormRow>
      <SearchFormItem label={label} required>
        {children}
      </SearchFormItem>
    </SearchFormRow>
  )
}

export default MemberRefundAccountTab
