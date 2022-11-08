import React, { useMemo } from 'react'
import { Stack } from '@mui/material'
import SearchForm from '@components/SearchForm'
import dayjs, { Dayjs } from 'dayjs'
import { isStartDateExclude } from '@utils/common'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import InputSwitch from '@components/Switch/InputSwitch'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import InputTextField from '@components/TextField/InputTextField'
import { ReviewCheckFilterProps } from '@domain/Commerce/pages/Review/Props'
import useReviewStore, {
  reviewSearchInput,
} from '@stores/Commerce/Reviwe/review.store'

const searchInitInputData: reviewSearchInput = {
  isRange: false,
  rangeDate: {
    startDate: dayjs().format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
  },
  exposureState: ['all', 'exposure', 'unexposure'],
  reviewType: ['all', 'textReview', 'imageReview'],
  reportType: false,
  filter: '',
}
function ReviewSearchBox() {
  const exposureState = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        checked: true,
      },
      {
        label: '노출',
        key: 'exposure',
        checked: true,
      },
      {
        label: '미노출',
        key: 'unexposure',
        checked: true,
      },
    ],
    []
  )

  const reviewType = useMemo(
    () => [
      {
        label: '전체',
        key: 'all',
        checked: true,
      },
      {
        label: '텍스트 리뷰',
        key: 'textReview',
        checked: true,
      },
      {
        label: '사진 리뷰',
        key: 'imageReview',
        checked: true,
      },
    ],
    []
  )

  const formContext = useForm<reviewSearchInput>({
    mode: 'onChange',
    defaultValues: searchInitInputData,
  })
  const [setSearchInput] = useReviewStore((state) => [state.setSearchInput])
  const { isValid } = formContext.formState
  const onSubmit = formContext.handleSubmit((inputData) => {
    console.log(inputData)
    setSearchInput(inputData)
  })

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <SearchForm disabled={!isValid}>
          <ReviewRangeDate />
          <ReviewCheckFilter
            type={'exposureState'}
            title={'노출 상태'}
            checkboxCompList={exposureState}
          />
          <ReviewCheckFilter
            type={'reviewType'}
            title={'리뷰 종류'}
            checkboxCompList={reviewType}
          />
          <ReviewReportSwitch />
          <ReviewSearchFilter />
          {/*<Divider variant={'middle'} />*/}
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default ReviewSearchBox

export function ReviewRangeDate() {
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
      <SearchFormItem label={'작성 일자'} required labelWidth={100}>
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

function ReviewCheckFilter(props: ReviewCheckFilterProps) {
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

function ReviewReportSwitch() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'신고 여부'} labelWidth={100}>
        <InputSwitch
          sx={{ pl: 1 }}
          size={'small'}
          name={'reportType'}
          label={'신고된 리뷰 보기'}
          variant={'subtitle2'}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function ReviewSearchFilter() {
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
