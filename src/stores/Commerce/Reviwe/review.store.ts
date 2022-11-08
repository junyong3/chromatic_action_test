import create from 'zustand'
import { devtools } from 'zustand/middleware'
import dayjs from 'dayjs'

export type reviewSearchInput = {
  isRange: boolean
  rangeDate: {
    startDate: string
    endDate: string
  }
  exposureState: Array<'all' | 'exposure' | 'unexposure'>
  reviewType: Array<'all' | 'textReview' | 'imageReview'>
  reportType: boolean
  filter: string
}
export interface ReviewState {
  SearchInput: reviewSearchInput
  setSearchInput: (data: reviewSearchInput) => void
}
const initialSearchInput: Pick<ReviewState, 'SearchInput'> = {
  SearchInput: {
    isRange: false,
    rangeDate: {
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    exposureState: ['all', 'exposure', 'unexposure'],
    reviewType: ['all', 'textReview', 'imageReview'],
    reportType: false,
    filter: '',
  },
}
const useReviewStore = create<ReviewState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setSearchInput: (inputData: reviewSearchInput) => {
      set({ SearchInput: inputData })
    },
    rest: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useReviewStore
