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
      <Dialog size="sm" open={numOfLoginFailure >= 5}>
        <DialogTitle>계정 비활성화</DialogTitle>
        <DialogContent>
          <DialogContentText>
            입력한 정보가 5회 이상 일치하지 않아 계정이 비활성화 되었습니다.
            <br />
            Slack 채널로 이동해 계정 활성화를 신청해 주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog}>닫기</Button>
          <Link href={SLACK_계정관리_정보보안_CAHNNEL_URL} target="_blank">
            <Button>채널로 이동</Button>
          </Link>
        </DialogActions>
      </Dialog>

      <Dialog size="sm" open={!numOfLoginFailure}>
        <DialogTitle>계정 사용 불가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            계정 비활성화 상태로 로그인할 수 없습니다.
            <br />
            Slack 채널로 이동해 계정 활성화를 신청해 주세요.
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

export default LoginPageDialog
