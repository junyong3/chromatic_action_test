import { Box, Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'

type BoxErrorCompProps = {
  isCall: boolean
  isError?: boolean
  bodyTitle: string
  content: string
  setError?: any
}
const useDummyQuery = (params: { isCall: boolean; queryKey: string }) => {
  const { refetch }: UseQueryResult<dummyDataTs[], Error> = useQuery<
    dummyDataTs[],
    Error
  >(['Suspense', params.queryKey], () => fetchList<dummyDataTs>(3000, true), {
    enabled: !!params.isCall,
    refetchOnWindowFocus: true,
    suspense: true,
    useErrorBoundary: true,
  })

  return { refetch }
}
const BoxErrorComp = (props: BoxErrorCompProps) => {
  const { content, bodyTitle, isCall } = props
  const { refetch } = useDummyQuery({ isCall, queryKey: 'error' })

  useEffect(() => {
    if (isCall) refetch()
  }, [isCall, refetch])
  return (
    <>
      <Divider variant="middle" />
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {bodyTitle}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {content}
        </Typography>
      </Box>
    </>
  )
}

export default BoxErrorComp
