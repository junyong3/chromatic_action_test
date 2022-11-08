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

import LocationDataLayer from '@domain/MDM/pages/Config/Location/Detail/LocationDataLayer'
import { locationDto } from '@api/model/MDM/config/location'
import { LocationQueryKey } from '@domain/MDM/pages/Config/Location/Props'
import { LocationCreateUpdatePageProps } from '../Props'
import {
  useLocationDetailCall,
  useLocationCreateCall,
  useLocationDeleteCall,
  useLocationUpdateCall,
} from '../query/useLocationCall'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function LocationCreateUpdatePage(props: LocationCreateUpdatePageProps) {
  const { pageType } = props
  const { locationCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !locationCode
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useLocationDetailCall({
    locationCode: locationCode as string,
  })
  const { mutate: createLocation } = useMutationWrap2<locationDto>(
    useLocationCreateCall
  )
  const { mutate: updateLocation } = useMutationWrap2<locationDto>(
    useLocationUpdateCall
  )
  const { mutate: deleteLocation } = useMutationWrap2<locationDto>(
    useLocationDeleteCall
  )

  const initLocationInputDateSet: locationDto = {
    locationCode: '',
    locationName: '',
    cellCol: '',
    cellStage: '',
    cellAlign: 'left',
    locationType: 'heavyRack',
    areaCode: '',
    areaName: '',
    factoryCode: 'A',
    factoryName: '',
    warehouseCode: 'W0001',
    warehouseName: '',
    keepType: 'temperature',
    useYN: false,
  }

  const methods = useForm<locationDto>({
    mode: 'onBlur',
    defaultValues: data ?? initLocationInputDateSet,
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
            createLocation(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(LocationQueryKey.list)
                SnackbarService.show(MSG.SUCCESS.SAVE_AREA)
                navigate(`${To.MDMConfigLocation}`)
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
            updateLocation(data, {
              onSuccess: () => {
                queryClient.invalidateQueries(
                  LocationQueryKey.detail(locationCode as string)
                )
                navigate(`${To.MDMConfigLocation}/${locationCode}`)
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

  const onClickLocationDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteLocation(
      {
        departmentCode: locationCode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(LocationQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_AREA)
          navigate(`${To.MDMConfigLocation}`)
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
    addContent: '로케이션 정보를 ',
    onConfirm: onClickLocationDelete,
  })
  return (
    <FormProvider {...methods}>
      <form id="LocationUpdateForm" onSubmit={onSubmit}>
        <LocationDataLayer pageType={pageType} />
        <ConfirmComp />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </form>
    </FormProvider>
  )
}

export default LocationCreateUpdatePage
