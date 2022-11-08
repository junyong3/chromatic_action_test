import React from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import InputTextField from '@components/TextField/InputTextField'
import useAreaStore, { areaSearchInput } from '@stores/MDM/Config/area.store'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'

function AreaSearchBox() {
  const methods = useForm<areaSearchInput>({
    mode: 'onBlur',
    defaultValues: {
      factoryCode: '',
      warehouseCode: '',
    },
  })
  const setSearchInput = useAreaStore((state) => state.setSearchInput)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <AreaField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default AreaSearchBox

function AreaField() {
  const factoryCenterList = [
    { label: '성남공장', value: 'A' },
    { label: '김포공장', value: 'B' },
    { label: '제주공장', value: 'B002' },
    { label: '미국공장', value: 'D' },
  ]
  const warehouseList = [
    { label: '창고A', value: 'W0001' },
    { label: '창고B', value: 'W0002' },
    { label: '창고C', value: 'W0003' },
    { label: '창고D', value: 'W0004' },
  ]

  return (
    <>
      <SearchFormRow>
        <SearchFormItem label={'공장/센터'} labelWidth={100} required>
          <InputAutoComplete
            required
            name={'factoryCode'}
            sx={{ width: '340px' }}
            matchId
            options={factoryCenterList}
          />
        </SearchFormItem>
        <SearchFormItem label={'창고'} labelWidth={100}>
          <InputAutoComplete
            matchId
            name={'warehouseCode'}
            sx={{ width: '340px' }}
            options={warehouseList}
          />
        </SearchFormItem>
      </SearchFormRow>
    </>
  )
}
