import { useNavigate, useParams } from 'react-router-dom'

import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import { FormProvider, useForm } from 'react-hook-form'
import usePostCode from '@stores/postCode.store'
import { useEffect } from 'react'
import LoadingService from '@services/LoadingService'
import { useFactoryDetailCall } from '@pages/Factory/query/useFactoryCall'
import { FactoryDto } from '@src/api/model/MDM/factory'
import FactoryCenterDataLayer from '@pages/Factory/Detail/FactoryCenterDataLayer'

function FactoryCenterDetail() {
  const navigate = useNavigate()
  const { factoryCode } = useParams()

  const { isSuccess, data, isLoading } = useFactoryDetailCall({
    factoryCode: factoryCode as string,
  })
  const initFactoryInputDateSet: FactoryDto = {
    address1: '',
    address2: '',
    factoryCode: '',
    factoryName: '',
    manager: '',
    companyNumber: '',
    phoneNumber: '',
    memo: '',
    centerType: 'logistics',
    useYN: false,
    zipcode: '',
  }

  const methods = useForm<FactoryDto>({
    mode: 'onBlur',
    defaultValues: data ?? initFactoryInputDateSet,
  })

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
    methods.reset(data)

    return () => {
      usePostCode.getState().reset()
    }
  }, [isLoading, isSuccess, data, methods])

  return (
    <Page>
      <SubHeader
        title={'공장/센터 정보 상세'}
        updateButton={{
          disabled: false,
          sbKind: 'pages/MDM/config/Factory/Update',
          onClick: () =>
            navigate(`${To.MDMConfigFactory}/${factoryCode}/update`),
        }}
      />
      <>
        <FormProvider {...methods}>
          <form id="OrgUpdateForm" onSubmit={onSubmit}>
            <FactoryCenterDataLayer pageType="detail" />
          </form>
        </FormProvider>
      </>
    </Page>
  )
}

export default FactoryCenterDetail
