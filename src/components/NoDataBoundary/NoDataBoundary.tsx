import React, { PropsWithChildren } from 'react'
import { NoDataBoundaryPops } from './Props'
import NoDataMsg from './NoDataMsg'

const NoDataBoundary = (props: PropsWithChildren<NoDataBoundaryPops>) => {
  const { dataSet, msgKey, children } = props
  const isArrayEmpty = Array.isArray(dataSet)
  const isData = isArrayEmpty ? (dataSet.length ? dataSet : null) : dataSet
  if (isData) {
    return <>{children}</>
  } else {
    // null 체크
    return <NoDataMsg msgKey={msgKey} />
  }
}

export default NoDataBoundary
