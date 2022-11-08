import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { OrgQueryKey } from '@domain/MDM/pages/Config/Organization/Props'
import { MDM_ORG_API_PATH } from '@api/path/MDM/Config/orgPath'
import { orgListRes, orgReq } from '@api/model/MDM/config/organization'

export const useOrgListCall = (params: orgReq) => {
  const { isSuccess, isLoading, data } = useQueryWrap<orgListRes>(
    OrgQueryKey.searchList(params),
    () => Instance.get(MDM_ORG_API_PATH.ORG_LIST, params)
  )

  return { isSuccess, data, isLoading }
}
