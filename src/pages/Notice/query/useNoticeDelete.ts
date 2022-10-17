import { useMutationWrap } from '@queries/useMutation'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import ErrorCode from '@api/NetworkService/errorCode'
import { useNavigate } from 'react-router-dom'

function useNoticeDelete() {
  const navigate = useNavigate()
  const { mutate: deleteApi } = useMutationWrap<{ message: string }>()

  const onSettled = () => {
    LoadingService.close()
  }
  const onError = (errorRes: any) => {
    const code = errorRes?.response.data.code
    const msg = errorRes?.response.data.message
    if (code === ErrorCode.NOT_FOUND_NOTICE) {
      SnackbarService.show(msg)
    }
  }
  const onSuccess = ({ message }: { message: string }) => {
    if (message === '성공') {
      SnackbarService.show(MSG.SUCCESS.DELETE_NOTICE)
      navigate(`${To.CommerceNoticeList}`)
    }
  }

  return { deleteApi, onSuccess, onError, onSettled }
}

export default useNoticeDelete
