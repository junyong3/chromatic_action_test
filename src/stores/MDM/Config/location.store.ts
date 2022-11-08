import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type locationSearchInput = {
  factoryCode: string
  warehouseCode: string
  areaCode: string
}
export interface LocationState {
  SearchInput: locationSearchInput
  setSearchInput: (data: locationSearchInput) => void
}
const initialSearchInput: Pick<LocationState, 'SearchInput'> = {
  SearchInput: {
    factoryCode: '',
    warehouseCode: '',
    areaCode: '',
  },
}
const useLocationStore = create<LocationState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: locationSearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useLocationStore
