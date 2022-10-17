import React from 'react'
import { Meta, Story } from '@storybook/react'
import ErrorByTypeView from '@components/Error/ErrorByTypeView'
import { ErrorByTypeViewProps } from '@components/Error/Props'

const Template: Story<ErrorByTypeViewProps> = (args: ErrorByTypeViewProps) => {
  return <ErrorByTypeView {...args} />
}

export default {
  title: 'components/YGUI/Boundary',
  component: ErrorByTypeView,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['NETWORK_ERROR', 'UNAUTHORIZED', 'ERROR'],
    },
  },
} as Meta

export const ErrorByType = Template.bind({})
ErrorByType.args = {
  type: 'UNAUTHORIZED',
}
