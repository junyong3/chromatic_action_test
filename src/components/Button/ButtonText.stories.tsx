import { Story, Meta } from '@storybook/react'
import Button from '@components/Button/Button'
import { ButtonProps } from '@components/Button/Props'
import AddIcon from '@mui/icons-material/Add'
import { FlexWrap } from '../StyleObj'

const Template: Story<ButtonProps> = (args: ButtonProps) => {
  return (
    <FlexWrap flexBasis="100px">
      <div>
        <Button {...args}>controls</Button>
      </div>
      <div>
        <Button {...args} size={'small'}>
          Small
        </Button>
      </div>
      <div>
        <Button {...args} size={'medium'}>
          Medium
        </Button>
      </div>
      <div>
        <Button {...args} size={'large'}>
          Large
        </Button>
      </div>
      <div>
        <Button {...args} size={'medium'} disabled>
          disabled
        </Button>
      </div>
      <div>
        <Button {...args} size={'medium'} color={'error'}>
          color
        </Button>
      </div>
      <div>
        <Button {...args} size={'medium'} color={'gray'}>
          color
        </Button>
      </div>
      <div>
        <Button
          {...args}
          size={'medium'}
          color={'gray'}
          startIcon={<AddIcon />}
        >
          icon
        </Button>
      </div>
      <div>
        <Button
          {...args}
          size={'medium'}
          color={'gray'}
          startIcon={<AddIcon />}
          href={'?path=/story/components-mui-button--outlined'}
          target="_blank"
        >
          href
        </Button>
      </div>
    </FlexWrap>
  )
}
export default {
  title: 'components/MUI/Button',
  component: Button,
} as Meta

export const Text = Template.bind({})
Text.args = {
  variant: 'text',
  color: 'primary',
}
