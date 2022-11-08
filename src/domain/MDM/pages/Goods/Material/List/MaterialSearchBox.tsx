import { FormProvider, useForm } from 'react-hook-form'
import SearchForm from '@components/SearchForm'
import {
  MaterialSearchCondition,
  useMaterialStore,
} from '@stores/MDM/Goods/material.store'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import InputTextField from '@components/TextField/InputTextField'
import InputMultiSelect from '@components/Select/InputMultiSelect'

function MaterialSearchBox() {
  const methods = useForm<MaterialSearchCondition>({
    defaultValues: {
      materialName: '',
      materialCode: '',
      customerName: [],
      materialType: [],
    },
  })
  const [setSearchCondition] = useMaterialStore((state) => [
    state.setSearchCondition,
  ])

  const onSubmit = methods.handleSubmit((data) => {
    setSearchCondition(data)
  })

  const customerNameOptions = [
    {
      label: '삼성',
      value: 'samsung',
    },
    {
      label: 'LG',
      value: 'lg',
    },
  ]

  const materialTypeOptions = [
    {
      label: '소',
      value: 'cow',
    },
    {
      label: '닭',
      value: 'chicken',
    },
    {
      label: '돼지',
      value: 'fork',
    },
  ]

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <SearchForm>
            <SearchFormRow>
              <SearchFormItem label={'원부자재 명'} labelWidth={120}>
                <InputTextField name={'materialName'} sx={{ width: '376px' }} />
              </SearchFormItem>
              <SearchFormItem label={'원부자재 코드'} labelWidth={120}>
                <InputTextField name={'materialCode'} sx={{ width: '376px' }} />
              </SearchFormItem>
            </SearchFormRow>
            <SearchFormRow>
              <SearchFormItem label={'거래처 명'} labelWidth={120}>
                <InputMultiSelect
                  name={'customerName'}
                  sx={{ width: '376px' }}
                  showChips
                  options={customerNameOptions}
                />
              </SearchFormItem>
              <SearchFormItem label={'원부자재 유형'} labelWidth={120}>
                <InputMultiSelect
                  name={'materialType'}
                  sx={{ width: '376px' }}
                  showChips
                  options={materialTypeOptions}
                />
              </SearchFormItem>
            </SearchFormRow>
          </SearchForm>
        </form>
      </FormProvider>
    </>
  )
}

export default MaterialSearchBox
