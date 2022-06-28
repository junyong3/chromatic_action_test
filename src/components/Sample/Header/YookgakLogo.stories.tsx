import { Story, Meta } from '@storybook/react'
import { SampleLogo } from './StyleObj'

const Template: Story = () => <SampleLogo />
export default {
  title: 'components/Sample/SampleLogo',
  component: SampleLogo,
} as Meta

export const DefaultSampleLogo = Template.bind({})
DefaultSampleLogo.args = {
  text: '',
}
