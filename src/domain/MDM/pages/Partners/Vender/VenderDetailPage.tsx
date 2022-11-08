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
import { useVenderStore } from '@stores/MDM/Partners/vender.store'
import PartnersDataLayer from '@domain/MDM/pages/Partners/InputData/PartnersDataLayer'
import { PartnersQueryKey, VenderTS } from '@domain/MDM/pages/Partners/Props'
import { useMutationWrap } from '@queries/useMutation'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { MSG } from '@src/constants/MessageCode/msg'

function VenderDetailPage() {
  const { id } = useParams()
  const { mutate } = useMutationWrap<{ result: boolean }>()
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useVenderStore((state) => [
    state.venderDateSet,
    state.setVenderDataSet,
  ])
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

  const { isSuccess, isLoading } = useQueryWrap<VenderTS>(
    PartnersQueryKey.venderDetail(id as string),
    () =>
      Instance.get(
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('vender', id as string)
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
        MDM_PARTNERS_API_PATH.PARTNERS_DETAIL('vender', id as string)
      ),
      {
        onSuccess: ({ data: { result } }) => {
          if (result) {
            SnackbarService.show(MSG.SUCCESS.MDM.PARTNERS.DELETE_VENDER)
            navigate(`${To.MDMPartnersVender}`)
          } else console.error(`매입처 삭제 실패: [id] ${id}`)
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'매입처 상세'}
        deleteButton={{
          disabled: false,
          onClick: () => setIsDeleteDialog(true),
        }}
        updateButton={{
          disabled: false,
          onClick: () => navigate('update'),
          sbkind: 'pages/MDM/Partners/Vender/Update',
        }}
      />
      <PartnersDataLayer<VenderTS>
        type={'vender'}
        defaultValues={dataSet}
        disabled
      />

      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 매입처를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button data-cy={'dialogDeleteButton'} onClick={onClickDelete}>
              매입처 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default VenderDetailPage
