import Typography from '@components/Typography'
import { Button, Stack } from '@mui/material'
import TextFieldElement from '@components/TextField/InputTextField'
import React from 'react'
import { InputDataProps } from '@pages/Material/Props'

function MaterialCode({ disabled = false }: InputDataProps) {
  return (
    <div style={{ width: '100%' }}>
      <Typography required variant="subtitle2">
        자재코드
      </Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={1.5}
        style={{ marginTop: '8px' }}
      >
        <TextFieldElement
          name={'materialCode'}
          sx={{ width: '100%' }}
          required
          disabled={disabled}
        />
        <Button variant={'outlined'} style={{ width: '120px' }} disabled>
          사용가능
        </Button>
      </Stack>
    </div>
  )
}

export default MaterialCode
