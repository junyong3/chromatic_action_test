import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Grid, Stack } from '@mui/material'
import InputSwitch from '@components/Switch/InputSwitch'
import PostCodePopup from '@components/PopupPostCode/PostCodePopup'
import usePostCodeStore from '@stores/postCode.store'
import { useEffect, useMemo } from 'react'
import { factoryDataLayerProps } from '@domain/MDM/pages/Config/Factory/Props'
import InputRadio from '@components/Radio/InputRadio'
import Typography from '@components/Typography'

function FactoryCenterDataLayer(props: factoryDataLayerProps) {
  const { pageType } = props
  const useYN = useWatch({
    name: 'useYN',
  })
  const { setValue, getValues } = useFormContext()
  const isUpdateMode = pageType === 'update' || pageType === 'create'
  const isCreate = pageType !== 'create'
  const [address, zonecode] = usePostCodeStore((state) => [
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
      <Grid container rowSpacing={4} columnSpacing={2} py={4}>
        {/*1*/}
        <Grid item xs={5}>
          <Typography mb={1} required variant="subtitle2">
            공장/센터 코드
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
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
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Typography mb={1} required variant="subtitle2">
            공장/센터 명
          </Typography>
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
        </Grid>
        {/*2*/}
        <Grid item xs={2.5}>
          <Typography mb={1} variant="subtitle2">
            우편번호
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              name={'zipcode'}
              data-cy={'zipcode'}
              size={'small'}
              placeholder={'우편번호'}
              disabled
              sx={{ width: '100px' }}
            />
            <PostCodePopup disabled={!isUpdateMode} />
          </Stack>
        </Grid>
        <Grid item xs={5.5}>
          <Typography mb={1} variant="subtitle2">
            주소
          </Typography>
          <InputTextField
            name={'address1'}
            data-cy={'address1'}
            size={'small'}
            placeholder={'주소'}
            disabled
            sx={{ width: '480px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            상세주소
          </Typography>
          <InputTextField
            name={'address2'}
            data-cy={'address2'}
            size={'small'}
            placeholder={'상세주소'}
            disabled={!isUpdateMode}
            sx={{ width: '320px' }}
          />
        </Grid>
        {/*3*/}
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            사업자 번호
          </Typography>
          <InputTextField
            name={'companyNumber'}
            data-cy={'companyNumber'}
            size={'small'}
            placeholder={'사업자 번호'}
            disabled={!isUpdateMode}
            sx={{ width: '310px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            담당자
          </Typography>
          <InputTextField
            name={'manager'}
            data-cy={'manager'}
            size={'small'}
            placeholder={'담당자'}
            disabled={!isUpdateMode}
            sx={{ width: '310px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            전화번호
          </Typography>
          <InputTextField
            name={'phoneNumber'}
            data-cy={'phoneNumber'}
            size={'small'}
            placeholder={'전화번호'}
            disabled={!isUpdateMode}
            sx={{ width: '320px' }}
          />
        </Grid>
        {/*4*/}
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            센터유형
          </Typography>
          <InputRadio
            row
            name={'centerType'}
            options={centerTypeOption}
            type={'string'}
            disabled={!isUpdateMode}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} variant="subtitle2">
            사용여부
          </Typography>
          <InputSwitch
            name={'useYN'}
            label={useYN ? '사용' : '사용중지'}
            labelPlacement={'end'}
            variant={'body2'}
            disabled={!isUpdateMode}
          />
        </Grid>
        {/*5*/}
        <Grid item xs={12}>
          <Typography mb={1} variant="subtitle2">
            메모
          </Typography>
          <InputTextField
            name={'memo'}
            data-cy={'memo'}
            size={'small'}
            placeholder={'메모'}
            multiline
            rows={4}
            disabled={!isUpdateMode}
            sx={{ width: '420px' }}
          />
        </Grid>
      </Grid>
    </>
  )
}
export default FactoryCenterDataLayer
