import { reviewSearchInput } from '@stores/Commerce/Reviwe/review.store'

export type checkboxComp = {
  label: string
  key: string
  checked: boolean
}
export type ReviewCheckFilterProps = {
  checkboxCompList: checkboxComp[]
  type: 'exposureState' | 'reviewType'
  title: string
}

export const reviewQueryKey = {
  list: ['reviewList'] as const,
  searchList: (opt: Omit<reviewSearchInput, 'isRange'>) =>
    ['reviewList', { ...opt }] as const,
  detail: (id: string) => ['reviewDetail', id] as const,
  ReportList: (id: string) => ['reviewReport', id] as const,
}
