import { Box, Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'

type BoxCompProps = {
  isCall: boolean
  bodyTitle: string
  content: string
  setDataSet?: any
}
const useDummyQuery = (params: { isCall: boolean; queryKey: string }) => {
  const { data, refetch }: UseQueryResult<dummyDataTs[], Error> = useQuery<
    dummyDataTs[],
    Error
  >(['Suspense', params.queryKey], () => fetchList<dummyDataTs>(3000), {
    enabled: !!params.isCall,
    refetchOnWindowFocus: true,
    suspense: true,
    useErrorBoundary: true,
  })

  return { data: data ?? [], refetch }
}
const BoxComp = (props: BoxCompProps) => {
  const { isCall, content, bodyTitle, setDataSet } = props
  const { data, refetch } = useDummyQuery({ isCall, queryKey: 'su' })

  useEffect(() => {
    if (isCall) refetch()
  }, [isCall, refetch])
  useEffect(() => {
    if (data.length > 0) setDataSet && setDataSet([])
  }, [data, setDataSet])

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

export default BoxComp
