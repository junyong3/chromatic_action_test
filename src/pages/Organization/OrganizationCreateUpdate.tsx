import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import OrganizationDataLayer from '@pages/Organization/Detail/OrganizationDataLayer'
import { useOrgDetailCall } from '@pages/Organization/query/useOrgDetailCall'
import { FormProvider, useForm } from 'react-hook-form'
import { OrganizationDto } from '@api/model/MDM/organization'
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
import { OrgQueryKey } from '@pages/Organization/Props'
import {
  useOrgCreateCall,
  useOrgDeleteCall,
  useOrgUpdateCall,
} from '@pages/Organization/query/useOrgCall'

function OrganizationCreateUpdate() {
  const { deptCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !deptCode
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [isServerErrorCode, setIsSystemError] = useErrorStore((state) => [
    state.isServerErrorCode,
    state.setServerErrorCode,
  ])
  const { isSuccess, data, isLoading } = useOrgDetailCall({
    departmentCode: deptCode as string,
  })
  const { mutate: createOrg } =
    useMutationWrap2<OrganizationDto>(useOrgCreateCall)
  const { mutate: updateOrg } =
    useMutationWrap2<OrganizationDto>(useOrgUpdateCall)
  const { mutate: deleteOrg } =
    useMutationWrap2<OrganizationDto>(useOrgDeleteCall)
  const initOrgInputDateSet = {
    departmentCode: '',
    departmentName: '',
    zipcode: '',
    address1: '',
    address2: '',
    manager: '',
    memo: '',
    useYN: false,
  }

  const methods = useForm<OrganizationDto>({
    mode: 'onBlur',
    defaultValues: data ?? initOrgInputDateSet,
  })

  const onSubmit = methods.handleSubmit(
    (data) => {
      LoadingService.show()
      if (isCreate) {
        // 신규
        createOrg(data, {
          onSuccess: () => {
            queryClient.invalidateQueries(OrgQueryKey.list)
            SnackbarService.show(MSG.SUCCESS.SAVE_ORG)
            navigate(`${To.MDMConfigOrg}`)
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
        updateOrg(data, {
          onSuccess: () => {
            queryClient.invalidateQueries(
              OrgQueryKey.detail(deptCode as string)
            )
            navigate(`${To.MDMConfigOrg}/${deptCode}`)
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
  const onClickOrgDelete = () => {
    // 삭제 처리
    LoadingService.show()
    deleteOrg(
      {
        departmentCode: deptCode,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(OrgQueryKey.list)
          SnackbarService.show(MSG.SUCCESS.DELETE_ORG)
          navigate(`${To.MDMConfigOrg}`)
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
        <form id="OrgUpdateForm" onSubmit={onSubmit}>
          <OrganizationDataLayer pageType={isCreate ? 'create' : 'update'} />
        </form>
      </FormProvider>
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={'정말로 조직정보를 삭제하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button data-cy={'dialogDeleteButton'} onClick={onClickOrgDelete}>
              삭제
            </Button>
          </>
        }
      />
      {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
    </Page>
  )
}

export default OrganizationCreateUpdate
