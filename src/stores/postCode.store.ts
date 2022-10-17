import create from 'zustand'
import { devtools } from 'zustand/middleware'

export type kakaoPostCode = {
  zonecode: string
  address: string
}
export interface PostCodeState {
  zonecode: string
  address: string
  setPostCode: (data: kakaoPostCode) => void
  reset: () => void
}
const initialPostCode: Omit<PostCodeState, 'setPostCode' | 'reset'> = {
  zonecode: '',
  address: '',
}
const usePostCode = create<PostCodeState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialPostCode,
    setPostCode: (inputData: kakaoPostCode) => {
      set({ zonecode: inputData.zonecode, address: inputData.address })
    },
    reset: () => {
      set({ ...initialPostCode })
    },
  }))
)

export default usePostCode
