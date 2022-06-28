import { Story, Meta } from '@storybook/react'
import ButtonGroup from '@components/ButtonGroup/ButtonGroup'
import { ButtonGroupProps } from '@components/ButtonGroup/Props'
import { ButtonGroupListWarp } from '@components/ButtonGroup/StyleObj'
import React from 'react'
import Button from '@components/Button'

const Template: Story<ButtonGroupProps> = (args: ButtonGroupProps) => {
  return (
    <ButtonGroupListWarp>
      <div className={'button-group-card'}>
        <ButtonGroup {...args}>
          <Button>소</Button>
          <Button>돼지</Button>
          <Button>닭</Button>
        </ButtonGroup>
      </div>
    </ButtonGroupListWarp>
  )
}
export default {
  title: 'components/MUI/ButtonGroup',
  component: ButtonGroup,
} as Meta

export const Default = Template.bind({})
Default.args = {}
