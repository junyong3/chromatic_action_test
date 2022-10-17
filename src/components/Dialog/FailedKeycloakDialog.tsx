import { Dialog } from '@components/Dialog'
import { useAuthStore } from '@stores/auth.store'
import Button from '@components/Button'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'
import { Link } from '@mui/material'

function FailedKeycloakDialog() {
  const isFailedKeycloak = useAuthStore((state) => state.isFailedKeycloak)
  const setIsFailedKeycloak = useAuthStore((state) => state.setIsFailedKeycloak)

  const handleClickCloseDialog = () => {
    setIsFailedKeycloak(false)
  }

  return isFailedKeycloak ? (
    <>
      <Dialog
        size="sm"
        open={isFailedKeycloak}
        title="비밀번호 변경 불가"
        onClose={handleClickCloseDialog}
        content={
          <>
            시스템 오류가 발생해 비밀번호 변경을 완료할 수 없습니다.
            <br />
            Slack 채널로 이동해 오류를 공유해 주세요.
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
    </>
  ) : null
}

export default FailedKeycloakDialog
