import Dialog from './Dialog'
import Button from '@components/Button'
import { Link } from '@mui/material'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'
import { useErrorStore } from '@stores/error.store'

interface SystemErrorDialogProps {
  content?: string | JSX.Element
}

function SystemErrorDialog({ content }: SystemErrorDialogProps) {
  const isSystemError = useErrorStore((state) => state.isSystemError)
  const setIsSystemError = useErrorStore((state) => state.setIsSystemError)
  return isSystemError ? (
    <Dialog
      size="sm"
      open={isSystemError}
      title="시스템 오류"
      onClose={() => setIsSystemError(false)}
      content={content ?? <>시스템 에러가 발생 했습니다.</>}
      actions={
        <>
          <Button onClick={() => setIsSystemError(false)}>닫기</Button>
          <Link href={SLACK_계정관리_정보보안_CHANNEL_URL} target="_blank">
            <Button>채널로 이동</Button>
          </Link>
        </>
      }
    />
  ) : null
}

export default SystemErrorDialog
