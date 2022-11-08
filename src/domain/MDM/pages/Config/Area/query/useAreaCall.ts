import Instance from '@api/Instance'
import { AREA_API_PATH } from '@api/path/MDM/Config/areaPath'
import { areaDto, areaListRes, areaReq } from '@api/model/MDM/config/area'
import { useQueryWrap } from '@queries/useQuery'
import { AreaQueryKey } from '@domain/MDM/pages/Config/Area/Props'
import { areaSearchInput } from '@stores/MDM/Config/area.store'

export const useAreaCreateCall = async (params: areaDto) => {
  const { data } = await Instance.post(AREA_API_PATH.AREA_CREATE, {
    data: params,
  })
  return data
}

export const useAreaUpdateCall = async (params: areaDto) => {
  const { data } = await Instance.post(AREA_API_PATH.AREA_UPDATE, {
    data: params,
  })
  return data
}

export const useAreaDeleteCall = async (params: areaReq) => {
  const { data } = await Instance.delete(AREA_API_PATH.AREA_DELETE, {
    data: params,
  })
  return data
}
export const useAreaListCall = (params: areaSearchInput) => {
  const { isSuccess, isLoading, data } = useQueryWrap<areaListRes>(
    AreaQueryKey.searchList(params),
    () => Instance.get(AREA_API_PATH.AREA_LIST, params)
  )
  return { isSuccess, data, isLoading }
}
export const useAreaDetailCall = ({ areaCode }: Pick<areaReq, 'areaCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<areaDto>(
    AreaQueryKey.detail(areaCode),
    () => Instance.get(AREA_API_PATH.AREA_DETAIL(areaCode)),
    {
      enabled: !!areaCode,
    }
  )

  return { isSuccess, data, isLoading }
}
