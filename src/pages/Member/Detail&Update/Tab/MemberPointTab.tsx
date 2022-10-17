import { Box, Stack } from '@mui/material'
import { useMemberPointStore } from '@stores/Commerce/Member/member.point.store'
import Button from '@components/Button'
import Typography from '@components/Typography'
import BaseTextField from '@components/TextField'
import MemberPointHistoryDataGrid from './MemberPointHistoryDataGrid'
import UsePointModal from '../Dialog&Modal/UsePointModal'
import GivePointModal from '../Dialog&Modal/GivePointModal'
import { MemberTabProps } from '@pages/Member/Detail&Update/Tab/Props'

function MemberPointTab({ memberId }: MemberTabProps) {
  const [
    usablePoint,
    expiringPoint,
    setIsUsePointDialog,
    setIsGivePointDialog,
  ] = useMemberPointStore((state) => [
    state.usablePoint,
    state.expiringPoint,
    state.setIsUsePointDialog,
    state.setIsGivePointDialog,
  ])

  return (
    <>
      <Box p={3}>
        <Stack
          direction={'row'}
          justifyContent={'stretch'}
          alignItems={'center'}
          mb={2}
          spacing={2}
        >
          <Typography variant={'subtitle2'}>보유적립금</Typography>
          <BaseTextField
            name={'usablePoint'}
            value={usablePoint}
            disabled
            sx={{ width: '140px' }}
          />
          <Typography variant={'subtitle2'} sx={{ marginLeft: '40px' }}>
            소멸예정
          </Typography>
          <BaseTextField
            name={'expiringPoint'}
            value={expiringPoint}
            disabled
            sx={{ width: '140px' }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Button
              color={'primary'}
              variant={'outlined'}
              size={'medium'}
              sx={{ width: '108px' }}
              onClick={() => setIsUsePointDialog(true)}
            >
              사용
            </Button>
            <Button
              color={'primary'}
              variant={'contained'}
              size={'medium'}
              sx={{ width: '108px' }}
              onClick={() => setIsGivePointDialog(true)}
            >
              지급
            </Button>
          </div>
        </Stack>
        <MemberPointHistoryDataGrid memberId={memberId} />
      </Box>
      <UsePointModal memberId={memberId} />
      <GivePointModal memberId={memberId} />
    </>
  )
}

export default MemberPointTab
