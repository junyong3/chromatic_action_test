import Page from '@components/Page'
import PaymentListHeader from '@pages/Payment/List/PaymentListHeader'
import PaymentSearchBox from '@pages/Payment/List/PaymentSearchBox'
import PaymentDataGrid from '@pages/Payment/List/PaymentDataGrid'
import { Box } from '@mui/system'
import { Stack } from '@mui/material'

function PaymentList() {
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

export default PaymentList
