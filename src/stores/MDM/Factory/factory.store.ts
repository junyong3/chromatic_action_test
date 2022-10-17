import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type FactorySearchInput = {
  factoryCode: string
  factoryName: string
}
export interface FactoryState {
  SearchInput: FactorySearchInput
  setSearchInput: (data: FactorySearchInput) => void
}
const initialSearchInput: Pick<FactoryState, 'SearchInput'> = {
  SearchInput: {
    factoryCode: '',
    factoryName: '',
  },
}
const useFactoryStore = create<FactoryState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: FactorySearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useFactoryStore
