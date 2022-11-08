import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import usePostCodeStore from '@stores/postCode.store'
import React, { useEffect, useState } from 'react'
import LoadingService from '@services/LoadingService'
import { useMutationWrap2 } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { useErrorStore } from '@stores/error.store'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { To } from '@routes/To'
import { useQueryClient } from 'react-query'

import AreaDataLayer from '@domain/MDM/pages/Config/Area/Detail/AreaDataLayer'
import { areaDto } from '@api/model/MDM/config/area'
import { AreaQueryKey } from '@domain/MDM/pages/Config/Area/Props'
import { AreaCreateUpdatePageProps } from '../Props'
import {
  useAreaDetailCall,
  useAreaCreateCall,
  useAreaDeleteCall,
  useAreaUpdateCall,
} from '../query/useAreaCall'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function AreaCreateUpdatePage(props: AreaCreateUpdatePageProps) {
  const { pageType } = props
  const { areaCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !areaCode
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useAreaDetailCall({
    areaCode: areaCode as string,
  })
  const { mutate: createArea } = useMutationWrap2<areaDto>(useAreaCreateCall)
  const { mutate: updateArea } = useMutationWrap2<areaDto>(useAreaUpdateCall)
  const { mutate: deleteArea } = useMutationWrap2<areaDto>(useAreaDeleteCall)

  const initAreaInputDateSet: areaDto = {
    areaCode: '',
    areaName: '',
    factoryCode: 'A',
    factoryName: '',
    warehouseCode: 'W0001',
    warehouseName: '',
    keepType: 'temperature',
    useYN: false,
  }

  const methods = useForm<areaDto>({
    mode: 'onBlur',
    defaultValues: data ?? initAreaInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data, e) => {
      const factoryCodeString = data.factoryCode as unknown
      const warehouseCodeString = data.warehouseCode as unknown
      data.factoryCode = (factoryCodeString as Record<string, unknown>)
        .value as string
      data.warehouseCode = (warehouseCodeString as Record<string, unknown>)
        .value as string
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
            createArea(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(AreaQueryKey.list)
                SnackbarService.show(MSG.SUCCESS.SAVE_AREA)
                navigate(`${To.MDMConfigArea}`)
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
            updateArea(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  AreaQueryKey.detail(areaCode as string)
                )
                navigate(`${To.MDMConfigArea}/${areaCode}`)
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

  const onClickAreaDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteArea(
      {
        departmentCode: areaCode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(AreaQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_AREA)
          navigate(`${To.MDMConfigArea}`)
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
    addContent: '구역 정보를 ',
    onConfirm: onClickAreaDelete,
  })
  return (
    <FormProvider {...methods}>
      <form id="AreaUpdateForm" onSubmit={onSubmit}>
        <AreaDataLayer pageType={pageType} />
        <ConfirmComp />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </form>
    </FormProvider>
  )
}

export default AreaCreateUpdatePage
