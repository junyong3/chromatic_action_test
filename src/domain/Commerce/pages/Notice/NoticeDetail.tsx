import { SubHeader } from '@compositions/Header'
import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import React, { useState } from 'react'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import LoadingService from '@services/LoadingService'
import Page from '@components/Page'
import NoticeDataLayer from '@domain/Commerce/pages/Notice/Detail&Update/NoticeDataLayer'
import useNoticeStore from '@stores/Commerce/Notice/notice.store'
import { useEffect } from 'react'
import NoticeStore from '@stores/Commerce/Notice/notice.store'
import useNoticeDelete from '@domain/Commerce/pages/Notice/query/useNoticeDelete'
import { COMMERCE_NOTICE_API_PATH } from '@api/path/Commerce/noticePath'
import { NoticeDto } from '@api/model/Commerce/notice'

function NoticeDetail() {
  const { id: stringId } = useParams()
  const id = stringId as string
  const pageType = 'detail'
  const title = '공지 상세'
  const setNoticeInputDataSet = useNoticeStore(
    (state) => state.setNoticeInputDataSet
  )
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [isDisabledDeleteButton, setIsDisabledDeleteButton] = useState(true)
  const { deleteApi, onError, onSettled, onSuccess } = useNoticeDelete()
  const [isNotDeleteDialog, setIsNotDeleteDialog] = useState<boolean>(false)
  const {
    isSuccess,
    isLoading,
    data: noticeInputDataSet,
  } = useQueryWrap<NoticeDto>(
    ['detailNoticeDetail', id],
    () => Instance.get(COMMERCE_NOTICE_API_PATH.NOTICE_DETAIL(id)),
    {
      onSettled,
      onError,
      enabled: !!id,
    }
  )
  // 데이터 셋팅
  useEffect(() => {
    setNoticeInputDataSet({ ...noticeInputDataSet })
    setIsDisabledDeleteButton(!noticeInputDataSet?.id)
  }, [noticeInputDataSet, setNoticeInputDataSet])
  // 로딩 처리
  useEffect(() => {
    if (isLoading) {
      LoadingService.show()
    } else {
      LoadingService.close()
    }
  }, [isLoading, isSuccess])

  // useNoticeStore.subscribe(
  //   (state) => state.isSave,
  //   (paw, previousPaw) => console.log(paw, previousPaw, 3333)
  // )

  // 삭제 처리
  const onClickNoticeDelete = () => {
    LoadingService.show()
    deleteApi(Instance.delete(COMMERCE_NOTICE_API_PATH.NOTICE_DETAIL(id)), {
      onSuccess,
      onError,
      onSettled,
    })
  }
  // 삭제 버튼 event
  const onClickDelete = () => {
    // 노출 상태 삭제 불가
    if (NoticeStore.getState().noticeInputDataSet.published) {
      setIsNotDeleteDialog(true)
    } else {
      setIsDeleteDialog(true)
    }
  }
  return (
    <Page>
      <SubHeader
        title={title}
        deleteButton={{
          disabled: isDisabledDeleteButton,
          onClick: onClickDelete,
        }}
        updateButton={{
          disabled: false,
          onClick: () => (window.location.href = `${id}/update`),
        }}
      />
      <NoticeDataLayer pageType={pageType} />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={'정말로 공지를 삭제하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={onClickNoticeDelete}
            >
              삭제
            </Button>
          </>
        }
      />
      <Dialog
        size="sm"
        open={isNotDeleteDialog}
        title="삭제 불가"
        onClose={() => setIsNotDeleteDialog(false)}
        content={
          <>
            노출 상태인 공지글은 삭제할 수 없습니다.
            <br />
            {`공지의 노출 상태를 “미노출"로 저장한 후 다시 시도해 주세요.`}
          </>
        }
        actions={
          <>
            <Button onClick={() => setIsNotDeleteDialog(false)}>확인</Button>
          </>
        }
      />
    </Page>
  )
}

export default NoticeDetail
