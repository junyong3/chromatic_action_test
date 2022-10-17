import { Story, Meta } from '@storybook/react'
import Sidebar from './Sidebar'
import { StoriesWrap } from '../StyleObj'
import { SidebarProps } from './Props'
import { To } from '@routes/To'

const Template: Story<SidebarProps> = (args: SidebarProps) => {
  return (
    <StoriesWrap>
      <Sidebar {...args} />
    </StoriesWrap>
  )
}
export default {
  title: 'compositions/Sidebar',
  component: Sidebar,
} as Meta

export const Default = Template.bind({})
Default.args = {
  menuList: [
    {
      label: '멀티 메뉴',
      defaultExpend: true,
      subMenuList: [
        { label: '역할 관리', to: To.IAMRoleList },
        { label: '서어브', to: 'sub' },
      ],
    },
    { label: '회원 관리', to: To.IAMUserList },
    { label: '권한 관리', to: To.IAMPermissionList },
  ],
}
