import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { OrgQueryKey } from '@pages/Organization/Props'
import { ORG_API_PATH } from '@api/path/MDM/orgPath'
import { orgListRes, orgReq } from '@api/model/MDM/organization'

export const useOrgListCall = (params: orgReq) => {
  const { isSuccess, isLoading, data } = useQueryWrap<orgListRes>(
    OrgQueryKey.searchList(params),
    () => NetworkService.mdm.get(ORG_API_PATH.ORG_LIST, params)
  )

  return { isSuccess, data, isLoading }
}
