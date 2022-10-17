import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import TaskList, { TaskListProps } from './TaskList'

export default {
  title: 'components/sample/TaskList',
  component: TaskList,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
} as Meta

const Template: Story<TaskListProps> = (args: TaskListProps) => (
  <TaskList
    tasks={args}
    onArchiveTask={action('onArchiveTask')}
    onPinTask={action('onPinTask')}
  />
)

const list = [
  { id: '1', title: 'Task 1', state: 'TASK_INBOX' },
  { id: '2', title: 'Task 2', state: 'TASK_INBOX' },
  { id: '3', title: 'Task 3', state: 'TASK_INBOX' },
  { id: '4', title: 'Task 4', state: 'TASK_INBOX' },
  { id: '5', title: 'Task 5', state: 'TASK_INBOX' },
  { id: '6', title: 'Task 6', state: 'TASK_INBOX' },
]
export const Default = Template.bind({})
Default.args = {
  list,
}

export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.args = {
  list: [
    ...list.slice(0, 5),
    { id: '6', title: 'Task 6', state: 'TASK_PINNED' },
  ],
}

export const Loading = Template.bind({})
Loading.args = {
  list: [],
  loading: true,
}

export const Empty = Template.bind({})
Empty.args = {
  list: [],
  loading: false,
}
