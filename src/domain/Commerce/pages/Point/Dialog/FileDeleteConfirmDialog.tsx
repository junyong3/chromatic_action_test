import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { usePointStore } from '@stores/Commerce/Point/point.store'
import SnackbarService from '@services/SnackbarService'
import { COMMERCE_POINT_API_PATH } from '@api/path/Commerce/pointPath'

function FileDeleteConfirmDialog() {
  const { mutate } = useMutationWrap()

  const [isPaymentDeleteDialog, paymentDeleteParams, setIsPaymentDeleteDialog] =
    usePointStore((state) => [
      state.isPaymentDeleteDialog,
      state.paymentDeleteParams,
      state.setIsPaymentDeleteDialog,
    ])

  const onClickNoticeDelete = () => {
    mutate(
      Instance.delete(COMMERCE_POINT_API_PATH.DELETE_POINT, {
        id: paymentDeleteParams,
      }),
      {
        onSuccess: () => {
          SnackbarService.show('데이터가 정상적으로 삭제되었습니다.')
          setIsPaymentDeleteDialog(false)
        },
      }
    )
  }
  return (
    <Dialog
      size={'sm'}
      open={isPaymentDeleteDialog}
      title="삭제"
      onClose={() => setIsPaymentDeleteDialog(false)}
      content={'등록한 파일을 삭제하시겠습니까?'}
      actions={
        <>
          <Button onClick={() => setIsPaymentDeleteDialog(false)}>취소</Button>
          <Button data-cy={'dialogDeleteButton'} onClick={onClickNoticeDelete}>
            확인
          </Button>
        </>
      }
    />
  )
}

export default FileDeleteConfirmDialog
