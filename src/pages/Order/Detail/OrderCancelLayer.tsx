import { OrderCancelLayerWrap } from '@pages/Order/StyleObj'
import Typography from '@components/Typography/Typography'
import { Box } from '@mui/system'
import CancelForm from '@components/SearchForm/CancelForm'
import React, { useEffect, useState } from 'react'
import { bankOptionCode, cancelReason } from '@constants/SelectItem/OptionList'
import useOrderStore from '@stores/Commerce/Order/order.store'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import { useFormContext } from 'react-hook-form'
import InputRadio from '@components/Radio/InputRadio'
import InputTextField from '@components/TextField/InputTextField'
import shallow from 'zustand/shallow'
import InputSelect from '@components/Select/InputSelect'

const cancelRadioOptions = [
  {
    label: '전체 취소',
    id: 'all',
  },
  {
    label: '부분 취소',
    id: 'part',
  },
]

function OrderCancelLayer() {
  const [isCancelView, selectRowData] = useOrderStore((state) => [
    state.isCancelView,
    state.selectRowData,
  ])

  const { watch, formState, handleSubmit, reset } = useFormContext()
  const cancelType = watch('cancelType')
  const isVirtualCompView =
    cancelType === 'part' && selectRowData?.payMethod === 'virtualAccount'
  const { isValid } = formState
  const onSubmit = handleSubmit((success) => {
    console.log(success)
  })
  return (
    <>
      {isCancelView ? (
        <OrderCancelLayerWrap>
          <Typography variant={'subtitle2'} py={2}>
            결제 취소
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '400px',
            }}
          >
            <form onSubmit={onSubmit}>
              <CancelForm
                confirmLabel={'결제 취소 요청'}
                disabled={!isValid}
                onCancel={() => {
                  useOrderStore.setState({
                    isCancelView: false,
                  })
                  // cancelReset()
                  reset()
                }}
                onPaymentCancel={() => {
                  useOrderStore.setState({ cancelReqCall: true })
                }}
              >
                <OrderCancelTypeField />
                <MinimumAmountField />
                <CancelReasonField />
                {isVirtualCompView ? <RefundsAccountField /> : null}
              </CancelForm>
            </form>
          </Box>
        </OrderCancelLayerWrap>
      ) : null}
    </>
  )
}

export default OrderCancelLayer

function OrderCancelTypeField() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'취소 종류'} required>
        <InputRadio
          row
          required={true}
          options={cancelRadioOptions}
          name={'cancelType'}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
function MinimumAmountField() {
  const [selectRowData] = useOrderStore(
    (state) => [state.selectRowData],
    shallow
  )
  const [selectRowAmount, setSelectRowAmount] = useState<string>(
    Number(selectRowData.amount).toLocaleString('ko-KR')
  )
  useEffect(() => {
    setSelectRowAmount(Number(selectRowData.amount).toLocaleString('ko-KR'))
  }, [selectRowData.amount])

  return (
    <SearchFormRow>
      <SearchFormItem label={'취소 금액'} required>
        <InputTextField
          required
          name={'cancelAccount'}
          size={'small'}
          placeholder={'숫자만 입력'}
          label={'숫자만 입력'}
          isComma={true}
          isNumber={true}
          helperText={`${selectRowAmount}이하의 숫자만 입력 가능합니다.`}
          validation={{
            validate: {
              validNumber: (value) => {
                let reFormatVal = value
                const onlyNumberVal = String(reFormatVal)
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1')
                reFormatVal = Number(
                  onlyNumberVal.replace(/,/g, '')
                ).toLocaleString('ko-KR')
                if (
                  Number(reFormatVal.replace(/,/g, '')) >
                  Number(selectRowData.amount)
                ) {
                  return `${selectRowAmount}이하의 숫자만 입력 가능합니다.`
                } else {
                  return true
                }
              },
            },
          }}
          sx={{ width: '376px', margin: '6px 0' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
function CancelReasonField() {
  const { watch } = useFormContext()
  const reason = watch('cancelReason.value')

  return (
    <SearchFormRow>
      <SearchFormItem label={'취소 사유'} required>
        <InputSelect
          required
          name={'cancelReason.value'}
          options={cancelReason}
          label={'취소 사유'}
          placeholder={'취소 사유'}
        />
        {reason === 'F' ? (
          <InputTextField
            required
            name={'cancelReason.msg'}
            size={'small'}
            placeholder={'기타 사유 입력'}
            label={'기타 사유 입력'}
            inputProps={{
              maxLength: 50,
            }}
            sx={{ width: '500px', margin: '0 18px' }}
          />
        ) : null}
      </SearchFormItem>
    </SearchFormRow>
  )
}

function RefundsAccountField() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'환불 계좌'} required>
        <InputSelect
          name={'refundsAccountInfo.bankCode'}
          optionKey={{ label: 'bankName', value: 'code' }}
          required
          label={'은행사'}
          placeholder={'은행사'}
          options={bankOptionCode}
        />
        <InputTextField
          required
          name={'refundsAccountInfo.accountNumber'}
          isNumber={true}
          size={'small'}
          placeholder={'계좌 번호(숫자만 입력)'}
          label={'계좌 번호(숫자만 입력)'}
          inputProps={{
            maxLength: 20,
          }}
          sx={{ width: '376px', margin: '12px 18px' }}
        />
        <InputTextField
          required
          name={'refundsAccountInfo.accountUser'}
          size={'small'}
          placeholder={'예금주'}
          label={'예금주명'}
          inputProps={{
            maxLength: 30,
          }}
          sx={{ width: '400px', margin: '0' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
