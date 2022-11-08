import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { FormProvider, useForm } from 'react-hook-form'
import { FactoryDto } from '@api/model/MDM/config/factory'
import usePostCodeStore from '@stores/postCode.store'
import React, { useEffect } from 'react'
import LoadingService from '@services/LoadingService'
import { useMutationWrap2 } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { useErrorStore } from '@stores/error.store'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { To } from '@routes/To'
import { useQueryClient } from 'react-query'
import {
  FactoryFormDataProps,
  factoryQueryKey,
} from '@domain/MDM/pages/Config/Factory/Props'

import {
  useFactoryCreateCall,
  useFactoryDeleteCall,
  useFactoryDetailCall,
  useFactoryUpdateCall,
} from '@domain/MDM/pages/Config/Factory/query/useFactoryCall'
import FactoryCenterDataLayer from '@domain/MDM/pages/Config/Factory/Detail/FactoryCenterDataLayer'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function FactoryCenterFormData(props: FactoryFormDataProps) {
  const { pageType } = props
  const { factoryCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !factoryCode
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useFactoryDetailCall({
    factoryCode: factoryCode as string,
  })
  const { mutate: createFactory } =
    useMutationWrap2<FactoryDto>(useFactoryCreateCall)
  const { mutate: updateFactory } =
    useMutationWrap2<FactoryDto>(useFactoryUpdateCall)
  const { mutate: deleteFactory } =
    useMutationWrap2<FactoryDto>(useFactoryDeleteCall)

  const initFactoryInputDateSet: FactoryDto = {
    address1: '',
    address2: '',
    factoryCode: '',
    factoryName: '',
    manager: '',
    companyNumber: '',
    phoneNumber: '',
    memo: '',
    centerType: 'logistics',
    useYN: false,
    zipcode: '',
  }

  const methods = useForm<FactoryDto>({
    mode: 'onBlur',
    defaultValues: data ?? initFactoryInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data, e) => {
      const submitEvent = e as React.BaseSyntheticEvent<
        SubmitEvent,
        HTMLButtonElement,
        HTMLFormElement
      >

      const typeSubmit = {
        delete: () => {
          confirmOpen(true)
        },
        save: () => {
          LoadingService.show()
          if (isCreate) {
            // 신규
            createFactory(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(factoryQueryKey.list)
                SnackbarService.show(MSG.SUCCESS.SAVE_FACTORY)
                navigate(`${To.MDMConfigFactory}`)
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
            updateFactory(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  factoryQueryKey.detail(factoryCode as string)
                )
                navigate(`${To.MDMConfigFactory}/${factoryCode}`)
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

    return () => {
      usePostCodeStore.getState().reset()
    }
  }, [data, isLoading, isSuccess, methods])

  const onClickFactoryDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteFactory(
      {
        departmentCode: factoryCode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(factoryQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_FACTORY)
          navigate(`${To.MDMConfigFactory}`)
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
    addContent: '공장/센터 정보를 ',
    onConfirm: onClickFactoryDelete,
  })
  return (
    <Page>
      <FormProvider {...methods}>
        <form id="FactoryUpdateForm" onSubmit={onSubmit}>
          <FactoryCenterDataLayer pageType={pageType} />
        </form>
      </FormProvider>
      <ConfirmComp />

      {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
    </Page>
  )
}

export default FactoryCenterFormData
