import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type areaSearchInput = {
  factoryCode: string
  warehouseCode: string
}
export interface AreaState {
  SearchInput: areaSearchInput
  setSearchInput: (data: areaSearchInput) => void
}
const initialSearchInput: Pick<AreaState, 'SearchInput'> = {
  SearchInput: {
    factoryCode: '',
    warehouseCode: '',
  },
}
const useAreaStore = create<AreaState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: areaSearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useAreaStore
