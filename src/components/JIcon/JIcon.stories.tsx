import { Story, Meta } from '@storybook/react'
import JIcon from './JIcon'
import { JIconProps } from '@components/JIcon/JIcon'
import { FlexWrap } from '../StyleObj'

const Template: Story<JIconProps> = (args: JIconProps) => {
  const clickHandle = () => {
    console.log('click')
  }
  return (
    <FlexWrap flexBasis="100px">
      <div>
        <JIcon
          {...args}
          name={'Light'}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => clickHandle()}
        />
      </div>
      <div>
        <JIcon {...args} name={'Dark'} />
      </div>
      <div>
        <JIcon {...args} name={'Alarm'} fill={'black'} />
      </div>
      <div>
        <JIcon {...args} name={'EmptyBox'} />
      </div>
      <div>
        <JIcon {...args} name={'Check'} />
      </div>
    </FlexWrap>
  )
}
export default {
  title: 'components/YGUI/JIcon',
  component: JIcon,
} as Meta

export const Icon = Template.bind({})
Icon.args = {
  name: 'Dark',
}
