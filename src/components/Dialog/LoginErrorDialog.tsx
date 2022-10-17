import { Dialog } from '@components/Dialog'
import { useAuthStore } from '@stores/auth.store'
import Button from '@components/Button'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'
import { Link } from '@mui/material'

function LoginPageDialog() {
  const isAccountLocked = useAuthStore((state) => state.isAccountLocked)
  const setIsAccountLocked = useAuthStore((state) => state.setIsAccountLocked)
  const numOfLoginFailure = useAuthStore((state) => state.numOfLoginFailure)
  const setNumOfLoginFailure = useAuthStore(
    (state) => state.setNumOfLoginFailure
  )

  const handleClickCloseDialog = () => {
    setIsAccountLocked(false)
    setNumOfLoginFailure(0)
  }

  return isAccountLocked ? (
    <>
      <Dialog
        size="sm"
        open={numOfLoginFailure >= 5}
        title="계정 비활성화"
        onClose={handleClickCloseDialog}
        content={
          <>
            입력한 정보가 5회 이상 일치하지 않아 계정이 비활성화 되었습니다.
            <br />
            Slack 채널로 이동해 계정 활성화를 신청해 주세요.
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
      />

      <Dialog
        size="sm"
        open={!numOfLoginFailure}
        title="계정 사용 불가"
        onClose={handleClickCloseDialog}
        content={
          <>
            계정 비활성화 상태로 로그인할 수 없습니다.
            <br />
            Slack 채널로 이동해 계정 활성화를 신청해 주세요.
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
      />
    </>
  ) : null
}

export default LoginPageDialog
