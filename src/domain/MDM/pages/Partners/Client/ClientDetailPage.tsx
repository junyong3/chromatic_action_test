import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { useQueryWrap } from '@queries/useQuery'
import LoadingService from '@services/LoadingService'
import { useClientStore } from '@stores/MDM/Partners/client.store'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { PartnersQueryKey, ClientTS } from '@domain/MDM/pages/Partners/Props'
import { useMutationWrap } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { MSG } from '@src/constants/MessageCode/msg'

function ClientDetailPage() {
  const { id } = useParams()
  const { mutate } = useMutationWrap<{ result: boolean }>()
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useClientStore((state) => [
    state.clientDateSet,
    state.setClientDataSet,
  ])
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

  const { isSuccess, isLoading } = useQueryWrap<ClientTS>(
    PartnersQueryKey.clientDetail(id as string),
    () =>
      Instance.get(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('client', id as string)
      ),
    {
      onSuccess: (dataInput: any) => {
        setDataSet(dataInput)
      },
      enabled: !!id,
    }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  const onClickDelete = () => {
    mutate(
      Instance.delete(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('client', id as string)
      ),
      {
        onSuccess: ({ data: { result } }) => {
          if (result) {
            SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.DELETE_CLIENT)
            navigate(`${To.MDMPartnersClient}`)
          } else console.error(`매출처 삭제 실패: [id] ${id}`)
        },
      }
    )
  }
  return (
    <Page>
      <SubHeader
        title={'매출처 상세'}
        deleteButton={{
          disabled: false,
          onClick: () => setIsDeleteDialog(true),
        }}
        updateButton={{
          disabled: false,
          onClick: () => navigate('update'),
          sbkind: 'pages/MDM/Partners/Client/Update',
        }}
      />
      <PartnersDataLayer<ClientTS>
        type={'client'}
        defaultValues={dataSet}
        disabled
      />

      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 매출처를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button data-cy={'dialogDeleteButton'} onClick={onClickDelete}>
              매출처 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default ClientDetailPage
