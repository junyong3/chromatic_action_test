import { Story, Meta } from '@storybook/react'
import ButtonGroup from '@components/ButtonGroup/ButtonGroup'
import { ButtonGroupProps } from '@components/ButtonGroup/Props'
import Button from '@components/Button'
import { FlexWrap } from '../StyleObj'

const Template: Story<ButtonGroupProps> = (args: ButtonGroupProps) => {
  return (
    <FlexWrap>
      <div>
        <ButtonGroup {...args}>
          <Button>소</Button>
          <Button>돼지</Button>
          <Button>닭</Button>
        </ButtonGroup>
      </div>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/ButtonGroup',
  component: ButtonGroup,
} as Meta

export const Default = Template.bind({})
Default.args = {}
