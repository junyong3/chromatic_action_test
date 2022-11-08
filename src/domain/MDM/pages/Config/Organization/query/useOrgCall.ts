import Instance from '@api/Instance'
import { MDM_ORG_API_PATH } from '@api/path/MDM/Config/orgPath'
import { OrganizationDto, orgReq } from '@api/model/MDM/config/organization'

export const useOrgCreateCall = async (params: OrganizationDto) => {
  const { data } = await Instance.post(MDM_ORG_API_PATH.CREATE_ORG, {
    data: params,
  })
  return data
}

export const useOrgUpdateCall = async (params: OrganizationDto) => {
  const { data } = await Instance.post(MDM_ORG_API_PATH.UPDATE_ORG, {
    data: params,
  })
  return data
}

export const useOrgDeleteCall = async (params: orgReq) => {
  const { data } = await Instance.delete(MDM_ORG_API_PATH.DELETE_ORG, {
    data: params,
  })
  return data
}
