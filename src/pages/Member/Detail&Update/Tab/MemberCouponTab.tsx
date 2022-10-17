import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import { MSG } from '@constants/MessageCode/msg'
import SnackbarService from '@services/SnackbarService'
import { useQueryWrap } from '@queries/useQuery'
import { useMutationWrap } from '@queries/useMutation'
import Button from '@components/Button'
import BaseSelect from '@components/Select'
import MemberCouponDataGrid from './MemberCouponDataGrid'
import { MemberQueryKey } from '@pages/Member/Props'
import { MemberTabProps } from '@pages/Member/Detail&Update/Tab/Props'
import { CSCouponListRes } from '@src/api/model/Commerce/member'

function MemberCouponTab({ memberId }: MemberTabProps) {
  const { mutate } = useMutationWrap()
  const [couponList, setCouponList] = useState<CSCouponListRes>([])
  const [selectCoupon, setSelectCoupon] = useState<string>('')
  const { data, refetch } = useQueryWrap<CSCouponListRes>(
    MemberQueryKey.csCouponList,
    () =>
      NetworkService.commerceMember.get(COMMERCE_MEMBER_API_PATH.CS_COUPON_LIST)
  )
  useEffect(() => {
    if (data) setCouponList(data)
  }, [refetch, data])

  const giveCoupon = () => {
    mutate(
      NetworkService.commerceMember.post<string>(
        COMMERCE_MEMBER_API_PATH.MEMBER_COUPON(memberId),
        selectCoupon
      ),
      {
        onSuccess: () => {
          setSelectCoupon('')
          SnackbarService.show(MSG.SUCCESS.GIVE_MEMBER_COUPON)
        },
      }
    )
  }

  return (
    <Box py={1} px={3}>
      <Stack direction={'row'} justifyContent={'end'} py={2}>
        <BaseSelect
          name={'selectCoupon'}
          label={'쿠폰 선택'}
          width={200}
          optionList={couponList}
          optionKey={{
            value: 'couponCode',
            label: 'couponName',
          }}
          value={selectCoupon}
          onChange={({ target }) => setSelectCoupon(target.value)}
        />
        <Button
          color={'primary'}
          variant={'contained'}
          size={'large'}
          sx={{ width: '108px', marginLeft: '20px' }}
          disabled={!selectCoupon}
          onClick={() => giveCoupon()}
        >
          지급
        </Button>
      </Stack>
      <MemberCouponDataGrid memberId={memberId} />
    </Box>
  )
}

export default MemberCouponTab
