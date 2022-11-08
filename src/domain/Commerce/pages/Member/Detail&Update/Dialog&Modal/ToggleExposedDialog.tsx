import { useCallback } from 'react'
import shallow from 'zustand/shallow'
import { Dialog } from '@components/Dialog'
import useMemberStore from '@stores/Commerce/Member/member.store'
import { useMutationWrap } from '@queries/useMutation'
import Button from '@components/Button'
import Instance from '@api/Instance'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { queryClient } from '@queries/client'

export enum ToggleExposedDialogType {
  COUPON = 'COUPON',
  POINT_HISTORY = 'POINT_HISTORY',
}

const info = {
  COUPON: {
    path: COMMERCE_MEMBER_API_PATH.MEMBER_COUPON,
    content: '고객 쿠폰내역 및 주문서',
    msg: MSG.SUCCESS.MEMBER_COUPON,
  },
  POINT_HISTORY: {
    path: COMMERCE_MEMBER_API_PATH.MEMBER_POINT_HISTORY,
    content: '고객의 적립금 내역',
    msg: MSG.SUCCESS.MEMBER_COUPON,
  },
}

function ToggleExposedDialog({
  type,
  refetchQuery,
}: {
  type: ToggleExposedDialogType
  refetchQuery?: readonly string[]
}) {
  const { mutate } = useMutationWrap()
  const [exposeToggleTarget, isExposeToggleDialogOpen] = useMemberStore(
    (state) => [state.exposeToggleTarget, state.isExposeToggleDialogOpen],
    shallow
  )

  const exposedToggle = () => {
    if (!exposeToggleTarget) return

    mutate(
      Instance.patch(
        info[type].path(exposeToggleTarget.id),
        exposeToggleTarget
      ),
      {
        onSuccess: () => {
          SnackbarService.show(
            info[type].msg[
              exposeToggleTarget.isExposed ? 'UNEXPOSED' : 'EXPOSED'
            ]
          )
          if (refetchQuery) queryClient.invalidateQueries(refetchQuery)
        },
        onSettled: () => {
          onClose()
        },
      }
    )
  }

  const onClose = useCallback(() => {
    useMemberStore.setState({
      exposeToggleTarget: null,
      isExposeToggleDialogOpen: false,
    })
  }, [])

  return exposeToggleTarget ? (
    <Dialog
      size={'sm'}
      open={isExposeToggleDialogOpen}
      title={`${exposeToggleTarget.isExposed ? '숨김' : '노출'}처리`}
      onClose={onClose}
      content={
        <>
          {info[type].content}에서{' '}
          {exposeToggleTarget.isExposed ? '숨겨집니다.' : '보여집니다.'}
          <br />
          계속 하시겠습니까?
        </>
      }
      actions={
        <>
          <Button onClick={onClose}>취소</Button>
          <Button data-cy={'dialogConfirmButton'} onClick={exposedToggle}>
            확인
          </Button>
        </>
      }
    ></Dialog>
  ) : null
}

export default ToggleExposedDialog
