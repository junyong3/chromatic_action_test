import { Story, Meta } from '@storybook/react'
import { TypographyProps } from '@components/Typography/Props'
import Typography from '@components/Typography'

const Template: Story<TypographyProps> = (args: TypographyProps) => {
  return (
    <>
      <Typography required variant="subtitle2" {...args}>
        결제 방법
      </Typography>
      <Typography variant="body1" {...args}>
        결제 상태
      </Typography>
    </>
  )
}

export default {
  title: 'components/MUI/Typography',
  component: Typography,
} as Meta

export const Default = Template.bind({})
Default.args = {}
