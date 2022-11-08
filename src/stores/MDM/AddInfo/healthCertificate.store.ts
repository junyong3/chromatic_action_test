import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type healthCertificateSearchInput = {
  factoryCode: string
  factoryName: string
  healthCertificateExpired: boolean[]
}
export interface HealthCertificateState {
  SearchInput: healthCertificateSearchInput
  setSearchInput: (data: healthCertificateSearchInput) => void
}
const initialSearchInput: Pick<HealthCertificateState, 'SearchInput'> = {
  SearchInput: {
    factoryCode: '',
    factoryName: '',
    healthCertificateExpired: [false],
  },
}
const useHealthCertificateStore = create<
  HealthCertificateState,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: healthCertificateSearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useHealthCertificateStore
