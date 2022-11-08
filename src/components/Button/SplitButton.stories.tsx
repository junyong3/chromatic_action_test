import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SplitButton from '@components/Button/SplitButton'

export default {
  title: 'components/MUI/SplitButton',
  component: SplitButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SplitButton>

const Template: ComponentStory<typeof SplitButton> = (args) => {
  return (
    <>
      <SplitButton {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  itemOption: [
    { value: 'text', label: '일괄(수정 및 삭제)' },
    { value: 'update', label: '수정' },
    { value: 'delete', label: '삭제' },
  ],
  clickHandler: (data) => {
    console.log(data)
  },
}

export const Submit = Template.bind({})
Submit.args = {
  itemOption: [
    { value: 'text', label: '일괄(수정 및 삭제)' },
    { value: 'update', label: '수정' },
    { value: 'delete', label: '삭제' },
  ],
  buttonProps: {
    type: 'submit',
    variant: 'outlined',
  },
  clickHandler: (data) => {
    console.log(data)
  },
}
