import create from 'zustand'

interface ErrorStoreState {
  isSystemError: boolean
  setIsSystemError: (isSystemError: boolean) => void
  isInvalidError: boolean
  setIsInvalidError: (isInvalidError: boolean) => void
  isServerErrorCode: boolean
  setServerErrorCode: (isServerErrorCode: boolean, code?: string | null) => void
  serverErrorCode: string | null
  reset: () => void
}
type initialErrorState =
  | 'isSystemError'
  | 'isInvalidError'
  | 'isServerErrorCode'
  | 'serverErrorCode'
const initialErrorStoreState: Pick<ErrorStoreState, initialErrorState> = {
  isSystemError: false,
  isInvalidError: false,
  isServerErrorCode: false,
  serverErrorCode: null,
}
export const useErrorStore = create<ErrorStoreState>((set) => ({
  ...initialErrorStoreState,
  setIsSystemError: (isSystemError: boolean) => set(() => ({ isSystemError })),
  setIsInvalidError: (isInvalidError: boolean) =>
    set(() => ({ isInvalidError })),
  setServerErrorCode: (isServerErrorCode: boolean, code?: string | null) => {
    set(() => ({ isServerErrorCode }))
    set(() => ({
      serverErrorCode: code,
    }))
  },
  reset: () => {
    set(initialErrorStoreState)
  },
}))
