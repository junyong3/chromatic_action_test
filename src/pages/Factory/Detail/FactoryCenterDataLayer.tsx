import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import DetailFormRow from '@components/DetailForm/DetailFormRow'
import DetailFormItem from '@components/DetailForm/DetailFormItem'
import { Box } from '@mui/material'
import InputSwitch from '@src/components/Switch/InputSwitch'
import PostCodePopup from '@components/PopupPostCode/PostCodePopup'
import usePostCode from '@stores/postCode.store'
import { useEffect, useMemo } from 'react'
import { factoryDataLayerProps } from '@pages/Factory/Props'
import InputRadio from '@components/Radio/InputRadio'

function FactoryCenterDataLayer(props: factoryDataLayerProps) {
  const { pageType } = props
  const useYN = useWatch({
    name: 'useYN',
  })
  const { setValue, getValues } = useFormContext()
  const isUpdateMode = pageType === 'update' || pageType === 'create'
  const isCreate = pageType !== 'create'
  const [address, zonecode] = usePostCode((state) => [
    state.address,
    state.zonecode,
  ])
  useEffect(() => {
    setValue('zipcode', (zonecode || getValues('zipcode')) ?? '')
    setValue('address1', (address || getValues('address1')) ?? '')
  }, [address, getValues, setValue, zonecode])
  const centerTypeOption = useMemo(
    () => [
      {
        label: '제조센터(공장)',
        id: 'logistics',
      },
      {
        label: '물류센터',
        id: 'manufacturing',
      },
    ],
    []
  )
  return (
    <>
      <DetailFormRow>
        <DetailFormItem label={'공장/센터 코드'} required>
          <InputTextField
            required
            name={'factoryCode'}
            data-cy={'factoryCode'}
            size={'small'}
            placeholder={'공장/센터 코드'}
            validation={{
              // validate: {
              //   validNumber: (value) => {
              //     let reFormatVal = value
              //     reFormatVal = value.replace(/,/g, '')
              //     return !!reFormatVal.trim().length
              //   },
              // },
              minLength: 1,
            }}
            disabled={isCreate}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '320px' }}
          />
          <Box sx={{ display: 'inline-block', paddingLeft: '12px' }}>
            <Button
              variant="contained"
              data-cy="addButton"
              disabled={isCreate}
              onClick={() => {
                console.log('사용가능')
              }}
            >
              사용가능
            </Button>
          </Box>
        </DetailFormItem>
        <DetailFormItem label={'공장/센터 명'} required>
          <InputTextField
            required
            name={'factoryName'}
            data-cy={'factoryName'}
            size={'small'}
            placeholder={'공장/센터 명'}
            validation={{
              // validate: {
              //   validNumber: (value) => {
              //     let reFormatVal = value
              //     reFormatVal = value.replace(/,/g, '')
              //     return !!reFormatVal.trim().length
              //   },
              // },
              minLength: 1,
            }}
            disabled={!isUpdateMode}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '320px' }}
          />
        </DetailFormItem>
      </DetailFormRow>
      <DetailFormRow>
        <DetailFormItem label={'우편번호'}>
          <InputTextField
            name={'zipcode'}
            data-cy={'zipcode'}
            size={'small'}
            placeholder={'우편번호'}
            disabled
            sx={{ width: '100px' }}
          />
          <Box sx={{ display: 'inline-block', paddingLeft: '12px' }}>
            <PostCodePopup disabled={!isUpdateMode} />
          </Box>
        </DetailFormItem>
        <DetailFormItem label={'주소'}>
          <InputTextField
            name={'address1'}
            data-cy={'address1'}
            size={'small'}
            placeholder={'주소'}
            disabled
            sx={{ width: '520px' }}
          />
        </DetailFormItem>
        <DetailFormItem label={'상세주소'}>
          <InputTextField
            name={'address2'}
            data-cy={'address2'}
            size={'small'}
            placeholder={'상세주소'}
            disabled={!isUpdateMode}
            sx={{ width: '320px' }}
          />
        </DetailFormItem>
      </DetailFormRow>
      <DetailFormRow>
        <DetailFormItem label={'사업자 번호'}>
          <InputTextField
            name={'companyNumber'}
            data-cy={'companyNumber'}
            size={'small'}
            placeholder={'사업자 번호'}
            disabled={!isUpdateMode}
            sx={{ width: '310px' }}
          />
        </DetailFormItem>
        <DetailFormItem label={'담당자'}>
          <InputTextField
            name={'manager'}
            data-cy={'manager'}
            size={'small'}
            placeholder={'담당자'}
            disabled={!isUpdateMode}
            sx={{ width: '310px' }}
          />
        </DetailFormItem>
        <DetailFormItem label={'전화번호'}>
          <InputTextField
            name={'phoneNumber'}
            data-cy={'phoneNumber'}
            size={'small'}
            placeholder={'전화번호'}
            disabled={!isUpdateMode}
            sx={{ width: '320px' }}
          />
        </DetailFormItem>
      </DetailFormRow>
      <DetailFormRow>
        <DetailFormItem label={'센터유형'}>
          <InputRadio
            row
            name={'centerType'}
            options={centerTypeOption}
            type={'string'}
            disabled={!isUpdateMode}
          />
        </DetailFormItem>
        <DetailFormItem label={'메모'}>
          <InputTextField
            name={'memo'}
            data-cy={'memo'}
            size={'small'}
            placeholder={'메모'}
            multiline
            disabled={!isUpdateMode}
            sx={{ width: '420px' }}
          />
        </DetailFormItem>
      </DetailFormRow>
      <DetailFormRow>
        <DetailFormItem label={'사용여부'}>
          <InputSwitch
            name={'useYN'}
            label={useYN ? '사용' : '사용중지'}
            labelPlacement={'end'}
            variant={'body2'}
            disabled={!isUpdateMode}
          />
        </DetailFormItem>
      </DetailFormRow>
    </>
  )
}
export default FactoryCenterDataLayer
