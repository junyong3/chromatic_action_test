import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { jusoDto } from '@api/Instance/JusoAPi'

export type kakaoPostCode = {
  zonecode: string
  address: string
}
export type jusoPostData = jusoDto
export interface PostCodeState {
  zonecode: string
  address: string
  keyword: string
  jusoPostCode: jusoPostData
  setKeyword: (data: string) => void
  setPostCode: (data: kakaoPostCode) => void
  setJusoPostCode: (data: jusoPostData) => void
  reset: () => void
}
const initialPostCode: Omit<
  PostCodeState,
  'setPostCode' | 'reset' | 'setKeyword' | 'setJusoPostCode'
> = {
  zonecode: '',
  keyword: '',
  address: '',
  jusoPostCode: {
    roadAddr: '',
    roadAddrPart1: '',
    roadAddrPart2: '',
    engAddr: '',
    jibunAddr: '',
    zipNo: '',
    admCd: '',
    rnMgtSn: '',
    bdMgtSn: '',
    detBdNmList: '',
    bdNm: '',
    bdKdcd: '',
    siNm: '',
    sggNm: '',
    emdNm: '',
    liNm: '',
    rn: '',
    udrtYn: '',
    buldMnnm: '',
    buldSlno: '',
    mtYn: '',
    lnbrMnnm: '',
    lnbrSlno: '',
    emdNo: '',
    hstryYn: '',
    relJibun: '',
    hemdNm: '',
  },
}
const usePostCodeStore = create<PostCodeState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialPostCode,
    setPostCode: (inputData: kakaoPostCode) => {
      set({ zonecode: inputData.zonecode, address: inputData.address })
    },
    setJusoPostCode: (inputData: jusoPostData) => {
      set({
        jusoPostCode: inputData,
      })
    },
    setKeyword: (inputData: string) => {
      set({ keyword: inputData })
    },
    reset: () => {
      set({ ...initialPostCode })
    },
  }))
)

export default usePostCodeStore
