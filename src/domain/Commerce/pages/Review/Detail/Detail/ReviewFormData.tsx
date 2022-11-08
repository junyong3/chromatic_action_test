import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import LoadingService from '@services/LoadingService'
import { useMutationWrap2 } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { useErrorStore } from '@stores/error.store'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { To } from '@routes/To'
import { useQueryClient } from 'react-query'
import { healthCertificateDto } from '@api/model/MDM/AddInfo/healthCertificate'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'
import ReviewDataLayer from '@domain/Commerce/pages/Review/Detail/Detail/ReviewDataLayer'
import { reviewDto } from '@api/model/Commerce/review'
import { useHealthCertificateDetailCall } from '@domain/MDM/pages/AddInfo/HealthCertificate/query/useHealthCertificateCall'
import { useReviewDetailCall } from '@domain/Commerce/pages/Review/query/useReviewCall'

function ReviewFormData() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useReviewDetailCall({
    id: id as string,
  })

  const initReviewInputDateSet: reviewDto = {
    id: '',
    createDate: '',
    updateDate: '',
    productName: '',
    productOption: '',
    isExposure: 'exposure',
    reviewType: 'textReview',
    reviewContent: '',
    userName: '',
    imageList: [],
    uid: '',
  }

  const methods = useForm<reviewDto>({
    mode: 'onBlur',
    defaultValues: data && initReviewInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data, e) => {
      console.log(data)
    },
    (data) => {
      console.log(data, 'error')
    }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
    methods.reset(data)
  }, [data, isLoading, isSuccess, methods])

  return (
    <FormProvider {...methods}>
      <form id="ReviewUpdateForm" onSubmit={onSubmit}>
        <ReviewDataLayer />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </form>
    </FormProvider>
  )
}

export default ReviewFormData
