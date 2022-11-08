import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import {
  InputDataProps,
  PartnersQueryKey,
} from '@domain/MDM/pages/Partners/Props'
import InputMultiSelect from '@components/Select/InputMultiSelect'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'

function HandlingCategory({ disabled = false }: InputDataProps) {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([])
  const { data } = useQueryWrap<string[]>(PartnersQueryKey.categoryList, () =>
    Instance.get(COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT_BANK_LIST)
  )
  useEffect(() => {
    if (data) setCategoryOptions(data)
  }, [data])
  return (
    <Grid item xs={8}>
      <Typography variant="subtitle2" mb={1}>
        주요 취급 카테고리
      </Typography>
      <InputMultiSelect
        name={'handlingCategory'}
        sx={{ width: '376px' }}
        showChips
        options={categoryOptions}
      />
    </Grid>
  )
}

export default HandlingCategory
