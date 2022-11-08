import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Grid, Stack } from '@mui/material'
import InputSwitch from '@components/Switch/InputSwitch'
import React, { useMemo } from 'react'
import InputRadio from '@components/Radio/InputRadio'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import { WarehouseDataLayerProps } from '@domain/MDM/pages/Config/Warehouse/Props'

function WarehouseDataLayer(props: WarehouseDataLayerProps) {
  const { pageType } = props
  const useYN = useWatch({
    name: 'useYN',
  })
  const { setValue, getValues } = useFormContext()
  const isUpdateMode = pageType === 'update' || pageType === 'create'
  const isCreate = pageType !== 'create'

  const saveTypeOption = useMemo(
    () => [
      {
        label: '보관영역',
        id: 'storage',
      },
      {
        label: '입고창고',
        id: 'warehouse',
      },
      {
        label: '출고창고',
        id: 'release',
      },
      {
        label: '기타',
        id: 'etc',
      },
    ],
    []
  )
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
  const ManagementTypeOption = useMemo(
    () => [
      {
        label: '물류',
        id: 'logistics',
      },
      {
        label: '제조',
        id: 'manufacturing',
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

          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              required
              name={'warehouseCode'}
              data-cy={'warehouseCode'}
              size={'small'}
              placeholder={'창고 코드'}
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
            보관 구분
          </Typography>
          <InputRadio
            row
            required
            options={keepTypeOption}
            disabled={!isUpdateMode}
            name={'keepType'}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} required variant="subtitle2">
            창고유형
          </Typography>
          <InputRadio
            row
            required
            options={saveTypeOption}
            disabled={!isUpdateMode}
            name={'saveType'}
          />
        </Grid>
        {/*4*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            관리 구분
          </Typography>
          <InputRadio
            row
            required
            options={ManagementTypeOption}
            disabled={!isUpdateMode}
            name={'ManagementType'}
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
      </Grid>
    </>
  )
}
export default WarehouseDataLayer
