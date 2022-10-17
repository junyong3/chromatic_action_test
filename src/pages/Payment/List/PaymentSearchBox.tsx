import React, { useMemo } from 'react'
import { Stack } from '@mui/material'
import { MemberCountOpt } from '@constants/SelectItem/OptionList'
import { PaymentCheckFilterProps } from '@pages/Payment/Props'
import SearchForm from '@components/SearchForm'
import dayjs, { Dayjs } from 'dayjs'
import { isStartDateExclude } from '@utils/common'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import InputSwitch from '@components/Switch/InputSwitch'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import InputSelect from '@components/Select/InputSelect'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import InputTextField from '@components/TextField/InputTextField'

const searchInitInputData = {
  isRange: false,
  rangeDate: {
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  },
  workAssign: {
    count: '',
    num: '',
  },
  payStatus: [
    'all',
    'complete',
    'fail',
    'allCancel',
    'partialCancel',
    'completeRefunds',
  ],
  paymentMethod: ['all', 'choshop', 'naver', 'kakao', 'virtualAccount'],
  filter: '',
}
export type searchInitInputDataTS = typeof searchInitInputData
function PaymentSearchBox() {
  const payStatusCheckboxListProps = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        checked: true,
      },
      {
        label: '결제 완료',
        key: 'complete',
        checked: true,
      },
      {
        label: '결제 실패',
        key: 'fail',
        checked: true,
      },
      {
        label: '부분 취소',
        key: 'partialCancel',
        checked: true,
      },
      {
        label: '전체 취소',
        key: 'allCancel',
        checked: true,
      },
      {
        label: '환급 완료',
        key: 'completeRefunds',
        checked: true,
      },
    ],
    []
  )

  const paymentMethodCheckboxListProps = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        checked: true,
      },
      {
        label: '초샵페이',
        key: 'choshop',
        checked: true,
      },
      {
        label: '네이버페이',
        key: 'naver',
        checked: true,
      },
      {
        label: '카카오페이',
        key: 'kakao',
        checked: true,
      },
      {
        label: '가상계좌',
        key: 'virtualAccount',
        checked: true,
      },
    ],
    []
  )

  const formContext = useForm<searchInitInputDataTS>({
    mode: 'onChange',
    defaultValues: searchInitInputData,
  })

  const { isValid } = formContext.formState
  const onSubmit = formContext.handleSubmit((success) => {
    console.log(success)
  })

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <SearchForm
          onSearch={() => {
            // TODO
            // 인원수 순번 둘다 입력해야지만 api params 넣는다
            console.log(111)
          }}
          disabled={!isValid}
        >
          <PaymentRangeDate />
          <PaymentWorkAssign />
          <PaymentCheckFilter
            type={'payStatus'}
            title={'결제 상태'}
            checkboxCompList={payStatusCheckboxListProps}
          />
          <PaymentCheckFilter
            type={'paymentMethod'}
            title={'결제 방법'}
            checkboxCompList={paymentMethodCheckboxListProps}
          />
          <PaymentSearchFilter />
          {/*<Divider variant={'middle'} />*/}
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default PaymentSearchBox

