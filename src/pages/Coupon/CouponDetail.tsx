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
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { To } from '@routes/To'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import { CouponQueryKey } from './Props'
import CouponDuration from './InputData/CouponDuration'
import CouponName from './InputData/CouponName'
import CouponChannel from './InputData/CouponChannel'
import CouponType from './InputData/CouponType'
import CouponTarget from './InputData/CouponTarget'
import BenefitType from './InputData/BenefitType'
import TermsOfUse from './InputData/TermsOfUse'
import PaymentMethod from './InputData/PaymentMethod'
import CouponCode from './InputData/CouponCode'

function CouponDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [setDataInput] = useCouponStore((state) => [state.setCouponDataSet])

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
  })

  useEffect(() => {
    methods.reset(data)
  }, [data, methods])

  const onSubmit = methods.handleSubmit((data) => {
    // 쿠폰 복제
    setDataInput({
      ...data,
      ...{
        isActive: false,
        couponCodeType: 'auto',
        couponCode: '',
        couponDuration: {
          type: 'duration',
          duration: {
            startDate: '',
            endDate: '',
          },
          validDayFromDownload: undefined,
        },
        paymentMethod: {
          type: 'download',
          download: {
            firstCome: undefined,
            duration: {
              startDate: '',
              endDate: '',
            },
          },
        },
      },
    })
    navigate(To.CommerceCouponCreate)
  })

  return (
    <Page>
      <SubHeader
        title={'쿠폰 상세'}
        updateButton={{
          onClick: () => navigate(`${To.CommerceCouponList}/${id}/update`),
        }}
        anotherButton={[
          {
            type: 'submit',
            form: 'couponDetailForm',
            text: '복제',
            color: 'gray',
            variant: 'outlined',
            size: 'medium',
          },
        ]}
      />
      <FormProvider {...methods}>
        <form id="couponDetailForm" onSubmit={onSubmit}>
          <CouponCode disabled={true} />
          <CouponDuration disabled={true} />
          <CouponName disabled={true} />
          <CouponChannel disabled={true} />
          <CouponType disabled={true} />
          <CouponTarget disabled={true} />
          <BenefitType disabled={true} />
          <TermsOfUse disabled={true} />
          <PaymentMethod disabled={true} />
        </form>
      </FormProvider>
    </Page>
  )
}

export default CouponDetail
