import { Story, Meta } from '@storybook/react'
import Radio from '@components/Radio/Radio'
import { RadioProps } from '@components/Radio/Props'
import { RadioListWarp } from '@components/Radio/StyleObj'
import React from 'react'
import FormGroup from '@components/FormGroup'
import FormControlLabel from '@components/FormControlLabel'

const Template: Story<RadioProps> = (args: RadioProps) => {
  return (
    <RadioListWarp>
      <FormGroup>
        <div className={'checkbox-card'}>
          <FormControlLabel control={<Radio {...args} />} label={'체크'} />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Radio {...args} checked={false} color={'secondary'} />}
            label={'왼쪽'}
            value={'start'}
            labelPlacement={'start'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Radio {...args} size={'small'} />}
            label={'위'}
            value={'top'}
            labelPlacement={'top'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Radio {...args} checked={false} size={'medium'} />}
            label={'오른쪽'}
            value={'end'}
            labelPlacement={'end'}
          />
        </div>
        <div className={'checkbox-card'}>
          <FormControlLabel
            control={<Radio {...args} size={'medium'} />}
            label={'아래'}
            value={'bottom'}
            labelPlacement={'bottom'}
          />
        </div>
      </FormGroup>
    </RadioListWarp>
  )
}
export default {
  title: 'components/MUI/Radio',
  component: Radio,
  parameters: {},
} as Meta

export const Label = Template.bind({})
Label.args = {
  checked: true,
  // checked: false,
}
