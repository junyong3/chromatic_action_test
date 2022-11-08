import Typography from '@components/Typography'
import { Box } from '@mui/material'
import CheckboxButtonGroupElement from '@components/Checkbox/CheckboxButtonGroupElement'
import { InputDataProps } from '../Props'

function CouponChannel({ disabled = false }: InputDataProps) {
  const channelCheckboxList = [
    {
      label: 'APP',
      id: 'app',
    },
    {
      label: 'WEB(mobile, PC)',
      id: 'web',
    },
    {
      label: '매장',
      id: 'store',
    },
  ]

  return (
    <Box pt={4}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        사용 채널
      </Typography>
      <CheckboxButtonGroupElement
        row
        name={'channel'}
        options={channelCheckboxList}
        disabled={disabled}
      />
    </Box>
  )
}

export default CouponChannel
