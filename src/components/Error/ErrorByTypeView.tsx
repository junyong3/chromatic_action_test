import { Divider, Stack, Typography } from '@mui/material'
import { ErrorByTypeViewProps } from '@components/Error/Props'
import { Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import JIcon from '@components/JIcon'
import { ERROR_TYPE_CONTENT_VIEW } from '@constants/MessageCode/msg'
import Button from '@components/Button'
import { SLACK_계정관리_정보보안_CHANNEL_URL } from '@config'

const ErrorByTypeView = (props: ErrorByTypeViewProps) => {
  const { type, clickHandler } = props
  const msg = ERROR_TYPE_CONTENT_VIEW[type]
  return (
    <Box px={18}>
      <Typography variant={'h5'} pb={2} pt={4}>
        {msg.title}
      </Typography>

      <Divider variant="middle" sx={{ mx: 0 }} />

      <Stack direction={{ sm: 'row' }} alignItems={'center'} py={3.25}>
        <JIcon
          style={{
            width: '20px',
            height: '32px',
          }}
          name={'NetWorkError'}
        />
        <Typography variant={'body2'} align={'center'} px={1}>
          {msg.content}
        </Typography>
      </Stack>
      {msg?.buttonName ? (
        <Box>
          <Button
            onClick={() => {
              /* TODO
               *  임시 (https://www.figma.com/file/lZTMptxAOwWjRHhUSWX1Nl/%EB%A7%88%EC%9D%84%ED%9A%8C%EA%B4%80%EA%B5%AC%EC%B6%95PJT-%EC%9D%B8%EA%B0%80?node-id=1031%3A10746)
               * */

              window.location.href = SLACK_계정관리_정보보안_CHANNEL_URL
              clickHandler && clickHandler()
            }}
            size={'small'}
            variant={'contained'}
            endIcon={<ArrowForwardIcon />}
          >
            {msg.buttonName}
          </Button>
        </Box>
      ) : null}
    </Box>
  )
}

export default ErrorByTypeView
