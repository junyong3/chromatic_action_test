import { Box, ModalProps } from '@mui/material'
import { Dialog } from '@components/Dialog'
import { default as FileTemplateIMG } from '@assets/FileTemplate.png'

function FileTemplateModal({
  open,
  onClose,
}: {
  open: ModalProps['open']
  onClose: () => void
}) {
  return (
    <Dialog
      size={'sm'}
      title={'업로드 파일 템플릿'}
      open={open}
      onClose={onClose}
    >
      <Box px={3} pb={4}>
        <img src={FileTemplateIMG} style={{ width: '100%' }} />
      </Box>
    </Dialog>
  )
}

export default FileTemplateModal
