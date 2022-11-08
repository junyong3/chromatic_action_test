import Instance from '@api/Instance'
import { HEALTH_CRET_API_PATH } from '@api/path/MDM/AddInfo/healthCertificatePath'
import {
  healthCertificateDto,
  healthCertificateListRes,
  healthCertificateReq,
} from '@api/model/MDM/AddInfo/healthCertificate'
import { useQueryWrap } from '@queries/useQuery'
import { HealthCertificateQueryKey } from '@domain/MDM/pages/AddInfo/HealthCertificate/Props'
import { healthCertificateSearchInput } from '@stores/MDM/AddInfo/healthCertificate.store'

export const useHealthCertificateCreateCall = async (
  params: healthCertificateDto
) => {
  const { data } = await Instance.post(
    HEALTH_CRET_API_PATH.CREATE_HEALTH_CRET,
    {
      data: params,
    }
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }
  )
  return data
}

export const useHealthCertificateUpdateCall = async (
  params: healthCertificateDto
) => {
  const { data } = await Instance.post(
    HEALTH_CRET_API_PATH.UPDATE_HEALTH_CRET,
    {
      data: params,
    }
  )
  return data
}

export const useHealthCertificateDeleteCall = async (
  params: healthCertificateReq
) => {
  const { data } = await Instance.delete(
    HEALTH_CRET_API_PATH.DELETE_HEALTH_CRET,
    {
      data: params,
    }
  )
  return data
}
export const useHealthCertificateListCall = (
  params: healthCertificateSearchInput
) => {
  const { isSuccess, isLoading, data } = useQueryWrap<healthCertificateListRes>(
    HealthCertificateQueryKey.searchList(params),
    () => Instance.get(HEALTH_CRET_API_PATH.LIST_HEALTH_CRET, params)
  )
  return { isSuccess, data, isLoading }
}
export const useHealthCertificateDetailCall = ({
  healthCertificateCode,
}: {
  healthCertificateCode: string
}) => {
  const { isSuccess, isLoading, data } = useQueryWrap<healthCertificateDto>(
    HealthCertificateQueryKey.detail(healthCertificateCode),
    () =>
      Instance.get(
        HEALTH_CRET_API_PATH.DETAIL_HEALTH_CRET(healthCertificateCode)
      ),
    {
      enabled: !!healthCertificateCode,
    }
  )

  return { isSuccess, data, isLoading }
}
