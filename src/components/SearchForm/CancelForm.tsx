import { Divider, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import Button from '../Button'
import { CancelFormProp } from './Props'
import { CancelBox } from './StyleObj'

function CancelForm({
  onCancel,
  onPaymentCancel,
  disabled = false,
  children,
  isTab = false,
  confirmLabel,
  cancelLabel = '취소',
}: PropsWithChildren<CancelFormProp>) {
  return (
    <CancelBox isTab={isTab}>
      <div className="conditionWrap">
        <Stack direction={'column'} spacing={2}>
          {children}
        </Stack>
      </div>
      <Divider variant={'middle'} />
      <div className="buttonWrap">
        <Stack direction="row" spacing={2}>
          {onCancel ? (
            <Button
              data-cy={'cancel'}
              variant={'outlined'}
              color={'gray'}
              size="medium"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          ) : null}

          <Button
            variant="contained"
            data-cy={'save'}
            color="primary"
            size="medium"
            disabled={disabled}
            onClick={onPaymentCancel && onPaymentCancel}
          >
            {confirmLabel}
          </Button>
        </Stack>
      </div>
    </CancelBox>
  )
}

export default CancelForm
