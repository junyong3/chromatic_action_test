import { BaseSwitchProps } from '@components/Switch/Props'
import { Switch as MuiSwitch } from '@mui/material'

function BaseSwitch(props: BaseSwitchProps) {
  const { defaultChecked, size = 'small', onChange } = props
  return (
    <MuiSwitch
      {...props}
      size={size}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  )
}

export default BaseSwitch
