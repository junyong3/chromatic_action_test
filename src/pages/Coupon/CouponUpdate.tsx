import { SubHeader } from '@compositions/Header'
import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import LoadingService from '@services/LoadingService'
import Page from '@components/Page'
import { useEffect } from 'react'
import {
  CouponDataSet,
  useCouponStore,
} from '@stores/Commerce/Coupon/coupon.store'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { useMutationWrap } from '@queries/useMutation'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import SnackbarService from '@services/SnackbarService'
import CouponDuration from '@src/pages/Coupon/InputData/CouponDuration'
import CouponName from '@src/pages/Coupon/InputData/CouponName'
import CouponChannel from '@src/pages/Coupon/InputData/CouponChannel'
import CouponType from '@src/pages/Coupon/InputData/CouponType'
import CouponTarget from '@src/pages/Coupon/InputData/CouponTarget'
import BenefitType from '@src/pages/Coupon/InputData/BenefitType'
import TermsOfUse from '@src/pages/Coupon/InputData/TermsOfUse'
import PaymentMethod from '@src/pages/Coupon/InputData/PaymentMethod'
import ProductRegisterModal from '@pages/Coupon/Modal/ProductRegisterModal'
import CategoryRegisterModal from '@pages/Coupon/Modal/CategoryRegisterModal'
import CustomerRegisterModal from '@pages/Coupon/Modal/CustomerRegisterModal'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import CouponCode from './InputData/CouponCode'
import { CouponQueryKey } from './Props'

function CouponUpdate() {
  const { id } = useParams()
  const { mutate } = useMutationWrap()
  const navigate = useNavigate()
  const [couponDataSet] = useCouponStore((state) => [state.couponDataSet])

  const { isSuccess, isLoading, data } = useQueryWrap<CouponDataSet>(
    CouponQueryKey.detail(id as string),
    () =>
      NetworkService.commerce.get(
        COMMERCE_COUPON_API_PATH.COUPON_DETAIL(id as string)
      ),
    { enabled: !!id }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  const methods = useForm<CouponDataSet>({
    mode: 'onBlur',
    defaultValues: couponDataSet,
  })
  const { isValid } = useFormState({ control: methods.control })

  useEffect(() => {
    // 쿠폰 수정
    methods.reset(data as CouponDataSet)
  }, [data, methods])

  const onSubmit = methods.handleSubmit((data, e) => {
    mutate(
      NetworkService.commerce.post(
        COMMERCE_COUPON_API_PATH.COUPON_DETAIL(id as string),
        data
      ),
      {
        onSuccess: () => {
          SnackbarService.show('쿠폰 정보가 저장되었습니다.')
          if (
            (e?.nativeEvent as SubmitEvent).submitter?.getAttribute('data-cy')
          )
            navigate(`${To.CommerceCouponList}/${id}`)
        },
      }
    )
  })

  return (
    <Page>
      <SubHeader
        title={'쿠폰 수정'}
        saveButton={{
          type: 'submit',
          form: 'couponUpdateForm',
          disabled: !isValid,
        }}
        anotherButton={[
          {
            type: 'submit',
            form: 'couponUpdateForm',
            text: '임시 저장',
            color: 'gray',
            variant: 'outlined',
            size: 'medium',
          },
        ]}
      />
      <FormProvider {...methods}>
        <form id={'couponUpdateForm'} onSubmit={onSubmit}>
          <CouponCode disabled={true} />
          <CouponDuration />
          <CouponName />
          <CouponChannel />
          <CouponType />
          <CouponTarget />
          <BenefitType />
          <TermsOfUse />
          <PaymentMethod />
        </form>
      </FormProvider>

      <CustomerRegisterModal />
      <ProductRegisterModal />
      <CategoryRegisterModal />
    </Page>
  )
}

export default CouponUpdate
