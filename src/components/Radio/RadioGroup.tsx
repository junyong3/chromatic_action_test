import { PropsWithChildren } from 'react'
import { RadioGroup as MuiRadioGroup } from '@mui/material'
import { RadioGroupProps } from '@components/Radio/Props'

function RadioGroup(props: PropsWithChildren<RadioGroupProps>) {
  return <MuiRadioGroup {...props} />
}

export default RadioGroup
