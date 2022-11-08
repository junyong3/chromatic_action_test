import { Divider } from '@mui/material'
import Typography from '@components/Typography'
import React from 'react'

type BottomUpdateViewProps = {
  title?: string
  userId: string
  updateTime: string
}
function BottomUpdateView(props: BottomUpdateViewProps) {
  const { title = '최종 수정자 및 최종 수정 일시', updateTime, userId } = props
  return (
    <>
      <Divider />
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.6);' }} variant="caption">
        {title} : {userId} / {updateTime}
      </Typography>
    </>
  )
}

export default BottomUpdateView
