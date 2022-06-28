import { Story, Meta } from '@storybook/react'
import JIcon from './JIcon'
import { JIconProps } from '@components/JIcon/JIcon'
import { IconListWarp } from '@components/JIcon/StyleObj'

const Template: Story<JIconProps> = (args: JIconProps) => {
  const clickHandle = () => {
    console.log('click')
  }
  return (
    <IconListWarp>
      <div className={'icon-card'}>
        <JIcon
          {...args}
          name={'Light'}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => clickHandle()}
        />
      </div>
      <div className={'icon-card'}>
        <JIcon {...args} name={'Dark'} />
      </div>
      <div className={'icon-card'}>
        <JIcon {...args} name={'Alarm'} fill={'black'} />
      </div>
      <div className={'icon-card'}>
        <JIcon {...args} name={'EmptyBox'} />
      </div>
      <div className={'icon-card'}>
        <JIcon {...args} name={'Check'} />
      </div>
    </IconListWarp>
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
