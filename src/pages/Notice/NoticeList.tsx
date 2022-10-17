import Page from '@components/Page'
import { Stack } from '@mui/material'
import NoticeListHeader from '@pages/Notice/List/NoticeListHeader'
import NoticeDataGrid from '@pages/Notice/List/NoticeDataGrid'

function NoticeList() {
  return (
    <Page>
      <Stack spacing={3}>
        <NoticeListHeader />
        <NoticeDataGrid />
      </Stack>
    </Page>
  )
}

export default NoticeList
