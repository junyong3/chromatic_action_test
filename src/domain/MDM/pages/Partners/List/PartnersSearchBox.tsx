import { useCallback, useMemo, useRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { SearchBox, SearchBoxRow, SearchBoxItem } from '@components/SearchBox'
import Button from '@components/Button'
import InputSelect from '@components/Select/InputSelect'
import InputTextField from '@components/TextField/InputTextField'
import {
  KeyGoodsTS,
  PartnersSearchConditionTS,
  PartnersType,
  TransactionStatus,
} from '../Props'
import KeyGoodsModal, { KeyGoodsModalRefProps } from './KeyGoodsModal'

export type PartnersSearchBoxProps = {
  type: PartnersType
  defaultValues: PartnersSearchConditionTS
  onSubmit: (inputData: FieldValues) => void
}

function PartnersSearchBox({
  defaultValues,
  onSubmit,
}: PartnersSearchBoxProps) {
  const transactionStatusOptions = useMemo(
    () => [
      {
        label: '거래',
        value: TransactionStatus.YES,
      },
      {
        label: '중단',
        value: TransactionStatus.NO,
      },
    ],
    []
  )
  const keyGoodsModalRef = useRef<KeyGoodsModalRefProps>(null)
  const openKeyProductModal = useCallback(() => {
    if (keyGoodsModalRef.current) keyGoodsModalRef.current.open()
  }, [])
  const onSelectByKeyGoodsModal = (selected: KeyGoodsTS) => {
    methods.setValue('keyGoods', selected)
  }

  const methods = useForm<PartnersSearchConditionTS>({
    mode: 'onChange',
    defaultValues: defaultValues,
  })
  return (
    <>
      <SearchBox methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <SearchBoxRow>
          <SearchBoxItem label={'대표상품'} labelWidth={120}>
            <InputTextField
              name={'keyGoods.name'}
              placeholder={'찾기 버튼을 눌러 선택해주세요.'}
              disabled
              sx={{
                width: '314px',
                ' input:disabled': { WebkitTextFillColor: 'black' },
              }}
            />
            <Button
              type={'button'}
              variant={'contained'}
              size={'medium'}
              onClick={openKeyProductModal}
            >
              찾기
            </Button>
          </SearchBoxItem>
          <SearchBoxItem label={'거래여부'} labelWidth={120}>
            <InputSelect
              name={'transactionStatus'}
              sx={{ width: '376px' }}
              options={transactionStatusOptions}
            />
          </SearchBoxItem>
        </SearchBoxRow>
        <SearchBoxRow>
          <SearchBoxItem label={'검색어'} labelWidth={120}>
            <InputTextField
              name={'keyword'}
              placeholder={'협력업체 명 또는 협력업체 코드를 입력하세요'}
              sx={{ width: '376px' }}
            />
          </SearchBoxItem>
        </SearchBoxRow>
      </SearchBox>

      <KeyGoodsModal
        ref={keyGoodsModalRef}
        onSelect={onSelectByKeyGoodsModal}
      />
    </>
  )
}

export default PartnersSearchBox
