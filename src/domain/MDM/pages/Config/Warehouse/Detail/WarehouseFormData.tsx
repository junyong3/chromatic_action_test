import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
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
  useWarehouseCreateCall,
  useWarehouseDeleteCall,
  useWarehouseDetailCall,
  useWarehouseUpdateCall,
} from '@domain/MDM/pages/Config/Warehouse/query/useWarehouseCall'
import WarehouseDataLayer from '@domain/MDM/pages/Config/Warehouse/Detail/WarehouseDataLayer'
import { warehouseDto } from '@api/model/MDM/config/warehouse'
import {
  WarehouseCreateUpdatePageProps,
  WarehouseQueryKey,
} from '@domain/MDM/pages/Config/Warehouse/Props'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function WarehouseCreateUpdatePage(props: WarehouseCreateUpdatePageProps) {
  const { pageType } = props
  const { warehouseCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !warehouseCode
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useWarehouseDetailCall({
    warehouseCode: warehouseCode as string,
  })
  const { mutate: createWarehouse } = useMutationWrap2<warehouseDto>(
    useWarehouseCreateCall
  )
  const { mutate: updateWarehouse } = useMutationWrap2<warehouseDto>(
    useWarehouseUpdateCall
  )
  const { mutate: deleteWarehouse } = useMutationWrap2<warehouseDto>(
    useWarehouseDeleteCall
  )

  const initWarehouseInputDateSet: warehouseDto = {
    warehouseCode: '',
    warehouseName: '',
    factoryCode: 'A',
    factoryName: '',
    keepType: 'temperature',
    saveType: 'storage',
    ManagementType: 'logistics',
    memo: '',
    useYN: false,
  }

  const methods = useForm<warehouseDto>({
    mode: 'onBlur',
    defaultValues: data ?? initWarehouseInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data, e) => {
      const factoryCodeString = data.factoryCode as unknown
      data.factoryCode = (factoryCodeString as Record<string, unknown>)
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
            createWarehouse(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(WarehouseQueryKey.list)
                SnackbarService.show(MSG.SUCCESS.SAVE_WAREHOUSE)
                navigate(`${To.MDMConfigWarehouse}`)
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
            updateWarehouse(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  WarehouseQueryKey.detail(warehouseCode as string)
                )
                navigate(`${To.MDMConfigWarehouse}/${warehouseCode}`)
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

  const onClickWarehouseDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteWarehouse(
      {
        departmentCode: warehouseCode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(WarehouseQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_WAREHOUSE)
          navigate(`${To.MDMConfigWarehouse}`)
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
    addContent: '창고 정보를 ',
    onConfirm: onClickWarehouseDelete,
  })
  return (
    <FormProvider {...methods}>
      <form id="WarehouseUpdateForm" onSubmit={onSubmit}>
        <WarehouseDataLayer pageType={pageType} />
        <ConfirmComp />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </form>
    </FormProvider>
  )
}

export default WarehouseCreateUpdatePage
