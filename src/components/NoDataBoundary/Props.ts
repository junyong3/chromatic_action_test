export type msgKeyMap = 'noRowMsg' | 'noMsg' | 'noResponseData'

export type NoDataBoundaryPops = {
  dataSet: any
  msgKey: msgKeyMap
}

export type NoDataMsgProps = {
  msgKey: msgKeyMap
}
