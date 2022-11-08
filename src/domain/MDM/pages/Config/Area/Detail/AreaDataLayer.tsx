import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Grid, Stack } from '@mui/material'
import InputSwitch from '@components/Switch/InputSwitch'
import React, { useMemo } from 'react'
import InputRadio from '@components/Radio/InputRadio'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import { AreaDataLayerProps } from '../Props'

function AreaDataLayer(props: AreaDataLayerProps) {
  const { pageType } = props
  const useYN = useWatch({
    name: 'useYN',
  })
  const { setValue, getValues } = useFormContext()
  const isUpdateMode = pageType === 'update' || pageType === 'create'
  const isCreate = pageType !== 'create'

  const keepTypeOption = useMemo(
    () => [
      {
        label: '실온',
        id: 'temperature',
      },
      {
        label: '냉동',
        id: 'frozen',
      },
      {
        label: '냉동',
        id: 'refrigerated',
      },
      {
        label: '기타',
        id: 'etc',
      },
    ],
    []
  )

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
  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={2} py={4}>
        {/*1*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            공장/센터 코드
          </Typography>
          <InputAutoComplete
            required
            matchId
            name={'factoryCode'}
            sx={{ width: '340px' }}
            options={factoryCenterList}
            disabled={!isUpdateMode}
          />
        </Grid>
        <Grid item xs={8}>
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
            창고 코드
          </Typography>
          <InputAutoComplete
            required
            matchId
            name={'warehouseCode'}
            sx={{ width: '340px' }}
            options={warehouseList}
            disabled={!isUpdateMode}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} required variant="subtitle2">
            창고 명
          </Typography>
          <InputTextField
            required
            name={'warehouseName'}
            data-cy={'warehouseName'}
            size={'small'}
            placeholder={'창고 명'}
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
        {/*3*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            구역 코드
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              required
              name={'areaCode'}
              data-cy={'areaCode'}
              size={'small'}
              placeholder={'구역 코드'}
              validation={{
                minLength: 1,
              }}
              disabled={isCreate}
              inputProps={{
                maxLength: 15,
              }}
              sx={{ width: '340px' }}
            />
            <Button
              variant={'contained'}
              style={{ width: '120px' }}
              disabled={isCreate}
            >
              사용가능
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} required variant="subtitle2">
            구역 명
          </Typography>
          <InputTextField
            required
            name={'areaName'}
            data-cy={'areaName'}
            size={'small'}
            placeholder={'구역 명'}
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
        {/*4*/}
        <Grid item xs={12}>
          <Typography mb={1} required variant="subtitle2">
            구역 유형
          </Typography>
          <InputRadio
            required
            row
            options={keepTypeOption}
            disabled={!isUpdateMode}
            name={'keepType'}
          />
        </Grid>

        {/*5*/}
        <Grid item xs={12}>
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
      </Grid>
    </>
  )
}
export default AreaDataLayer
