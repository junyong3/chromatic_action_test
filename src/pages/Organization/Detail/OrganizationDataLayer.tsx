import { OrganizationDataLayerProps } from '@pages/Organization/Props'
import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import DetailFormRow from '@components/DetailForm/DetailFormRow'
import DetailFormItem from '@components/DetailForm/DetailFormItem'
import { Box } from '@mui/material'
import InputSwitch from '@src/components/Switch/InputSwitch'
import PostCodePopup from '@components/PopupPostCode/PostCodePopup'
import usePostCode from '@stores/postCode.store'
import { useEffect } from 'react'

function OrganizationDataLayer(props: OrganizationDataLayerProps) {
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
  return (
    <>
      <DetailFormRow>
        <DetailFormItem label={'부서코드'} required>
          <InputTextField
            required
            name={'departmentCode'}
            data-cy={'departmentCode'}
            size={'small'}
            placeholder={'부서코드'}
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
        <DetailFormItem label={'부서명'} required>
          <InputTextField
            required
            name={'departmentName'}
            data-cy={'departmentName'}
            size={'small'}
            placeholder={'부서명'}
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
        <DetailFormItem label={'담당자'}>
          <InputTextField
            name={'manager'}
            data-cy={'manager'}
            size={'small'}
            placeholder={'담당자'}
            disabled={!isUpdateMode}
            sx={{ width: '410px' }}
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
export default OrganizationDataLayer
