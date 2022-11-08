import { useFormContext, useWatch } from 'react-hook-form'
import InputTextField from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Grid, Stack } from '@mui/material'
import InputSwitch from '@components/Switch/InputSwitch'
import React, { useMemo } from 'react'
import InputRadio from '@components/Radio/InputRadio'
import Typography from '@components/Typography'
import InputAutoComplete from '@components/Autocomplete/InputAutoComplete'
import { LocationDataLayerProps } from '../Props'

function LocationDataLayer(props: LocationDataLayerProps) {
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
  const cellAlignOption = useMemo(
    () => [
      {
        label: '좌',
        id: 'left',
      },
      {
        label: '중앙',
        id: 'center',
      },
      {
        label: '우',
        id: 'right',
      },
    ],
    []
  )
  const locationTypeOption = useMemo(
    () => [
      {
        label: '중량랙',
        id: 'heavyRack',
      },
      {
        label: '평치랙',
        id: 'flatRack',
      },
      {
        label: '슬라이드랙',
        id: 'slidingRack',
      },
      {
        label: '선반랙',
        id: 'shelfRack',
      },
      {
        label: '반품',
        id: 'return',
      },
      {
        label: '입출하장',
        id: 'warehouse',
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
  const areaList = [
    { label: '수산', value: 'A0001' },
    { label: '소고기', value: 'A0002' },
    { label: '돼지고기', value: 'A0003' },
    { label: '갑각류', value: 'A0004' },
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            보관 구분
          </Typography>
          <InputRadio
            required
            row
            options={keepTypeOption}
            disabled={!isUpdateMode}
            name={'keepType'}
            data-cy={'keepType'}
          />
        </Grid>
        {/*3*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            구역 코드
          </Typography>
          <InputAutoComplete
            required
            matchId
            name={'areaCode'}
            sx={{ width: '340px' }}
            options={areaList}
            disabled={!isUpdateMode}
          />
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
        <Grid item xs={5}>
          <Typography mb={1} required variant="subtitle2">
            로케이션 코드
          </Typography>

          <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
            <InputTextField
              required
              name={'locationCode'}
              data-cy={'locationCode'}
              size={'small'}
              placeholder={'로케이션 코드'}
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
            로케이션
          </Typography>
          <InputTextField
            required
            name={'locationName'}
            data-cy={'locationName'}
            size={'small'}
            placeholder={'로케이션 명'}
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

        {/*5*/}
        <Grid item xs={4}>
          <Typography mb={1} required variant="subtitle2">
            cel
          </Typography>
          <InputTextField
            required
            name={'cellCol'}
            data-cy={'cellCol'}
            size={'small'}
            placeholder={'cell 명'}
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
            cell 단(층)
          </Typography>
          <InputTextField
            required
            name={'cellStage'}
            data-cy={'cellStage'}
            size={'small'}
            placeholder={'cell 단(층)'}
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
            cell 정렬
          </Typography>
          <InputRadio
            required
            row
            options={cellAlignOption}
            disabled={!isUpdateMode}
            name={'cellAlign'}
            data-cy={'cellAlign'}
          />
        </Grid>
        {/*6*/}
        <Grid item xs={12}>
          <Typography mb={1} required variant="subtitle2">
            로케이션 유형
          </Typography>
          <InputRadio
            required
            row
            options={locationTypeOption}
            disabled={!isUpdateMode}
            name={'locationType'}
            data-cy={'locationType'}
          />
        </Grid>
        {/*7*/}
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
export default LocationDataLayer
