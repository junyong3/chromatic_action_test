import { useFormContext, useFormState } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import { Grid, Stack } from '@mui/material'
import React from 'react'
import Typography from '@components/Typography'
import { HealthCertificateDataLayerProps } from '../Props'
import InputDatePicker from '@components/DatePicker/InputDatePicker'
import InputFileField from '@components/FileField/InputFileField'
import Button from '@components/Button'

function HealthCertificateDataLayer(props: HealthCertificateDataLayerProps) {
  const { pageType } = props

  const { control } = useFormContext()
  const { isValid } = useFormState({
    name: 'healthCertificateFile',
    control,
  })
  const isUpdateMode = pageType === 'update' || pageType === 'create'
  const isCreate = pageType !== 'create'

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files)
  //   if (e.target.files?.length !== 0) {
  //     setValue('healthCertificateFile', e.target.files?.[0])
  //   }
  // }
  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={2} py={4}>
        {/*1*/}
        <Grid item xs={12}>
          <Typography mb={1} required variant="subtitle2">
            보건증 번호
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              required
              name={'healthCRETCode'}
              data-cy={'healthCRETCode'}
              isNumber
              size={'small'}
              placeholder={'보건증 번호'}
              validation={{
                minLength: 1,
              }}
              disabled={isCreate}
              inputProps={{
                maxLength: 11,
              }}
              sx={{ width: '340px' }}
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
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            이름
          </Typography>
          <InputTextField
            required
            name={'name'}
            data-cy={'name'}
            size={'small'}
            placeholder={'이름'}
            validation={{
              minLength: 1,
            }}
            disabled={!isUpdateMode}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '340px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            전화번호
          </Typography>
          <InputTextField
            required
            name={'phoneNumber'}
            data-cy={'phoneNumber'}
            isNumber
            size={'small'}
            placeholder={'전화번호'}
            validation={{
              minLength: 1,
            }}
            disabled={!isUpdateMode}
            inputProps={{
              maxLength: 11,
            }}
            sx={{ width: '340px' }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            부서
          </Typography>
          <InputTextField
            name={'department'}
            data-cy={'department'}
            size={'small'}
            placeholder={'부서'}
            validation={{
              minLength: 1,
            }}
            disabled={!isUpdateMode}
            inputProps={{
              maxLength: 15,
            }}
            sx={{ width: '340px' }}
          />
        </Grid>

        {/*2*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            보건증 발급일
          </Typography>
          <InputDatePicker
            name={'healthCRETCreateDate'}
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
            disabled={!isUpdateMode}
            inputProps={{ sx: { width: '340px' } }}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} required variant="subtitle2">
            보건증 만료일
          </Typography>
          <InputDatePicker
            name={'healthCRETExpiryDate'}
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
            disabled={!isUpdateMode}
            inputProps={{ sx: { width: '340px' } }}
          />
        </Grid>
        {/*3*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            보건증 첨부
          </Typography>
          <InputFileField name={'healthCertificateFile'} />
        </Grid>
      </Grid>
    </>
  )
}
export default HealthCertificateDataLayer
