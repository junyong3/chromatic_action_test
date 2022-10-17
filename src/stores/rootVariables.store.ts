import create from 'zustand'

type globalState = {
  loadingState: boolean
}
const initialGlobal: globalState = {
  loadingState: false,
}
export const useRootVariables = create<globalState>(() => {
  return {
    ...initialGlobal,
  }
})
