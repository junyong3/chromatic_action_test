import Instance from '@api/Instance'
import { MDM_FACTORY_API_PATH } from '@api/path/MDM/Config/factoryPath'
import {
  FactoryDto,
  FactoryListRes,
  FactoryReq,
} from '@api/model/MDM/config/factory'
import { useQueryWrap } from '@queries/useQuery'
import { factoryQueryKey } from '@domain/MDM/pages/Config/Factory/Props'

export const useFactoryCreateCall = async (params: FactoryDto) => {
  const { data } = await Instance.post(MDM_FACTORY_API_PATH.CREATE_FACTORY, {
    data: params,
  })
  return data
}

export const useFactoryUpdateCall = async (params: FactoryDto) => {
  const { data } = await Instance.post(MDM_FACTORY_API_PATH.UPDATE_FACTORY, {
    data: params,
  })
  return data
}

export const useFactoryDeleteCall = async (params: FactoryReq) => {
  const { data } = await Instance.delete(MDM_FACTORY_API_PATH.DELETE_FACTORY, {
    data: params,
  })
  return data
}
export const useFactoryListCall = (params: FactoryReq) => {
  const { isSuccess, isLoading, data } = useQueryWrap<FactoryListRes>(
    factoryQueryKey.searchList(params),
    () => Instance.get(MDM_FACTORY_API_PATH.FACTORY_LIST, params)
  )
  return { isSuccess, data, isLoading }
}
export const useFactoryDetailCall = ({
  factoryCode,
}: Pick<FactoryReq, 'factoryCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<FactoryDto>(
    factoryQueryKey.detail(factoryCode),
    () => Instance.get(MDM_FACTORY_API_PATH.FACTORY_DETAIL(factoryCode)),
    {
      enabled: !!factoryCode,
    }
  )

  return { isSuccess, data, isLoading }
}
