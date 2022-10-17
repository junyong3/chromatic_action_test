import { To } from '@routes/To'
import { ListHeader } from '@compositions/Header'
import { usePointStore } from '@stores/Commerce/Point/point.store'
import React from 'react'
import TargetPaymentRegisterModal from '@pages/Point/Modal/TargetPaymentRegisterModal'

function CouponListHeader() {
  const [setIsOpenTargetPaymentDialog] = usePointStore((state) => [
    state.setIsOpenTargetPaymentDialog,
  ])

  const onClickTargetPayment = () => {
    setIsOpenTargetPaymentDialog(true)
  }

  return (
    <>
      <ListHeader
        title={'적립금 일괄 지급'}
        navigation={{
          home: To.CommerceHome,
          menuList: ['적립금 관리'],
        }}
        button={{
          text: '지급 대상 등록하기',
          onClick: onClickTargetPayment,
        }}
      />

      <TargetPaymentRegisterModal />
    </>
  )
}

export default CouponListHeader
