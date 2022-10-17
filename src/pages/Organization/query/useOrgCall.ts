import NetworkService from '@api/NetworkService'
import { ORG_API_PATH } from '@api/path/MDM/orgPath'
import { OrganizationDto, orgReq } from '@api/model/MDM/organization'

export const useOrgCreateCall = async (params: OrganizationDto) => {
  const { data } = await NetworkService.mdm.post(ORG_API_PATH.ORG_CREATE, {
    data: params,
  })
  return data
}

export const useOrgUpdateCall = async (params: OrganizationDto) => {
  const { data } = await NetworkService.mdm.post(ORG_API_PATH.ORG_UPDATE, {
    data: params,
  })
  return data
}

export const useOrgDeleteCall = async (params: orgReq) => {
  const { data } = await NetworkService.mdm.delete(ORG_API_PATH.ORG_DELETE, {
    data: params,
  })
  return data
}
