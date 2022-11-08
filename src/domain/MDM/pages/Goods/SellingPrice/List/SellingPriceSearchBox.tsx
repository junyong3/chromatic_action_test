import { SearchBox, SearchBoxItem, SearchBoxRow } from '@components/SearchBox'
import InputTextField from '@components/TextField/InputTextField'
import { FieldValues, useForm } from 'react-hook-form'
import { SellingPriceSearchConditionTS } from '../Props'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import InputMultiSelect from '@components/Select/InputMultiSelect'

export type SellingPriceSearchBoxProps = {
  defaultValues: SellingPriceSearchConditionTS
  onSubmit: (inputData: FieldValues) => void
}

function SellingPriceSearchBox({
  defaultValues,
  onSubmit,
}: SellingPriceSearchBoxProps) {
  const methods = useForm<SellingPriceSearchConditionTS>({
    mode: 'onChange',
    defaultValues: defaultValues,
  })

  const clientOptions = [
    {
      clientName: '소',
      clientCode: 'cow',
    },
    {
      clientName: '닭',
      clientCode: 'chicken',
    },
    {
      clientName: '돼지',
      clientCode: 'fork',
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
        <SearchBoxItem label={'판매채널/고객사'} labelWidth={120}>
          <InputMultiSelect
            name={'client'}
            sx={{ width: '376px' }}
            showChips
            options={clientOptions}
            optionKey={{ value: 'clientCode', label: 'clientName' }}
          />
        </SearchBoxItem>
      </SearchBoxRow>
      <SearchBoxRow>
        <SearchBoxItem label={'검색어'} labelWidth={120}>
          <InputTextField
            name={'keyword'}
            placeholder={`제상품 명 또는 제상품 코드를 입력하세요`}
            sx={{ width: '376px' }}
          />
        </SearchBoxItem>
      </SearchBoxRow>
    </SearchBox>
  )
}

export default SellingPriceSearchBox
