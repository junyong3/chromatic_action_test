import Instance from '@api/Instance'

import { useQueryWrap } from '@queries/useQuery'
import {
  reportListDto,
  reportListRes,
  reviewDto,
  reviewListRes,
  reviewReq,
} from '@src/api/model/Commerce/review'
import { COMMERCE_REVIEW_API_PATH } from '@src/api/path/Commerce/reviewPath'
import { reviewQueryKey } from '@domain/Commerce/pages/Review/Props'

export const useReviewListCall = (params: reviewReq) => {
  const { isSuccess, isLoading, data, refetch } = useQueryWrap<reviewListRes>(
    reviewQueryKey.searchList(params),
    () => Instance.get(COMMERCE_REVIEW_API_PATH.REVIEW_LIST, params)
  )
  return { isSuccess, data, isLoading, refetch }
}
export const useReviewDetailCall = ({ id }: Pick<reviewDto, 'id'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<reviewDto>(
    reviewQueryKey.detail(id),
    () => Instance.get(COMMERCE_REVIEW_API_PATH.REVIEW_DETAIL(id)),
    {
      enabled: !!id,
    }
  )

  return { isSuccess, data, isLoading }
}

export const useReviewReportCall = ({ id }: Pick<reportListDto, 'id'>) => {
  const { isSuccess, isLoading, data } = useQueryWrap<reportListRes>(
    reviewQueryKey.ReportList(id),
    () => Instance.get(COMMERCE_REVIEW_API_PATH.REVIEW_REPORT_LIST(id)),
    {
      enabled: !!id,
    }
  )

  return { isSuccess, data, isLoading }
}
