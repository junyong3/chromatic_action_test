import { useCallback, useState } from 'react'
import SearchForm from '@components/SearchForm'
import dayjs from 'dayjs'
import {
  CouponSearchConditionTS,
  useCouponStore,
} from '@stores/Commerce/Coupon/coupon.store'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import CheckboxButtonGroupElement from '@components/Checkbox/CheckboxButtonGroupElement'
import InputTextField from '@components/TextField/InputTextField'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import Typography from '@src/components/Typography'

function CouponSearchBox() {
  const methods = useForm<CouponSearchConditionTS>({
    defaultValues: {
      startDate: dayjs().format('YYYY-MM-DD 00:00:00'),
      endDate: dayjs().add(30, 'd').format('YYYY-MM-DD 00:00:00'),
      couponType: [
        'discountPrice',
        'discountCart',
        'giftProduct',
        'freeDelivery',
        'etc',
      ],
      useChannel: ['app', 'web'],
      couponCodeOrCouponName: '',
      status: [],
    },
  })
  const setSearchCondition = useCouponStore((state) => state.setSearchCondition)

  const onSubmit = methods.handleSubmit((data) => {
    setSearchCondition(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <CouponRangeDate />
          <CouponType />
          <CouponChannel />
          <CouponCodeOrCouponName />
          <CouponState />
          <Typography variant="subtitle2" color={'gray.light'} pt={2} px={1}>
            ※ 회원에게 지급한 쿠폰을 회수해야될 경우, 백엔드 개발자에게
            요청하세요.
            <br />
            회수처리가 완료된 쿠폰은 쿠폰상태에 (회수완료)가 표시됩니다.
          </Typography>
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default CouponSearchBox

function CouponRangeDate() {
  const { watch } = useFormContext()

  const [isOver90days, setIsOver90days] = useState(false)

  const dateOnChangeHandler = useCallback(
    (date: Record<'startDate' | 'endDate', string>) => {
      if (dayjs(date.endDate).diff(date.startDate, 'd') >= 90) {
        setIsOver90days(true)
        return
      }
    },
    []
  )

  return (
    <SearchFormRow>
      <SearchFormItem label={'사용 가능 기간'} required labelWidth={120}>
        <InputDatePicker
          data-chromatic={'ignore'}
          name={'startDate'}
          label={'시작일자'}
          inputFormat={'YYYY-MM-DD HH:mm:ss'}
          onChange={(date) => {
            dateOnChangeHandler({
              startDate: date.format('YYYY-MM-DD HH:mm:ss'),
              endDate: watch('endDate'),
            })
          }}
        />
        <div style={{ margin: '12px' }}>~</div>
        <InputDatePicker
          data-chromatic={'ignore'}
          name={'endDate'}
          label={'종료일자'}
          inputFormat={'YYYY-MM-DD HH:mm:ss'}
          disableFuture={false}
          onChange={(date) => {
            dateOnChangeHandler({
              startDate: watch('startDate'),
              endDate: date.format('YYYY-MM-DD HH:mm:ss'),
            })
          }}
        />
      </SearchFormItem>

      <Dialog
        size={'sm'}
        open={isOver90days}
        title={'쿠폰 조회'}
        onClose={() => setIsOver90days(false)}
        content={<>쿠폰 조회기간은 90일 이내로 설정 가능합니다.</>}
        actions={<Button onClick={() => setIsOver90days(false)}>확인</Button>}
      />
    </SearchFormRow>
  )
}

function CouponType() {
  const couponTypeCheckboxListProps = [
    {
      label: '판매가 할인',
      id: 'discountPrice',
    },
    {
      label: '장바구니 할인',
      id: 'discountCart',
    },
    {
      label: '상품 증정',
      id: 'giftProduct',
    },
    {
      label: '무료배송',
      id: 'freeDelivery',
    },
    {
      label: '기타',
      id: 'etc',
    },
  ]

  return (
    <SearchFormRow>
      <SearchFormItem label={'쿠폰 종류'} required labelWidth={120}>
        <CheckboxButtonGroupElement
          row
          name={'couponType'}
          options={couponTypeCheckboxListProps}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function CouponChannel() {
  const useChannelCheckboxListProps = [
    {
      label: 'APP',
      id: 'app',
    },
    {
      label: 'WEB(mobile, PC)',
      id: 'web',
    },
    {
      label: '매장',
      id: 'store',
    },
  ]

  return (
    <SearchFormRow>
      <SearchFormItem label={'사용 채널'} required labelWidth={120}>
        <CheckboxButtonGroupElement
          row
          name={'useChannel'}
          options={useChannelCheckboxListProps}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function CouponCodeOrCouponName() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'쿠폰 코드/쿠폰명'} required labelWidth={120}>
        <InputTextField
          name={'CouponCodeOrCouponName'}
          placeholder={'쿠폰코드 또는 쿠폰명을 입력하세요'}
          sx={{ width: '376px' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}

function CouponState() {
  const statusCheckboxListProps = [
    {
      label: '임시저장',
      id: 'registering',
    },
    {
      label: '활성화',
      id: 'activation',
    },
    {
      label: '비활성화',
      id: 'deactivation',
    },
  ]

  return (
    <SearchFormRow>
      <SearchFormItem label={'쿠폰 상태'} labelWidth={120}>
        <CheckboxButtonGroupElement
          row
          name={'status'}
          options={statusCheckboxListProps}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
