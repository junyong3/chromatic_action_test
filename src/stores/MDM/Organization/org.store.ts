import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type SearchInput = {
  departmentCode: string
  departmentName: string
}
export interface OrgState {
  SearchInput: SearchInput
  setSearchInput: (data: SearchInput) => void
}
const initialSearchInput: Pick<OrgState, 'SearchInput'> = {
  SearchInput: {
    departmentCode: '',
    departmentName: '',
  },
}
const useOrgStore = create<OrgState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: SearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useOrgStore
