import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_NOTICE_API_PATH } from '@api/path/Commerce/noticePath'
import {
  CreateNoticeReq,
  NoticeDto,
  UpdateNoticeReq,
} from '@api/model/Commerce/notice'
import { SubHeader } from '@compositions/Header'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import LoadingService from '@services/LoadingService'
import Page from '@components/Page'
import NoticeDataLayer from '@domain/Commerce/pages/Notice/Detail&Update/NoticeDataLayer'
import useNoticeStore from '@stores/Commerce/Notice/notice.store'
import InvalidParamsErrorDialog from '@components/Dialog/InvalidParamsErrorDialog'
import useNoticeCreateUpdate from '@domain/Commerce/pages/Notice/query/useNoticeCreateUpdate'

function NoticeCreateUpdate() {
  const { id: stringId } = useParams()
  const id = stringId as string
  const pageType = stringId ? 'update' : 'create'
  const title = id ? '공지 수정' : '공지 생성'
  const activeSaveBtn = useNoticeStore((state) => state.isSave)
  const setNoticeInputDataSet = useNoticeStore(
    (state) => state.setNoticeInputDataSet
  )
  const [isSaveDisable, setIsSaveDisable] = useState<boolean>(activeSaveBtn)
  const [isDialog, setIsDialog] = useState<boolean>(false)
  const { CNU, onError, onSettled, onSuccess } = useNoticeCreateUpdate({
    pageType,
    setIsDialog,
    id,
  })

  // get Notice data (id)
  const {
    isSuccess,
    isLoading,
    data: noticeInputDataSet,
  } = useQueryWrap<NoticeDto>(
    ['detailNoticeCNU', id],
    () => Instance.get(COMMERCE_NOTICE_API_PATH.NOTICE_DETAIL(id)),
    {
      enabled: !!id,
    }
  )
  // 데이터 셋팅
  useEffect(() => {
    if (pageType === 'update') {
      setNoticeInputDataSet({ ...noticeInputDataSet })
      useNoticeStore.setState({ isUpdate: true })
    }
  }, [noticeInputDataSet, pageType, setNoticeInputDataSet])

  // 로딩 처리
  useEffect(() => {
    if (isLoading) {
      LoadingService.show()
    } else {
      LoadingService.close()
    }
  }, [isLoading, isSuccess])
  // 저장버튼 활성화
  useEffect(() => {
    setIsSaveDisable(activeSaveBtn)
  }, [activeSaveBtn])

  // 저장 및 수정 처리
  const onClickSave = () => {
    LoadingService.show()

    const createNoticeParams: CreateNoticeReq = {
      title: useNoticeStore.getState().noticeInputDataSet.title ?? '',
      content: useNoticeStore.getState().noticeInputDataSet.content ?? '',
    }

    if (pageType === 'create') {
      CNU(
        Instance.post<CreateNoticeReq>(
          COMMERCE_NOTICE_API_PATH.CREATE_NOTICE,
          createNoticeParams
        ),
        {
          onSuccess: onSuccess,
          onError: onError,
          onSettled: onSettled,
        }
      )
    } else {
      CNU(
        Instance.patch<UpdateNoticeReq>(
          COMMERCE_NOTICE_API_PATH.NOTICE_DETAIL(id),
          {
            title: useNoticeStore.getState().noticeInputDataSet.title ?? '',
            content: useNoticeStore.getState().noticeInputDataSet.content ?? '',
            published:
              useNoticeStore.getState().noticeInputDataSet.published ?? false,
          }
        ),
        {
          onSuccess: onSuccess,
          onError: onError,
          onSettled: onSettled,
        }
      )
    }
  }
  // 저장버튼
  const onClickButton = () => {
    setIsDialog(true)
  }
  return (
    <Page>
      <SubHeader
        title={title}
        saveButton={{
          disabled: isSaveDisable, //!(name.trim() && desc.trim()),
          onClick: onClickButton,
        }}
      />
      <NoticeDataLayer pageType={pageType} />
      <Dialog
        size="sm"
        open={isDialog}
        title="확인"
        onClose={() => setIsDialog(false)}
        content={'설정된 정보로 저장하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsDialog(false)}>닫기</Button>
            <Button data-cy={'dialogSaveButton'} onClick={onClickSave}>
              저장
            </Button>
          </>
        }
      />

      <InvalidParamsErrorDialog />
    </Page>
  )
}

export default NoticeCreateUpdate
