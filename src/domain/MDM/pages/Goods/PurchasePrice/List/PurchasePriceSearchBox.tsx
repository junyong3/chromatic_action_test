import { FieldValues, useForm } from 'react-hook-form'
import { SearchBox, SearchBoxItem, SearchBoxRow } from '@components/SearchBox'
import InputTextField from '@components/TextField/InputTextField'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import InputMultiSelect from '@components/Select/InputMultiSelect'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { PurchasePriceSearchConditionTS } from '../Props'

export type PurchasePriceSearchBoxProps = {
  type: GoodsType
  defaultValues: PurchasePriceSearchConditionTS
  onSubmit: (inputData: FieldValues) => void
}

function PurchasePriceSearchBox({
  type,
  defaultValues,
  onSubmit,
}: PurchasePriceSearchBoxProps) {
  const fieldName = type === GoodsType.Material ? '원부자재' : '제상품'
  const methods = useForm<PurchasePriceSearchConditionTS>({
    mode: 'onChange',
    defaultValues: defaultValues,
  })

  const supplierOptions = [
    {
      code: 'cow',
      name: '소 거래처',
    },
    {
      code: 'chicken',
      name: '닭 거래처',
    },
    {
      code: 'fork',
      name: '돼지 거래처',
    },
  ]

  return (
    <SearchBox methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <SearchBoxRow>
        <SearchBoxItem label={'기준일자'} labelWidth={120} required>
          <InputDatePicker
            data-chromatic={'ignore'}
            name={'baseDate'}
            label={'날짜'}
            inputFormat={'YYYY-MM-DD'}
            validation={{
              required: {
                value: true,
                message: '날짜를 입력하세요',
              },
              validate: {
                valueCheck: (value) => {
                  if (value === 'Invalid Date')
                    return '날짜 형식을 확인해주세요'
                },
              },
            }}
          />
        </SearchBoxItem>
        <SearchBoxItem label={'거래처 명'} labelWidth={120}>
          <InputMultiSelect
            name={'supplier'}
            sx={{ width: '376px' }}
            showChips
            options={supplierOptions}
            optionKey={{ value: 'code', label: 'name' }}
          />
        </SearchBoxItem>
      </SearchBoxRow>
      <SearchBoxRow>
        <SearchBoxItem label={'검색어'} labelWidth={120}>
          <InputTextField
            name={'keyword'}
            placeholder={`${fieldName} 명 또는 ${fieldName} 코드를 입력하세요`}
            sx={{ width: '376px' }}
          />
        </SearchBoxItem>
      </SearchBoxRow>
    </SearchBox>
  )
}

export default PurchasePriceSearchBox
