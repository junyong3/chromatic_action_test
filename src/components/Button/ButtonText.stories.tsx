import { Story, Meta } from '@storybook/react'
import Button from '@components/Button/Button'
import { ButtonProps } from '@components/Button/Props'
import { ButtonListWarp } from '@components/Button/StyleObj'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'

const Template: Story<ButtonProps> = (args: ButtonProps) => {
  return (
    <ButtonListWarp>
      <div className={'button-card'}>
        <Button {...args}>controls</Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'small'}>
          Small
        </Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'medium'}>
          Medium
        </Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'large'}>
          Large
        </Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'medium'} disabled>
          disabled
        </Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'medium'} color={'error'}>
          color
        </Button>
      </div>
      <div className={'button-card'}>
        <Button {...args} size={'medium'} color={'gray'}>
          color
        </Button>
      </div>
      <div className={'button-card'}>
        <Button
          {...args}
          size={'medium'}
          color={'gray'}
          startIcon={<AddIcon />}
        >
          icon
        </Button>
      </div>
      <div className={'button-card'}>
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
    </ButtonListWarp>
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
