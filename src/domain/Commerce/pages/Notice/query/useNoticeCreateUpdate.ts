import { useMutationWrap } from '@queries/useMutation'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import ErrorCode from '@api/Instance/errorCode'
import { useErrorStore } from '@stores/error.store'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { CommerceErrorRes, CommerceSuccessRes } from '@api/model/CommerceRes'
import { NoticeDto } from '@api/model/Commerce/notice'

type useNoticeCreateUpdateProps = {
  id?: string
  pageType: string
  setIsDialog: (value: boolean) => void
}
function useNoticeCreateUpdate(props: useNoticeCreateUpdateProps) {
  const { pageType, setIsDialog, id } = props
  const navigate = useNavigate()
  const setIsInvalidError = useErrorStore((state) => state.setIsInvalidError)
  const { mutate: CNU } = useMutationWrap<NoticeDto & { data: true }>()

  const onSettled = () => {
    setIsDialog(false)
    LoadingService.close()
  }
  const onError = ({ response }: AxiosError<CommerceErrorRes<any>>) => {
    const code = response?.data.code

    if (code === ErrorCode.INVALID_PARAMETERS) {
      setIsInvalidError(true)
    }
  }
  const onSuccess = (res: CommerceSuccessRes<NoticeDto & { data: true }>) => {
    if (res.message === '성공') {
      SnackbarService.show(MSG.SUCCESS.SAVE_NOTICE)
      if (pageType === 'create')
        navigate(`${To.CommerceNoticeList}/${res.data.id}`)
      else navigate(`${To.CommerceNoticeList}/${id ?? -1}`)
    }
  }

  return { CNU, onSuccess, onError, onSettled }
}

export default useNoticeCreateUpdate