export function PaymentRangeDate() {
  const { watch } = useFormContext()
  const [isRange] = watch(['isRange'])
  const [startDateDayjs, endDateDayjs]: Array<Dayjs | ''> = watch([
    'rangeDate.startDate',
    'rangeDate.endDate',
  ])
  const startDate = startDateDayjs
  const endDate = endDateDayjs

  // useEffect(() => {
  //   return () => {
  //
  //   };
  // }, []);

  // const [dataPayInput, setDataPayInput] = usePaymentStore(
  //   useCallback(
  //     (state) => [state.paymentInputDataSet, state.setPaymentInputDataSet],
  //     []
  //   )
  // )
  // const [dataPayInput, setDataPayInput] = usePaymentStore((state) => [
  //   state.paymentInputDataSet.rangeDate,
  //   state.setPaymentInputDataSet,
  // ])
  // const setDataPayInput = usePaymentStore(
  //   (state) => state.setPaymentInputDataSet
  // )
  // const [startDate, setStartDate] = useState<string>(dataPayInput.startDate)
  // const [endDate, setEndDate] = useState<string>(dataPayInput.endDate)
  // const [isRange, setIsRange] = useState<boolean>(false)
  // const [isValidate, setIsValidate] = useState<isValidateTS>(null)
  // const dateOnChangeHandler = useCallback(
  //   (date: Record<'startDate' | 'endDate', string>) => {
  //     setDataPayInput({
  //       rangeDate: date,
  //     })
  //     // setStartDate(date.startDate)
  //     setEndDate(date.endDate)
  //     const items = validateDatePickerValue(date.startDate, isRange)
  //     setIsValidate(items)
  //   },
  //   [isRange, setDataPayInput]
  // )

  // const dateError = useCallback((reason: DateValidationError) => {
  //   switch (reason) {
  //     case 'invalidDate':
  //       setIsValidate({
  //         error: true,
  //         msg: 'Invalid date format',
  //       })
  //       break
  //
  //     case 'disablePast':
  //       setIsValidate({
  //         error: true,
  //         msg: 'disablePast',
  //       })
  //       break
  //
  //     case 'maxDate':
  //       setIsValidate({
  //         error: true,
  //         msg: 'maxDate',
  //       })
  //       break
  //
  //     case 'minDate':
  //       setIsValidate({
  //         error: true,
  //         msg: 'minDate',
  //       })
  //       break
  //     case 'shouldDisableDate':
  //       setIsValidate({
  //         error: true,
  //         msg: '시작 일자가 종료 일자보다 클 수 없습니다.',
  //       })
  //
  //       break
  //
  //     default:
  //       usePaymentStore.setState({ isSearchBtn: false })
  //       setIsValidate({
  //         error: false,
  //         msg: '',
  //       })
  //   }
  // }, [])
  const parseDate = (value: string) => {
    return dayjs(value, 'YYYY-MM-DD').format('YYYY-MM-DD')
  }

  return (
    <SearchFormRow>
      <SearchFormItem label={'결제 일자'} required labelWidth={100}>
        <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
          <InputSwitch
            sx={{ pl: 1 }}
            size={'small'}
            name={'isRange'}
            label={'기간선택'}
            variant={'subtitle2'}
          />
          <InputDatePicker
            className={'chromatic-ignore'}
            name={'rangeDate.startDate'}
            validation={{
              required: {
                value: true,
                message: '날짜를 입력하세요',
              },
              validate: {
                valueCheck: (value) => {
                  if (value === 'Invalid Date')
                    return '날짜 형식을 확인해주세요'
                },
              },
            }}
            parseDate={parseDate}
            required
            // error={isValidate ? isValidate.error : false}
            // helperText={isValidate ? isValidate.msg : ''}
            label={'시작일자'}
            shouldDisableDate={(eDay) => {
              return isStartDateExclude(eDay, dayjs(endDate))
            }}
          />
          {isRange ? (
            <>
              <div>to</div>
              <InputDatePicker
                name={'rangeDate.endDate'}
                label={'종료일자'}
                parseDate={parseDate}
                shouldDisableDate={(eDay) => {
                  return isStartDateExclude(dayjs(startDate), eDay)
                }}
                required
                validation={{
                  required: {
                    value: true,
                    message: '날짜를 입력하세요',
                  },
                  validate: {
                    valueCheck: (value) => {
                      if (value === 'Invalid Date')
                        return '날짜 형식을 확인해주세요'
                    },
                  },
                }}
              />
            </>
          ) : null}
        </Stack>
      </SearchFormItem>
    </SearchFormRow>
  )
}

export function PaymentWorkAssign() {
  const { watch } = useFormContext()
  const [memberCount] = watch(['workAssign.count'])
  return (
    <SearchFormRow>
      <SearchFormItem label={'업무 할당'} labelWidth={100}>
        <InputSelect
          name={'workAssign.count'}
          options={MemberCountOpt(1)}
          minWidth={100}
          label={'인원 수'}
          placeholder={'인원 수'}
        />
        {memberCount ? (
          <InputSelect
            name={'workAssign.num'}
            options={MemberCountOpt(1, memberCount)}
            sx={{ marginLeft: '24px' }}
            minWidth={100}
            label={'순번'}
            placeholder={'순번'}
          />
        ) : null}
      </SearchFormItem>
    </SearchFormRow>
  )
}

function PaymentCheckFilter(props: PaymentCheckFilterProps) {
  const { checkboxCompList, type, title } = props

  return (
    <SearchFormRow>
      <SearchFormItem required={true} label={title} labelWidth={100}>
        <InputCheckbox
          row
          options={checkboxCompList}
          name={type}
          valueKey={'key'}
          required
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function PaymentSearchFilter() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'검색어 필터'} labelWidth={100}>
        <InputTextField
          name={'filter'}
          size={'small'}
          placeholder={'주문 번호, 회원 이름, 휴대폰 번호 검색'}
          sx={{ width: '376px', margin: '6px 0' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
// function validateDatePickerValue(date: string, isRange?: boolean) {
//   const selectDate = usePaymentStore.getState().paymentInputDataSet.rangeDate
//   const items = dayjs(date).diff(selectDate.endDate, 'day', true)
//   // 기간 선택인 경우 체크
//   if (!isRange) return null
//   if (Math.sign(items) === -1 || Math.sign(items) === 0) {
//     return null
//   } else {
//     return {
//       error: true,
//       msg: '시작 일자가 종료 일자보다 클 수 없습니다.',
//     }
//   }
// }
