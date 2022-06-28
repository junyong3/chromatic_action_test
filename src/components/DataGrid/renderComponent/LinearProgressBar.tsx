import { LinearProgress } from '@mui/material'

const LinearProgressBar = (isLoading: boolean) => {
  if (isLoading) {
    return <LinearProgress />
  } else {
    return null
  }
}

export default LinearProgressBar
