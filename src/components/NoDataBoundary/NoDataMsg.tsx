import React from 'react'
import { MsgWrap } from './StyleObj'
import { NoDataMsgProps } from './Props'
import { Grid } from '@mui/material'

const NoDataMsg = (props: NoDataMsgProps) => {
  const { msgKey = 'noMsg' } = props

  const msg = {
    noMsg: '데이터가 존재하지 않습니다.',
    noRowMsg: '일치하는 데이터가 없습니다.',
    noResponseData: '데이터를 블러오지 못했습니다.',
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100%',
      }}
    >
      <Grid item>
        <MsgWrap data-cy={'NoDataMsg'}>{msg[msgKey]} </MsgWrap>
      </Grid>
    </Grid>
  )
}

export default NoDataMsg
