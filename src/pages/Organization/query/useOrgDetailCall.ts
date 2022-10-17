import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { OrgQueryKey } from '@pages/Organization/Props'
import { ORG_API_PATH } from '@api/path/MDM/orgPath'
import { OrganizationDto, orgReq } from '@api/model/MDM/organization'

export const useOrgDetailCall = ({
  departmentCode,
}: Pick<orgReq, 'departmentCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<OrganizationDto>(
    OrgQueryKey.detail(departmentCode),
    () => NetworkService.mdm.get(ORG_API_PATH.ORG_DETAIL(departmentCode)),
    {
      enabled: !!departmentCode,
    }
  )

  return { isSuccess, data, isLoading }
}
