import { Grid, Stack } from '@mui/material'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import Button from '@components/Button'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'

function ContractFile({ disabled = false }: InputDataProps) {
  const onChangeFile = () => {
    console.log('onChangeFile')
  }
  return (
    <Grid item xs={4}>
      <Typography variant="subtitle2">계약서 첨부</Typography>
      <Stack direction={'row'} spacing={2} pt={1}>
        <InputTextField
          name={'contractFile'}
          // validation={{
          //   required: {
          //     value: true,
          //     message: '파일을 등록해 주세요.',
          //   },
          // }}
          disabled={true}
        />
        <input
          type={'file'}
          accept={'.pdf, .png, .jpg'}
          id={'contract-button-file'}
          style={{ display: 'none' }}
          onChange={onChangeFile}
        />
        <label htmlFor={'contract-button-file'}>
          <Button variant={'contained'} component={'span'}>
            첨부파일 추가
          </Button>
        </label>
      </Stack>
    </Grid>
  )
}

export default ContractFile
