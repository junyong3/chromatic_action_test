import React from 'react'
import SearchForm from '@components/SearchForm'

import { FormProvider, useForm } from 'react-hook-form'
import SearchFormItem from '@components/SearchFormItem'
import SearchFormRow from '@components/SearchFormRow'
import useLocationStore, {
  locationSearchInput,
} from '@stores/MDM/Config/location.store'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'

function LocationSearchBox() {
  const methods = useForm<locationSearchInput>({
    mode: 'onBlur',
    defaultValues: {
      factoryCode: '',
      warehouseCode: '',
      areaCode: '',
    },
  })
  const setSearchInput = useLocationStore((state) => state.setSearchInput)

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
    setSearchInput(data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SearchForm>
          <LocationField />
        </SearchForm>
      </form>
    </FormProvider>
  )
}

export default LocationSearchBox

function LocationField() {
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
  const areaList = [
    { label: '수산', value: 'A0001' },
    { label: '소고기', value: 'A0002' },
    { label: '돼지고기', value: 'A0003' },
    { label: '갑각류', value: 'A0004' },
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
      <SearchFormRow>
        <SearchFormItem label={'구역'} labelWidth={100}>
          <InputAutoComplete
            matchId
            name={'areaCode'}
            sx={{ width: '340px' }}
            options={areaList}
          />
        </SearchFormItem>
      </SearchFormRow>
    </>
  )
}
