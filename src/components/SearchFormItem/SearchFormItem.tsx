import { PropsWithChildren } from 'react'
import { SearchFormItemProp } from './Props'
import { ConditionWrap } from './StyleObj'
import Typography from '@components/Typography'

function SearchFormItem({
  label,
  required = false,
  labelWidth = 100,
  children,
}: PropsWithChildren<SearchFormItemProp>) {
  return (
    <ConditionWrap>
      <Typography
        required={required}
        variant={'subtitle2'}
        sx={{ width: labelWidth }}
      >
        {label}
      </Typography>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {children}
      </div>
    </ConditionWrap>
  )
}

export default SearchFormItem
