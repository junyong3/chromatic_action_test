import React from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import InputTextField from '@components/TextField/InputTextField'
import useWarehouseStore, {
  warehouseSearchInput,
} from '@stores/MDM/Config/warehouse.store'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'

function WarehouseSearchBox() {
  const methods = useForm<warehouseSearchInput>({
    mode: 'onBlur',
    defaultValues: {
      factoryCode: 'A',
      factoryType: 'logistics',
      warehouseCode: '',
      warehouseName: '',
    },
  })
  const setSearchInput = useWarehouseStore((state) => state.setSearchInput)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <WarehouseField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default WarehouseSearchBox

function WarehouseField() {
  const factoryCenterList = [
    { label: '성남공장', value: 'A' },
    { label: '김포공장', value: 'B' },
    { label: '제주공장', value: 'B002' },
    { label: '미국공장', value: 'D' },
  ]
  const factoryTypeList = [
    { label: '물류센터', value: 'logistics' },
    { label: '제조센터', value: 'manufacturing' },
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
        <SearchFormItem label={'창고유형'} labelWidth={100} required>
          <InputAutoComplete
            required
            name={'factoryType'}
            sx={{ width: '340px' }}
            options={factoryTypeList}
          />
        </SearchFormItem>
      </SearchFormRow>
      <SearchFormRow>
        <SearchFormItem label={'창고코드'} labelWidth={100}>
          <InputTextField
            name={'warehouseCode'}
            data-cy={'warehouseCode'}
            size={'small'}
            placeholder={'창고코드'}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '340px' }}
          />
        </SearchFormItem>
        <SearchFormItem label={'창고 명'} labelWidth={100}>
          <InputTextField
            name={'warehouseName'}
            data-cy={'warehouseName'}
            size={'small'}
            placeholder={'창고 명'}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '340px' }}
          />
        </SearchFormItem>
      </SearchFormRow>
    </>
  )
}
