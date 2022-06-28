import { Story, Meta } from '@storybook/react'
import SideMenuBar from './SideMenuBar'
import { StoriesWrap } from './StyleObj'
import { SideMenuBarProps } from './Props'

const Template: Story<SideMenuBarProps> = (args: SideMenuBarProps) => {
  return (
    <StoriesWrap>
      <SideMenuBar {...args} />
    </StoriesWrap>
  )
}
export default {
  title: 'compositions/Sample/SideMenuBar',
  component: SideMenuBar,
} as Meta

export const DefaultSideMenuBar = Template.bind({})
DefaultSideMenuBar.args = {
  label2: '역할 관리',
  label1: '사용자 관리',
  label3: '권한 관리',
}
