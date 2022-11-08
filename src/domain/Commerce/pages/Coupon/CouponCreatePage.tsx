import { SubHeader } from '@compositions/Header'
import Page from '@components/Page'
import {
  CouponDataSet,
  useCouponStore,
} from '@stores/Commerce/Coupon/coupon.store'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { useMutationWrap } from '@queries/useMutation'
import CouponCode from '@domain/Commerce/pages/Coupon/InputData/CouponCode'
import CouponDuration from '@domain/Commerce/pages/Coupon/InputData/CouponDuration'
import CouponName from '@domain/Commerce/pages/Coupon/InputData/CouponName'
import CouponChannel from '@domain/Commerce/pages/Coupon/InputData/CouponChannel'
import CouponType from '@domain/Commerce/pages/Coupon/InputData/CouponType'
import Instance from '@api/Instance'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import { To } from '@routes/To'
import { useNavigate } from 'react-router-dom'
import SnackbarService from '@services/SnackbarService'
import CouponTarget from './InputData/CouponTarget'
import BenefitType from './InputData/BenefitType'
import TermsOfUse from './InputData/TermsOfUse'
import PaymentMethod from './InputData/PaymentMethod'
import CustomerRegisterModal from './Modal/CustomerRegisterModal'
import ProductRegisterModal from './Modal/ProductRegisterModal'
import CategoryRegisterModal from './Modal/CategoryRegisterModal'
import { MSG } from '@src/constants/MessageCode/msg'

function CouponCreatePage() {
  const { mutate } = useMutationWrap<{ couponId: string }>()
  const navigate = useNavigate()
  const [dataInput] = useCouponStore((state) => [state.couponDataSet])

  const methods = useForm<CouponDataSet>({
    mode: 'onBlur',
    defaultValues: dataInput,
  })
  const { isValid } = useFormState({ control: methods.control })
  const onSubmit = methods.handleSubmit((inputData) => {
    mutate(Instance.post(COMMERCE_COUPON_API_PATH.CREATE_COUPON, inputData), {
      onSuccess: ({ data }) => {
        SnackbarService.show(MSG.SUCCESS.COMMERCE.COUPON.CREATE_COUPON)
        navigate(`${To.CommerceCouponList}/${data.couponId}`)
      },
    })
  })

  return (
    <Page>
      <SubHeader
        title={'쿠폰 생성'}
        saveButton={{
          type: 'submit',
          form: 'couponCreateForm',
          disabled: !isValid,
        }}
      />
      <FormProvider {...methods}>
        <form id="couponCreateForm" onSubmit={onSubmit}>
          <CouponCode />
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

export default CouponCreatePage
