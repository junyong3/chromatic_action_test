import React from 'react'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Dialog from '@components/Dialog'
import { useAuthStore } from '@stores/auth.store'
import Button from '@components/Button'
import styled from '@emotion/styled'
import { SLACK_계정관리_정보보안_CAHNNEL_URL } from '@config'

function ChangePasswordPageDialog() {
  const isFailedKeycloak = useAuthStore((state) => state.isFailedKeycloak)
  const setIsFailedKeycloak = useAuthStore((state) => state.setIsFailedKeycloak)

  const handleClickCloseDialog = () => {
    setIsFailedKeycloak(false)
  }

  return isFailedKeycloak ? (
    <>
      <Dialog size="sm" open={isFailedKeycloak}>
        <DialogTitle>비밀번호 변경 불가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            시스템 오류가 발생해 비밀번호 변경을 완료할 수 없습니다.
            <br />
            Slack 채널로 이동해 오류를 공유해 주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog}>닫기</Button>
          <Link href={SLACK_계정관리_정보보안_CAHNNEL_URL} target="_blank">
            <Button>채널로 이동</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  ) : null
}

const Link = styled.a`
  text-decoration: none;
`

export default ChangePasswordPageDialog
