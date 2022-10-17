import Task, { TaskProps } from './Task'
import CheckIcon from '@mui/icons-material/Check'
import { ListItem, ListItemButton, Skeleton, Typography } from '@mui/material'

export type TaskListProps = {
  list: TaskProps[]
  loading?: boolean
}

function TaskList({
  tasks: { list, loading },
  onArchiveTask,
  onPinTask,
}: {
  tasks: TaskListProps
  onArchiveTask: (id: string) => void
  onPinTask: (id: string) => void
}) {
  const LoadingRow = (
    <ListItem disablePadding>
      <ListItemButton>
        <Skeleton variant="text" width="15px" sx={{ marginRight: 2 }} />
        <Skeleton variant="text" width="30%" />
      </ListItemButton>
    </ListItem>
  )
  if (loading) {
    return (
      <div className="list-items" data-testid="loading" key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    )
  }
  if (list.length === 0) {
    return (
      <div className="list-items" key={'empty'} data-testid="empty">
        <div className="wrapper-message" style={{ textAlign: 'center' }}>
          <CheckIcon />
          <Typography variant="h4">You have no tasks</Typography>
          <Typography variant="subtitle1">Sit back and relax</Typography>
        </div>
      </div>
    )
  }

  const listInOrder = [
    ...list.filter((t) => t.state === 'TASK_PINNED'),
    ...list.filter((t) => t.state !== 'TASK_PINNED'),
  ]
  return (
    <div className="list-items">
      {listInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onArchiveTask={onArchiveTask}
          onPinTask={onPinTask}
        />
      ))}
    </div>
  )
}

export default TaskList
