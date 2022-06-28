import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/Checkbox'
import { CheckboxProps } from '@components/Checkbox/Props'
import { CheckboxListWarp } from '@components/Checkbox/StyleObj'
import React from 'react'
import FormGroup from '@components/FormGroup'
import FormControlLabel from '@components/FormControlLabel'

const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
  return (
    <CheckboxListWarp>
      <FormGroup>
        <div className={'checkbox-card'}>
          <FormControlLabel control={<Checkbox {...args} />} label={'체크'} />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Checkbox {...args} checked={true} color={'secondary'} />}
            label={'왼쪽'}
            value={'start'}
            labelPlacement={'start'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Checkbox {...args} size={'small'} />}
            label={'위'}
            value={'top'}
            labelPlacement={'top'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Checkbox {...args} size={'medium'} />}
            label={'오른쪽'}
            value={'end'}
            labelPlacement={'end'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Checkbox {...args} size={'medium'} />}
            label={'아래'}
            value={'bottom'}
            labelPlacement={'bottom'}
          />
        </div>
      </FormGroup>
    </CheckboxListWarp>
  )
}
export default {
  title: 'components/MUI/Checkbox',
  component: Checkbox,
  parameters: {},
} as Meta

export const Label = Template.bind({})
Label.args = {
  defaultChecked: true,
  // checked: false,
}
