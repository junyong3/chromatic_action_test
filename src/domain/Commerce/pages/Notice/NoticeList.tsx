import Page from '@components/Page'
import { Stack } from '@mui/material'
import NoticeListHeader from '@domain/Commerce/pages/Notice/List/NoticeListHeader'
import NoticeDataGrid from '@domain/Commerce/pages/Notice/List/NoticeDataGrid'

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
