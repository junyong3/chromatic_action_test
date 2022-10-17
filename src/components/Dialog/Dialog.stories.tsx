import { useState } from 'react'
import { Button } from '@mui/material'
import { Meta, Story } from '@storybook/react'
import Dialog, { DialogProps } from './Dialog'
import { FlexWrap } from '../StyleObj'

const Template: Story<DialogProps> = (args: DialogProps) => {
  const [isEsDialog, setIsEsDialog] = useState(false)
  const [isSmDialog, setIsSmDialog] = useState(false)
  const [isMdDialog, setIsMdDialog] = useState(false)
  const [isLgDialog, setIsLgDialog] = useState(false)
  const [isXlDialog, setIsXlDialog] = useState(false)
  return (
    <>
      <FlexWrap>
        <Button variant="outlined" onClick={() => setIsEsDialog(true)}>
          es Dialog
        </Button>
        <Button variant="outlined" onClick={() => setIsSmDialog(true)}>
          sm Dialog
        </Button>
        <Button variant="outlined" onClick={() => setIsMdDialog(true)}>
          md Dialog
        </Button>
        <Button variant="outlined" onClick={() => setIsLgDialog(true)}>
          lg Dialog
        </Button>
        <Button variant="outlined" onClick={() => setIsXlDialog(true)}>
          xl Dialog
        </Button>
      </FlexWrap>
      <Dialog
        {...args}
        size="xs"
        open={isEsDialog}
        onClose={() => setIsEsDialog(false)}
        actions={<Button onClick={() => setIsEsDialog(false)}>닫기</Button>}
      />
      <Dialog
        {...args}
        size="sm"
        open={isSmDialog}
        onClose={() => setIsSmDialog(false)}
        actions={<Button onClick={() => setIsSmDialog(false)}>닫기</Button>}
      />
      <Dialog
        {...args}
        size="md"
        open={isMdDialog}
        onClose={() => setIsMdDialog(false)}
        actions={<Button onClick={() => setIsMdDialog(false)}>닫기</Button>}
      />
      <Dialog
        {...args}
        size="lg"
        open={isLgDialog}
        onClose={() => setIsLgDialog(false)}
        actions={<Button onClick={() => setIsLgDialog(false)}>닫기</Button>}
      />
      <Dialog
        {...args}
        size="xl"
        open={isXlDialog}
        onClose={() => setIsXlDialog(false)}
        actions={<Button onClick={() => setIsXlDialog(false)}>닫기</Button>}
      />
    </>
  )
}

export default {
  title: 'components/MUI/Dialog',
  component: Dialog,
} as Meta

export const Default = Template.bind({})
Default.args = {
  title: '경고',
  content: '해당 권한을 부여받은 역할이 존재합니다.',
}
