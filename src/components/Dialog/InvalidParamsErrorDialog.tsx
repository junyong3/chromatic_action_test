import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'
import { Link } from '@mui/material'
import { useErrorStore } from '@stores/error.store'

function InvalidParamsErrorDialog() {
  const isInvalidError = useErrorStore((state) => state.isInvalidError)
  const setIsInvalidError = useErrorStore((state) => state.setIsInvalidError)

  const handleClickCloseDialog = () => {
    setIsInvalidError(false)
  }

  return (
    <Dialog
      size="sm"
      open={isInvalidError}
      title="입력 정보 오류"
      onClose={handleClickCloseDialog}
      content={
        <>
          입력한 내용을 다시 확인하고 저장을 시도해 주세요.
          <br />이 화면이 반복해서 표시되는 경우, Slack 채널로 이동해 오류를
          공유해 주세요.
        </>
      }
      actions={
        <>
          <Button onClick={handleClickCloseDialog}>닫기</Button>
          <Link
            href={SLACK_계정관리_정보보안_CHANNEL_URL}
            target="_blank"
            underline="none"
          >
            <Button>채널로 이동</Button>
          </Link>
        </>
      }
    ></Dialog>
  )
}

export default InvalidParamsErrorDialog
