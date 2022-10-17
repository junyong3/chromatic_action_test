import { Story, Meta } from '@storybook/react'
import { StoriesWrap } from '../StyleObj'
import ListHeader from './ListHeader'
import { ListHeaderProps } from './Props'
import { To } from '@routes/To'

const Template: Story<ListHeaderProps> = (args: ListHeaderProps) => {
  return (
    <StoriesWrap>
      <ListHeader {...args} />
    </StoriesWrap>
  )
}

export default {
  title: 'compositions/ListHeader',
  component: ListHeader,
} as Meta

export const DefaultListHeader = Template.bind({})
DefaultListHeader.args = {
  title: '역할 관리',
  button: {
    text: '역할 생성',
    isDisabled: false,
    link: To.IAMRoleCreate,
  },
  navigation: {
    home: To.IAMHome,
    menuList: ['역할 관리', '역할 조회'],
  },
  subText: '역할을 조회할 수 있습니다.',
}
