import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { OrgQueryKey } from '@domain/MDM/pages/Config/Organization/Props'
import { MDM_ORG_API_PATH } from '@api/path/MDM/Config/orgPath'
import { OrganizationDto, orgReq } from '@api/model/MDM/config/organization'

export const useOrgDetailCall = ({
  departmentCode,
}: Pick<orgReq, 'departmentCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<OrganizationDto>(
    OrgQueryKey.detail(departmentCode),
    () => Instance.get(MDM_ORG_API_PATH.ORG_DETAIL(departmentCode)),
    {
      enabled: !!departmentCode,
    }
  )

  return { isSuccess, data, isLoading }
}
