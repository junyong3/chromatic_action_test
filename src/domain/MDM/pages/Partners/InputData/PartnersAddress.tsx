import { Grid, Stack } from '@mui/material'
import Typography from '@components/Typography'
import { InputDataProps } from '@domain/MDM/pages/Partners/Props'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'

function PartnersAddress({
  label = {
    postcode: '우편번호',
    address1: '주소',
    address2: '상세주소',
  },
  name = {
    postcode: 'postcode',
    address1: 'address1',
    address2: 'address2',
  },
  disabled = false,
  sx,
}: InputDataProps<{
  postcode: string
  address1: string
  address2: string
}>) {
  return (
    <>
      <Grid item xs={4} alignSelf={'end'}>
        <Typography variant="subtitle2">{label.postcode}</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={1.5} pt={1}>
          <InputTextField
            name={name.postcode}
            sx={{ width: '100%' }}
            placeholder={'우편번호'}
            disabled
          />
          <Button
            variant={'outlined'}
            style={{ width: '120px' }}
            disabled={disabled}
          >
            주소검색
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={4} alignSelf={'end'}>
        <Typography variant="subtitle2">{label.address1}</Typography>
        <InputTextField
          name={name.address1}
          sx={{ width: '100%', mt: 1 }}
          placeholder={'주소'}
          disabled
        />
      </Grid>
      <Grid item xs={4} alignSelf={'end'}>
        <Typography variant="subtitle2">{label.address2}</Typography>
        <InputTextField
          name={name.address2}
          sx={{ width: '100%', mt: 1 }}
          placeholder={'상세주소'}
          disabled={disabled}
        />
      </Grid>
    </>
  )
}

export default PartnersAddress
