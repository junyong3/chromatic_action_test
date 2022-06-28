import { Story, Meta } from '@storybook/react'
import Checkbox from '@components/Checkbox/Checkbox'
import { CheckboxProps } from '@components/Checkbox/Props'
import { CheckboxListWarp } from '@components/Checkbox/StyleObj'
import React from 'react'

const Template: Story<CheckboxProps> = (args: CheckboxProps) => {
  return (
    <CheckboxListWarp>
      <div className={'checkbox-card'}>
        <Checkbox {...args} />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox {...args} checked={true} color={'secondary'} />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox {...args} size={'small'} />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox {...args} size={'medium'} disabled />
      </div>
      <div className={'checkbox-card'}>
        <Checkbox {...args} />
      </div>
    </CheckboxListWarp>
  )
}
export default {
  title: 'components/MUI/Checkbox',
  component: Checkbox,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} as Meta

export const Default = Template.bind({})
Default.args = {
  defaultChecked: true,
  // checked: false,
}
