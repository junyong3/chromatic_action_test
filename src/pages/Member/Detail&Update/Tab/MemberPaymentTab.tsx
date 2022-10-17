import { useCallback } from 'react'
import { Box, Stack } from '@mui/material'
import MemberCardDataGrid from '@pages/Member/Detail&Update/Tab/MemberCardDataGrid'
import Button from '@components/Button'
import CardAddDialog from '@components/Dialog/CardAddDialog'
import useMemberStore from '@stores/Commerce/Member/member.store'

function MemberPaymentTab() {
  const CardAddClick = useCallback(() => {
    useMemberStore.setState({
      isCardAddDialogOpen: true,
    })
  }, [])

  return (
    <>
      <Box p={3}>
        <Stack direction={'row'} justifyContent={'end'} mb={2}>
          <Button
            data-cy={'cardAddDialog'}
            variant="contained"
            color="primary"
            size="medium"
            onClick={CardAddClick}
          >
            {'카드 등록'}
          </Button>
        </Stack>
        <MemberCardDataGrid />
      </Box>
      <CardAddDialog />
    </>
  )
}

export default MemberPaymentTab
