import React, { useCallback, useState } from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import useOrgStore, { SearchInput } from '@stores/MDM/Organization/org.store'
import InputTextField from '@components/TextField/InputTextField'

function OrganizationSearchBox() {
  const methods = useForm<SearchInput>({
    defaultValues: {
      departmentCode: '',
      departmentName: '',
    },
  })
  const setSearchInput = useOrgStore((state) => state.setSearchInput)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <DeptField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default OrganizationSearchBox

function DeptField() {
  return (
    <SearchFormRow>
      <SearchFormItem label={'부서코드'} labelWidth={100}>
        <InputTextField
          name={'departmentCode'}
          data-cy={'departmentCode'}
          size={'small'}
          placeholder={'부서코드'}
          inputProps={{
            maxLength: 15,
          }}
          sx={{ width: '340px' }}
        />
      </SearchFormItem>
      <SearchFormItem label={'부서명'} labelWidth={100}>
        <InputTextField
          name={'departmentName'}
          data-cy={'departmentName'}
          size={'small'}
          placeholder={'부서명'}
          inputProps={{
            maxLength: 15,
          }}
          sx={{ width: '340px' }}
        />
      </SearchFormItem>
    </SearchFormRow>
  )
}
