import { StorybookParamLink } from '.storybook/StorybookParamLink/StorybookParamLink'
import { Meta, Story } from '@storybook/react'
import { MemberUpdatePage } from '.'

const Template: Story = () => {
  return <MemberUpdatePage />
}
export default {
  title: 'pages/Commerce/Member/Update',
  component: MemberUpdatePage,
  argTypes: {},
  parameters: {
    paramLink: StorybookParamLink.memberUpdate,
  },
} as Meta

export const Update = Template.bind({})
Update.args = {}
