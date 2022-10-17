import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
// import StarIcon from '@mui/icons-material/Star'
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material'

export type TaskProps = {
  id: string
  title: string
  state: string
}

// export type TaskProps = {
//   task: {
//     id: string
//     title: string
//     state: string
//   }
//   onArchiveTask?: (id: string) => void
//   onPinTask?: (id: string) => void
// }

function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: {
  task: TaskProps
  onArchiveTask: (id: string) => void
  onPinTask: (id: string) => void
}) {
  return (
    <ListItem
      secondaryAction={
        state !== 'TASK_ARCHIVED' && (
          <IconButton
            edge="end"
            aria-label="Star"
            onClick={() => onPinTask(id)}
          >
            {state === 'TASK_PINNED' ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )
      }
      disablePadding
    >
      <ListItemButton onClick={() => onArchiveTask(id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={state === 'TASK_ARCHIVED'}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': id }}
          />
        </ListItemIcon>
        <ListItemText id={id} primary={title} />
      </ListItemButton>
      {/* <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} />
      </div> */}
      {/* <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a onClick={() => onPinTask(id)}>
            <span id={`pinTask-${id}`} aria-label={`pinTask-${id}`}>
              *
            </span>
          </a>
        )}
      </div> */}
    </ListItem>
  )
}

export default Task
