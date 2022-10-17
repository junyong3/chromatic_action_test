import NetworkService from '@api/NetworkService'
import { FACTORY_API_PATH } from '@api/path/MDM/factoryPath'
import { FactoryDto, FactoryListRes, FactoryReq } from '@api/model/MDM/factory'
import { useQueryWrap } from '@queries/useQuery'
import { factoryQueryKey } from '@pages/Factory/Props'

export const useFactoryCreateCall = async (params: FactoryDto) => {
  const { data } = await NetworkService.mdm.post(
    FACTORY_API_PATH.FACTORY_CREATE,
    {
      data: params,
    }
  )
  return data
}

export const useFactoryUpdateCall = async (params: FactoryDto) => {
  const { data } = await NetworkService.mdm.post(
    FACTORY_API_PATH.FACTORY_UPDATE,
    {
      data: params,
    }
  )
  return data
}

export const useFactoryDeleteCall = async (params: FactoryReq) => {
  const { data } = await NetworkService.mdm.delete(
    FACTORY_API_PATH.FACTORY_DELETE,
    {
      data: params,
    }
  )
  return data
}
export const useFactoryListCall = (params: FactoryReq) => {
  const { isSuccess, isLoading, data } = useQueryWrap<FactoryListRes>(
    factoryQueryKey.searchList(params),
    () => NetworkService.mdm.get(FACTORY_API_PATH.FACTORY_LIST, params)
  )
  return { isSuccess, data, isLoading }
}
export const useFactoryDetailCall = ({
  factoryCode,
}: Pick<FactoryReq, 'factoryCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<FactoryDto>(
    factoryQueryKey.detail(factoryCode),
    () => NetworkService.mdm.get(FACTORY_API_PATH.FACTORY_DETAIL(factoryCode)),
    {
      enabled: !!factoryCode,
    }
  )

  return { isSuccess, data, isLoading }
}
