import { DetailFormRowWrap } from '@components/DetailForm/StyleObj'
import { PropsWithChildren } from 'react'

function DetailFormRow(props: PropsWithChildren<unknown>) {
  const { children } = props
  return <DetailFormRowWrap>{children}</DetailFormRowWrap>
}
export default DetailFormRow
