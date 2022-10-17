import { Story, Meta } from '@storybook/react'
import Radio from '@components/Radio/Radio'
import { BaseRadioProps } from '@components/Radio/Props'
import React from 'react'
import FormControlLabel from '@components/FormControlLabel'
import FormControl from '@components/FormControl'
import { FormLabel } from '@mui/material'
import RadioGroup from '@components/Radio/RadioGroup'
import { FlexWrap } from '../StyleObj'

const Template: Story<BaseRadioProps> = (args: BaseRadioProps) => {
  const [value, setValue] = React.useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  return (
    <FlexWrap>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio {...args} />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio {...args} />}
            label="Male"
          />
        </RadioGroup>
      </FormControl>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/Radio',
  component: Radio,
  parameters: {},
} as Meta

export const Group = Template.bind({})
Group.args = {
  color: 'success',
}
