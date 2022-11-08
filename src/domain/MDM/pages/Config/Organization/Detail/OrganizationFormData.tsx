import OrganizationDataLayer from '@domain/MDM/pages/Config/Organization/Detail/OrganizationDataLayer'
import { FormProvider, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import ServerErrorCodeDialog from '@components/Dialog/ServerErrorCodeDialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useErrorStore } from '@stores/error.store'
import { useOrgDetailCall } from '@domain/MDM/pages/Config/Organization/query/useOrgDetailCall'
import { useMutationWrap2 } from '@queries/useMutation'
import { OrganizationDto } from '@api/model/MDM/config/organization'
import {
  useOrgCreateCall,
  useOrgDeleteCall,
  useOrgUpdateCall,
} from '@domain/MDM/pages/Config/Organization/query/useOrgCall'
import LoadingService from '@services/LoadingService'
import {
  OrganizationFormDataProps,
  OrgQueryKey,
} from '@domain/MDM/pages/Config/Organization/Props'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import usePostCodeStore from '@stores/postCode.store'
import useConfirmDialog from '@components/Dialog/hooks/useConfirmDialog'

function OrganizationFormData(props: OrganizationFormDataProps) {
  const { pageType } = props
  const { deptCode } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = !deptCode
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
                confirmOpen(false)
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
          confirmOpen(false)
          LoadingService.close()
        },
      }
    )
  }
  const { confirmOpen, ConfirmComp } = useConfirmDialog({
    type: 'delete',
    addContent: '조직정보를 ',
    onConfirm: onClickOrgDelete,
  })
  return (
    <>
      <FormProvider {...methods}>
        <form id="OrgUpdateForm" onSubmit={onSubmit}>
          <OrganizationDataLayer pageType={pageType} />
        </form>
        <ConfirmComp />
        {isServerErrorCode ? <ServerErrorCodeDialog /> : null}
      </FormProvider>
    </>
  )
}

export default OrganizationFormData
