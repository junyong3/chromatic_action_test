import { useEffect, useState } from 'react'
import { Grid, Stack } from '@mui/material'
import {
  InputDataProps,
  PartnersQueryKey,
} from '@domain/MDM/pages/Partners/Props'
import Instance from '@api/Instance'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import InputTextField from '@components/TextField/InputTextField'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'

const a = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
  { value: 'c', label: 'c' },
]

function AccountNumber({ disabled = false }: InputDataProps) {
  const [bankOptions, setBankOptions] = useState<string[]>([])
  const { data } = useQueryWrap<string[]>(
    PartnersQueryKey.accountBankList,
    () => Instance.get(COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT_BANK_LIST)
  )
  useEffect(() => {
    if (data) setBankOptions(data)
  }, [data])

  return (
    <Grid item xs={8}>
      <Typography variant="subtitle2">계좌번호</Typography>
      <Stack direction={'row'} spacing={2} pt={1}>
        <InputTextField
          name={'account.bank'}
          data-cy={'bank'}
          size={'small'}
          disabled={disabled}
        />
        {/* <InputSelect
          name={'account.bank'}
          data-cy={'bank'}
          label={'은행명'}
          placeholder={'은행명'}
          options={bankOptions ?? []}
          disabled={disabled}
        /> */}
        <InputTextField
          name={'account.accountNumber'}
          data-cy={'accountNumber'}
          isNumber={true}
          size={'small'}
          placeholder={'숫자만 입력'}
          disabled={disabled}
          validation={{
            minLength: 10,
          }}
          inputProps={{
            maxLength: 20,
          }}
          sx={{ width: '280px' }}
        />
      </Stack>
    </Grid>
  )
}

export default AccountNumber
