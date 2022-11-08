import { DetailFormItemWrap } from '@components/DetailForm/StyleObj'
import { PropsWithChildren } from 'react'
import { DetailFormItemProps } from '@components/DetailForm/Props'
import Typography from '@components/Typography'

function DetailFormItem(props: PropsWithChildren<DetailFormItemProps>) {
  const { children, label, required = false } = props
  return (
    <DetailFormItemWrap>
      <Typography pb={1} variant={'subtitle2'} required={required}>
        {label}
      </Typography>
      {children}
    </DetailFormItemWrap>
  )
}
export default DetailFormItem
