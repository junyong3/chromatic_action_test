import Dialog from './Dialog'
import Button from '@components/Button'
import { useErrorStore } from '@stores/error.store'
import { serverErrorCodeDialogMsg } from '@components/Dialog/ServerErrorCodeDialogMsg'
import React, { useEffect } from 'react'
import { SystemErrorDialog } from '@components/Dialog/index'

function ServerErrorCodeDialog() {
  const [isServerErrorCode, setServerErrorCode, serverErrorCode] =
    useErrorStore((state) => [
      state.isServerErrorCode,
      state.setServerErrorCode,
      state.serverErrorCode,
    ])
  const { title, content, code } = serverErrorCodeDialogMsg(serverErrorCode)
  useEffect(() => {
    useErrorStore.setState({
      isSystemError: !code && isServerErrorCode,
    })
  }, [code, isServerErrorCode])

  return (
    <>
      {isServerErrorCode && code ? (
        <Dialog
          size="sm"
          open={isServerErrorCode}
          title={title}
          onClose={() => setServerErrorCode(false)}
          content={content}
          actions={
            <>
              <Button
                data-cy={'alert-close'}
                onClick={() => setServerErrorCode(false)}
              >
                닫기
              </Button>
            </>
          }
        />
      ) : null}
      <SystemErrorDialog />
    </>
  )
}

export default React.memo(ServerErrorCodeDialog)
