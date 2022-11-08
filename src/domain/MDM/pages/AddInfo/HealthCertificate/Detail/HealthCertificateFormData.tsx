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

import HealthCertificateDataLayer from '@domain/MDM/pages/AddInfo/HealthCertificate/Detail/HealthCertificateDataLayer'
import { healthCertificateDto } from '@api/model/MDM/AddInfo/healthCertificate'
import { HealthCertificateQueryKey } from '@domain/MDM/pages/AddInfo/HealthCertificate/Props'
import { HealthCertificateFormDataProps } from '../Props'
import {
  useHealthCertificateDetailCall,
  useHealthCertificateCreateCall,
  useHealthCertificateDeleteCall,
  useHealthCertificateUpdateCall,
} from '../query/useHealthCertificateCall'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function HealthCertificateFormData(props: HealthCertificateFormDataProps) {
  const { pageType } = props
  const { healthCertificateId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !healthCertificateId
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useHealthCertificateDetailCall({
    healthCertificateCode: healthCertificateId as string,
  })

  const { mutate: createHealthCertificate } =
    useMutationWrap2<healthCertificateDto>(useHealthCertificateCreateCall)
  const { mutate: updateHealthCertificate } =
    useMutationWrap2<healthCertificateDto>(useHealthCertificateUpdateCall)
  const { mutate: deleteHealthCertificate } =
    useMutationWrap2<healthCertificateDto>(useHealthCertificateDeleteCall)

  const initHealthCertificateInputDateSet: healthCertificateDto = {
    healthCRETCreateDate: '',
    healthCRETExpiryDate: '',
    healthCertificateExpired: false,
    healthCRETCode: '',
    phoneNumber: '',
    healthCertificateFile: null,
    name: '',
    department: '',
  }

  const methods = useForm<healthCertificateDto>({
    mode: 'onBlur',
    defaultValues: data ?? initHealthCertificateInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data, e) => {
      console.log(data)
      const submitEvent = e as React.BaseSyntheticEvent<
        SubmitEvent,
        HTMLButtonElement,
        HTMLFormElement
      >
      // const formData = new FormData()
      // formData.append(
      //   'healthCertificateFile',
      //   data?.healthCertificateFile || ''
      // )
      const typeSubmit = {
        delete: () => {
          confirmOpen(true)
        },
        save: () => {
          LoadingService.show()
          if (isCreate) {
            // 신규
            createHealthCertificate(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(HealthCertificateQueryKey.list)
                SnackbarService.show(MSG.SUCCESS.SAVE_HEALTH_CRET)
                navigate(`${To.MDMAddInfoHealthCertificate}`)
              },
              onError: ({ response }) => {
                const code = response?.data.code
                setIsSystemError(true, code)
              },
              onSettled: () => {
                confirmOpen(false)
                LoadingService.close()
              },
            })
          } else {
            //수정
            updateHealthCertificate(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  HealthCertificateQueryKey.detail(
                    healthCertificateId as string
                  )
                )
                navigate(
                  `${To.MDMAddInfoHealthCertificate}/${healthCertificateId}`
                )
              },
              onError: ({ response }) => {
                const code = response?.data.code
                setIsSystemError(true, code)
              },
              onSettled: () => {
                confirmOpen(false)
                LoadingService.close()
              },
            })
          }
        },
      }
      const submitType = submitEvent.nativeEvent.submitter
        ?.id as keyof typeof typeSubmit

      typeSubmit[submitType]()
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

  const onClickHealthCertificateDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteHealthCertificate(
      {
        departmentCode: healthCertificateId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(HealthCertificateQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_HEALTH_CRET)
          navigate(`${To.MDMAddInfoHealthCertificate}`)
        },
        onError: ({ response }) => {
          const code = response?.data.code
          setIsSystemError(true, code)
        },
        onSettled: () => {
          confirmOpen(false)
          LoadingService.close()
        },
      }
    )
  }
  const { confirmOpen, ConfirmComp } = useConfirmDialog({
    type: 'delete',
    addContent: '보건증 정보를 ',
    onConfirm: onClickHealthCertificateDelete,
  })

  return (
    <FormProvider {...methods}>
      <form id="HealthCertificateUpdateForm" onSubmit={onSubmit}>
        <HealthCertificateDataLayer pageType={pageType} />
        <ConfirmComp />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </form>
    </FormProvider>
  )
}

export default HealthCertificateFormData
