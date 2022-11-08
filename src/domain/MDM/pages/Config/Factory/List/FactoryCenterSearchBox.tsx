import React, { useCallback, useState } from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import InputTextField from '@components/TextField/InputTextField'
import useFactoryStore, {
  FactorySearchInput,
} from '@stores/MDM/Config/factory.store'

function FactoryCenterSearchBox() {
  const methods = useForm<FactorySearchInput>({
    defaultValues: {
      factoryCode: '',
      factoryName: '',
    },
  })
  const setSearchInput = useFactoryStore((state) => state.setSearchInput)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <FactoryField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default FactoryCenterSearchBox

function FactoryField() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'공장/센터 코드'} labelWidth={100}>
        <InputTextField
          name={'factoryCode'}
          data-cy={'factoryCode'}
          size={'small'}
          inputProps={{
            maxLength: 15,
          }}
          sx={{ width: '340px' }}
        />
      </SearchFormItem>
      <SearchFormItem label={'공장/센터 명'} labelWidth={100}>
        <InputTextField
          name={'factoryName'}
          data-cy={'factoryName'}
          size={'small'}
          inputProps={{
            maxLength: 15,
          }}
          sx={{ width: '340px' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
