import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { warehouseDto, warehouseListRes } from '@api/model/MDM/config/warehouse'
import { warehouseSearchInput } from '@stores/MDM/Config/warehouse.store'
import { WarehouseQueryKey } from '@domain/MDM/pages/Config/Warehouse/Props'
import { MDM_WAREHOUSE_API_PATH } from '@api/path/MDM/Config/warehousePath'

export const useWarehouseListCall = (params: warehouseSearchInput) => {
  const { isSuccess, isLoading, data } = useQueryWrap<warehouseListRes>(
    WarehouseQueryKey.searchList(params),
    () => Instance.get(MDM_WAREHOUSE_API_PATH.WAREHOUSE_LIST, params)
  )

  return { isSuccess, data, isLoading }
}
export const useWarehouseDetailCall = ({
  warehouseCode,
}: Pick<warehouseSearchInput, 'warehouseCode'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<warehouseDto>(
    WarehouseQueryKey.detail(warehouseCode),
    () => Instance.get(MDM_WAREHOUSE_API_PATH.WAREHOUSE_DETAIL(warehouseCode)),
    {
      enabled: !!warehouseCode,
    }
  )
  return { isSuccess, data, isLoading }
}
export const useWarehouseCreateCall = async (params: warehouseDto) => {
  const { data } = await Instance.post(
    MDM_WAREHOUSE_API_PATH.CREATE_WAREHOUSE,
    {
      data: params,
    }
  )
  return data
}

export const useWarehouseUpdateCall = async (params: warehouseDto) => {
  const { data } = await Instance.post(
    MDM_WAREHOUSE_API_PATH.UPDATE_WAREHOUSE,
    {
      data: params,
    }
  )
  return data
}

export const useWarehouseDeleteCall = async (params: warehouseSearchInput) => {
  const { data } = await Instance.delete(
    MDM_WAREHOUSE_API_PATH.DELETE_WAREHOUSE,
    {
      data: params,
    }
  )
  return data
}
