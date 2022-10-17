import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import Task, { TaskProps } from './Task'

export default {
  title: 'components/Sample/Task',
  component: Task,
} as Meta

const Template: Story<TaskProps> = (args: TaskProps) => (
  <Task
    task={args}
    onArchiveTask={action('onArchiveTask')}
    onPinTask={action('onPinTask')}
  />
)

const task = {
  id: '1',
  title: 'test Task',
  state: 'TASK_INBOX',
}
export const Default = Template.bind({})
Default.args = {
  ...task,
}

export const Pinned = Template.bind({})
Pinned.args = {
  ...task,
  state: 'TASK_PINNED',
}

export const Archived = Template.bind({})
Archived.args = {
  ...task,
  state: 'TASK_ARCHIVED',
}
