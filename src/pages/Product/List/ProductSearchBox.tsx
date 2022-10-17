import SearchForm from '@components/SearchForm'
import { FormProvider, useForm } from 'react-hook-form'
import React from 'react'
import {
  ProductSearchCondition,
  useProductStore,
} from '@stores/MDM/Product/product.store'
import SearchFormRow from '@components/SearchFormRow'
import SearchFormItem from '@components/SearchFormItem'
import InputTextField from '@components/TextField/InputTextField'
import InputMultiSelect from '@components/Select/InputMultiSelect'

function ProductSearchBox() {
  const methods = useForm<ProductSearchCondition>({
    defaultValues: {
      productName: '',
      productCode: '',
      customerName: [],
      productType: [],
    },
  })
  const [setSearchCondition] = useProductStore((state) => [
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

  const productTypeOptions = [
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
              <SearchFormItem label={'제상품 명'} labelWidth={120}>
                <InputTextField name={'productName'} sx={{ width: '376px' }} />
              </SearchFormItem>
              <SearchFormItem label={'제상품 코드'} labelWidth={120}>
                <InputTextField name={'productCode'} sx={{ width: '376px' }} />
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
              <SearchFormItem label={'제상품 유형'} labelWidth={120}>
                <InputMultiSelect
                  name={'productType'}
                  sx={{ width: '376px' }}
                  showChips
                  options={productTypeOptions}
                />
              </SearchFormItem>
            </SearchFormRow>
          </SearchForm>
        </form>
      </FormProvider>
    </>
  )
}

export default ProductSearchBox
