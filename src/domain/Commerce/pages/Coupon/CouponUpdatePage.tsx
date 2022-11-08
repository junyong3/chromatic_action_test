import { SubHeader } from '@compositions/Header'
import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
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
import CouponDuration from '@domain/Commerce/pages/Coupon/InputData/CouponDuration'
import CouponName from '@domain/Commerce/pages/Coupon/InputData/CouponName'
import CouponChannel from '@domain/Commerce/pages/Coupon/InputData/CouponChannel'
import CouponType from '@domain/Commerce/pages/Coupon/InputData/CouponType'
import CouponTarget from '@domain/Commerce/pages/Coupon/InputData/CouponTarget'
import BenefitType from '@domain/Commerce/pages/Coupon/InputData/BenefitType'
import TermsOfUse from '@domain/Commerce/pages/Coupon/InputData/TermsOfUse'
import PaymentMethod from '@domain/Commerce/pages/Coupon/InputData/PaymentMethod'
import ProductRegisterModal from '@domain/Commerce/pages/Coupon/Modal/ProductRegisterModal'
import CategoryRegisterModal from '@domain/Commerce/pages/Coupon/Modal/CategoryRegisterModal'
import CustomerRegisterModal from '@domain/Commerce/pages/Coupon/Modal/CustomerRegisterModal'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import CouponCode from './InputData/CouponCode'
import { CouponQueryKey } from './Props'
import { MSG } from '@src/constants/MessageCode/msg'

function CouponUpdatePage() {
  const { id } = useParams()
  const { mutate } = useMutationWrap()
  const navigate = useNavigate()
  const [couponDataSet] = useCouponStore((state) => [state.couponDataSet])

  const { isSuccess, isLoading, data } = useQueryWrap<CouponDataSet>(
    CouponQueryKey.detail(id as string),
    () => Instance.get(COMMERCE_COUPON_API_PATH.COUPON_DETAIL(id as string)),
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
      Instance.post(COMMERCE_COUPON_API_PATH.COUPON_DETAIL(id as string), data),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.COMMERCE.COUPON.UPDATE_COUPON)
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

export default CouponUpdatePage
