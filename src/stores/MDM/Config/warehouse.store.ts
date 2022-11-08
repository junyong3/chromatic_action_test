import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { factoryTypeUnion } from '@api/model/MDM/config/factory'

export type warehouseSearchInput = {
  factoryCode: string
  factoryType: factoryTypeUnion
  warehouseCode: string
  warehouseName: string
}
export interface WarehouseState {
  SearchInput: warehouseSearchInput
  setSearchInput: (data: warehouseSearchInput) => void
}
const initialSearchInput: Pick<WarehouseState, 'SearchInput'> = {
  SearchInput: {
    factoryCode: '',
    factoryType: 'logistics',
    warehouseCode: '',
    warehouseName: '',
  },
}
const useWarehouseStore = create<WarehouseState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: warehouseSearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useWarehouseStore
