import React from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import useHealthCertificateStore, {
  healthCertificateSearchInput,
} from '@stores/MDM/AddInfo/healthCertificate.store'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import InputTextField from '@components/TextField/InputTextField'

function HealthCertificateSearchBox() {
  const methods = useForm<healthCertificateSearchInput>({
    mode: 'onBlur',
    defaultValues: {
      factoryCode: '',
      factoryName: '',
      healthCertificateExpired: [false],
    },
  })
  const setSearchInput = useHealthCertificateStore(
    (state) => state.setSearchInput
  )

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <HealthCertificateField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default HealthCertificateSearchBox

function HealthCertificateField() {
  const healthCertificateExpiredOption = [
    {
      label: '',
      id: false,
    },
  ]
  return (
    <>
      <SearchFormRow>
        <SearchFormItem label={'공장/센터 명'} labelWidth={130}>
          <InputTextField
            name={'factoryName'}
            data-cy={'factoryName'}
            size={'small'}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '300px' }}
          />
        </SearchFormItem>
        <SearchFormItem label={'공장/센터 코드'} labelWidth={130}>
          <InputTextField
            name={'factoryCode'}
            data-cy={'factoryCode'}
            size={'small'}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '300px' }}
          />
        </SearchFormItem>
      </SearchFormRow>
      <SearchFormRow>
        <SearchFormItem label={'보건증 만료 여부'} labelWidth={130}>
          <InputCheckbox
            options={healthCertificateExpiredOption}
            name={'healthCertificateExpired'}
          />
        </SearchFormItem>
      </SearchFormRow>
    </>
  )
}
