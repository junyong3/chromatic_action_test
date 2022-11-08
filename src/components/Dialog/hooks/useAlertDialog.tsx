import { Dialog } from '@components/Dialog'
import React, { useCallback, useState } from 'react'
import { ALERT_CLIENT_ERROR_TYPE } from '@constants/MessageCode/msg'
import Button from '@components/Button'
export type useAlertDialogProps = {
  type?: string
  addTitle?: string
  addContent?: string
  onCancel?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const useAlertDialog = (props: useAlertDialogProps) => {
  const {
    type = 'BASE',
    addTitle = '',
    addContent = '',
    size = 'sm',
    onCancel,
  } = props
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const AlertOpen = useCallback((isOpen: boolean) => {
    setIsAlertOpen(isOpen)
  }, [])

  const MSG_KEY = ALERT_CLIENT_ERROR_TYPE[type]
  const title = MSG_KEY.title
  const content = MSG_KEY.content

  const AlertComp = () => {
    return (
      <Dialog
        key={`${type}`}
        size={size}
        open={isAlertOpen}
        onClose={() => {
          onCancel && onCancel()
          setIsAlertOpen(false)
        }}
        title={`${addTitle} ${title}`}
        content={`${addContent} ${content}`}
        actions={
          <>
            <Button
              onClick={() => {
                onCancel && onCancel()
                setIsAlertOpen(false)
              }}
            >
              닫기
            </Button>
          </>
        }
      />
    )
  }
  return { AlertComp, AlertOpen }
}

export default useAlertDialog
