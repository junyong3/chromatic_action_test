import { Grid } from '@mui/material'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { PartnersTS } from '../Props'
import AccountNumber from './AccountNumber'
import BusinessNumber from './BusinessNumber'
import ClientType from './ClientType'
import ContractFile from './ContractFile'
import HandlingCategory from './HandlingCategory'
import PartnersAddress from './PartnersAddress'
import PartnersCode from './PartnersCode'
import PartnersManager from './PartnersManager'
import PartnersName from './PartnersName'
import PartnersPhone from './PartnersPhone'

interface PartnersDataLayerProps<T> {
  type: 'vender' | 'client'
  defaultValues: T
  disabled?: boolean
  onSubmit?: (inputData: FieldValues) => void
}

function PartnersDataLayer<T extends PartnersTS>({
  type,
  defaultValues,
  disabled = false,
  onSubmit,
}: PartnersDataLayerProps<T>) {
  const methods = useForm<T | object>({
    mode: 'onBlur',
    defaultValues,
  })

  useUpdateEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  return (
    <FormProvider {...methods}>
      <form
        id="partnersDataLayerForm"
        onSubmit={onSubmit && methods.handleSubmit(onSubmit)}
      >
        <Grid container rowSpacing={4} spacing={3} columnSpacing={3} py={4}>
          <PartnersCode name={`${type}Code`} disabled={disabled} />
          <PartnersName name={`${type}Name`} disabled={disabled} />
          {type === 'client' ? (
            <ClientType disabled={disabled} />
          ) : (
            <Grid item xs={4} />
          )}

          <PartnersAddress
            name={{
              postcode: 'address.postcode',
              address1: 'address.address1',
              address2: 'address.address2',
            }}
            disabled={disabled}
          />

          <BusinessNumber disabled={disabled} />
          <PartnersManager disabled={disabled} />
          <PartnersPhone disabled={disabled} />

          {type === 'client' ? (
            <PartnersAddress
              name={{
                postcode: 'receivingAddress.postcode',
                address1: 'receivingAddress.address1',
                address2: 'receivingAddress.address2',
              }}
              disabled={disabled}
            />
          ) : null}

          <AccountNumber disabled={disabled} />
          <Grid item xs={4} />

          <HandlingCategory disabled={disabled} />
          <Grid item xs={4} />

          <ContractFile disabled={disabled} />
        </Grid>
      </form>
    </FormProvider>
  )
}

export default PartnersDataLayer
