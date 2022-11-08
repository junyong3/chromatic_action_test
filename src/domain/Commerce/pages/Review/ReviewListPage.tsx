import Page from '@components/Page'
import { Stack } from '@mui/material'
import ReviewListHeader from '@domain/Commerce/pages/Review/List/ReviewListHeader'
import ReviewSearchBox from '@domain/Commerce/pages/Review/List/ReviewSearchBox'
import { Box } from '@mui/system'
import ReviewDataGrid from '@domain/Commerce/pages/Review/List/ReviewDataGrid'

function ReviewListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <ReviewListHeader />
        <ReviewSearchBox />
        <Box
          sx={{
            width: '100%',
            '& .custom-row-fail': {
              bgcolor: (theme: any) => theme.status.fail,
            },
            '& .custom-row-allCancel, .custom-row-partialCancel': {
              bgcolor: (theme: any) => theme.status.cancel,
            },
          }}
        >
          <ReviewDataGrid />
        </Box>
      </Stack>
    </Page>
  )
}

export default ReviewListPage
