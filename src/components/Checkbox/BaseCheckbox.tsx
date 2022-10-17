import { Checkbox as MuiCheckbox } from '@mui/material'
import { BaseCheckboxProps } from '@components/Checkbox/Props'

function BaseCheckbox(props: BaseCheckboxProps) {
  const { onChange, checked, defaultChecked } = props
  return (
    <MuiCheckbox
      onChange={onChange}
      defaultChecked={defaultChecked}
      checked={checked}
      {...props}
    />
  )
}

export default BaseCheckbox
