import Page from '@components/Page'
import { Stack } from '@mui/material'
import PaymentListHeader from '@domain/Commerce/pages/Payment/List/PaymentListHeader'
import PaymentSearchBox from '@domain/Commerce/pages/Payment/List/PaymentSearchBox'
import { Box } from '@mui/system'
import PaymentDataGrid from '@domain/Commerce/pages/Payment/List/PaymentDataGrid'

function PaymentListPage() {
  return (
    <Page>
      <Stack spacing={3}>
        <PaymentListHeader />
        <PaymentSearchBox />
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
          <PaymentDataGrid />
        </Box>
      </Stack>
    </Page>
  )
}

export default PaymentListPage
