import Instance from '@api/Instance'
import { LOCATION_API_PATH } from '@api/path/MDM/Config/locationPath'
import {
  locationDto,
  locationListRes,
  locationReq,
} from '@api/model/MDM/config/location'
import { useQueryWrap } from '@queries/useQuery'
import { LocationQueryKey } from '@domain/MDM/pages/Config/Location/Props'
import { locationSearchInput } from '@stores/MDM/Config/location.store'

export const useLocationCreateCall = async (params: locationDto) => {
  const { data } = await Instance.post(LOCATION_API_PATH.LOCATION_CREATE, {
    data: params,
  })
  return data
}

export const useLocationUpdateCall = async (params: locationDto) => {
  const { data } = await Instance.post(LOCATION_API_PATH.LOCATION_UPDATE, {
    data: params,
  })
  return data
}

export const useLocationDeleteCall = async (params: locationReq) => {
  const { data } = await Instance.delete(LOCATION_API_PATH.LOCATION_DELETE, {
    data: params,
  })
  return data
}
export const useLocationListCall = (params: locationSearchInput) => {
  const { isSuccess, isLoading, data } = useQueryWrap<locationListRes>(
    LocationQueryKey.searchList(params),
    () => Instance.get(LOCATION_API_PATH.LOCATION_LIST, params)
  )
  return { isSuccess, data, isLoading }
}
export const useLocationDetailCall = ({
  locationCode,
}: {
  locationCode: string
}) => {
  const { isSuccess, isLoading, data } = useQueryWrap<locationDto>(
    LocationQueryKey.detail(locationCode),
    () => Instance.get(LOCATION_API_PATH.LOCATION_DETAIL(locationCode)),
    {
      enabled: !!locationCode,
    }
  )

  return { isSuccess, data, isLoading }
}
