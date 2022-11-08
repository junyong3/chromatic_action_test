import { SubHeaderProps } from './Props'
import { SubHeaderTitle } from './StyleObj'
import { Divider } from '@mui/material'
import Button from '@components/Button'
import Typography from '@components/Typography'
import { Stack } from '@mui/material'

function SubHeader({
  title,
  deleteButton,
  updateButton,
  saveButton,
  anotherButton = [],
}: SubHeaderProps) {
  return (
    <div>
      <SubHeaderTitle>
        <Typography data-cy={'subTitle'} variant={'h5'}>
          {title}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          {anotherButton.map(({ text, ...buttonProp }, index) => (
            <Button key={index} {...buttonProp}>
              {text}
            </Button>
          ))}
          {deleteButton ? (
            <Button
              {...deleteButton}
              color="gray"
              variant="outlined"
              size="medium"
              data-cy={'deleteButton'}
              data-sb-kind={deleteButton.sbkind}
            >
              삭제
            </Button>
          ) : null}
          {updateButton ? (
            <Button
              {...updateButton}
              variant="outlined"
              size="medium"
              sx={{ ml: 2 }}
              data-cy={'updateButton'}
              data-sb-kind={updateButton.sbkind}
            >
              수정
            </Button>
          ) : null}
          {saveButton ? (
            <Button
              {...saveButton}
              variant="contained"
              size="medium"
              sx={{ ml: 2 }}
              data-cy={'saveButton'}
              data-sb-kind={saveButton.sbkind}
            >
              저장
            </Button>
          ) : null}
        </Stack>
      </SubHeaderTitle>
      <Divider />
    </div>
  )
}

export default SubHeader
