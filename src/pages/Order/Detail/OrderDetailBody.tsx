import {
  OrderDetailBodyWrap,
  OrderDetailDataGridArea,
  OrderDetailPaymentCancel,
  OrderDetailSubtitle,
} from '@pages/Order/StyleObj'
import Button from '@components/Button'
import Typography from '@components/Typography/Typography'
import { Box } from '@mui/system'
import OrderDetailDataGrid from '@pages/Order/Detail/OrderDetailDataGrid'
import OrderCancelLayer from '@pages/Order/Detail/OrderCancelLayer'
import React from 'react'

function OrderDetailBody() {
  return (
    <OrderDetailBodyWrap>
      <OrderDetailSubtitle>
        <div className={'sub-title'}>
          <Typography variant={'subtitle1'}>결제 정보</Typography>
        </div>
        <div className={'sub-btn-pos'}>
          <Button
            sx={{ minWidth: '52px' }}
            variant={'outlined'}
            size={'small'}
            color={'gray'}
          >
            수정
          </Button>
        </div>
      </OrderDetailSubtitle>
      <OrderDetailDataGridArea>
        <Typography py={2} variant={'subtitle2'}>
          결제 내역
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '380px',
            '& .custom-row-fail': {
              bgcolor: (theme: any) => theme.status.fail,
            },
            '& .custom-row-allCancel, .custom-row-partialCancel': {
              bgcolor: (theme: any) => theme.status.cancel,
            },
          }}
        >
          <OrderDetailDataGrid />
        </Box>
      </OrderDetailDataGridArea>
      <OrderDetailPaymentCancel>
        <OrderCancelLayer />
      </OrderDetailPaymentCancel>
    </OrderDetailBodyWrap>
  )
}
export default React.memo(OrderDetailBody)
