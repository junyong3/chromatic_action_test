import { useNavigate, useParams } from 'react-router-dom'

import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import Page from '@components/Page'
import OrganizationDataLayer from '@pages/Organization/Detail/OrganizationDataLayer'
import { useOrgDetailCall } from '@pages/Organization/query/useOrgDetailCall'
import { FormProvider, useForm } from 'react-hook-form'
import { OrganizationDto } from '@api/model/MDM/organization'
import usePostCode from '@stores/postCode.store'
import { useEffect } from 'react'
import LoadingService from '@services/LoadingService'

function OrganizationDetail() {
  const navigate = useNavigate()
  const { deptCode } = useParams()

  const { isSuccess, data, isLoading } = useOrgDetailCall({
    departmentCode: deptCode as string,
  })
  const initOrgInputDateSet = {
    departmentCode: '',
    departmentName: '',
    zipcode: '',
    address1: '',
    address2: '',
    manager: '',
    memo: '',
    useYN: false,
  }

  const methods = useForm<OrganizationDto>({
    mode: 'onBlur',
    defaultValues: data ?? initOrgInputDateSet,
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
        title={'조직 정보 상세'}
        updateButton={{
          disabled: false,
          sbKind: 'pages/MDM/config/Org/Update',
          onClick: () => navigate(`${To.MDMConfigOrg}/${deptCode}/update`),
        }}
      />
      <>
        <FormProvider {...methods}>
          <form id="OrgUpdateForm" onSubmit={onSubmit}>
            <OrganizationDataLayer pageType="detail" />
          </form>
        </FormProvider>
      </>
    </Page>
  )
}

export default OrganizationDetail
