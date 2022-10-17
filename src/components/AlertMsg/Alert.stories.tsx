import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AlertMsg from '@components/AlertMsg/AlertMsg'

export default {
  title: 'components/MUI/AlertMsg',
  component: AlertMsg,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AlertMsg>

const Template: ComponentStory<typeof AlertMsg> = (args) => {
  return (
    <>
      <AlertMsg {...args} />
      <br />
      <AlertMsg type={'INFO'} msg={'CREATE_PERMISSION_CODE'} />
      <br />
      <AlertMsg type={'SUCCESS'} msg={'SAVE_ROLE'} />
      <br />
      <AlertMsg type={'ERROR'} msg={'NO_SAME_CONFIRM_PASSWORD'} />
      <br />
      <AlertMsg type={'WARNING'} msg={'SAMPLE'} />
      <br />
      <AlertMsg type={'INFO'} msg={'CREATE_NOTICE_CODE'} title={'저장'} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  type: 'SUCCESS',
  msg: 'SAVE_ROLE',
}
