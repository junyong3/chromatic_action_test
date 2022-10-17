import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { FormProvider, useForm } from 'react-hook-form'
import { FactoryDto } from '@api/model/MDM/factory'
import usePostCode from '@stores/postCode.store'
import React, { useEffect, useState } from 'react'
import LoadingService from '@services/LoadingService'
import { useMutationWrap2 } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@src/constants/MessageCode/msg'
import { useErrorStore } from '@stores/error.store'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { To } from '@routes/To'
import { useQueryClient } from 'react-query'
import { factoryQueryKey } from '@pages/Factory/Props'

import {
  useFactoryCreateCall,
  useFactoryDeleteCall,
  useFactoryDetailCall,
  useFactoryUpdateCall,
} from '@pages/Factory/query/useFactoryCall'
import FactoryCenterDataLayer from '@pages/Factory/Detail/FactoryCenterDataLayer'

function FactoryCenterCreateUpdate() {
  const { factoryCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !factoryCode
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
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
    (data) => {
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
            setIsDeleteDialog(false)
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
            setIsDeleteDialog(false)
            LoadingService.close()
          },
        })
      }
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
      usePostCode.getState().reset()
    }
  }, [data, isLoading, isSuccess, methods])

  // 삭제 버튼 event
  const onClickDelete = () => {
    setIsDeleteDialog(true)
  }
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
          setIsDeleteDialog(false)
          LoadingService.close()
        },
      }
    )
  }
  // 저장 버튼 event
  const onClickSave = () => {
    console.log(111)
    onSubmit()
    // (수정 & 신규) 저장 처리
  }
  return (
    <Page>
      <SubHeader
        title={'조직 정보 상세'}
        deleteButton={{
          ...(!isCreate && {
            onClick: onClickDelete,
          }),
        }}
        saveButton={{
          onClick: onClickSave,
        }}
      />
      <FormProvider {...methods}>
        <form id="FactoryUpdateForm" onSubmit={onSubmit}>
          <FactoryCenterDataLayer pageType={isCreate ? 'create' : 'update'} />
        </form>
      </FormProvider>
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={'정말로 공장/센터 정보를 삭제하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={onClickFactoryDelete}
            >
              삭제
            </Button>
          </>
        }
      />
      {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
    </Page>
  )
}

export default FactoryCenterCreateUpdate
