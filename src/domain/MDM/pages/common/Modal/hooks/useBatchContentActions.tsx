import {
  BatchContentProps,
  InputTypeFieldProps,
  useBatchContentActionsProps,
} from './Props'

import { Box, Typography } from '@mui/material'
import DataGrid from '@components/DataGrid'
import { SearchBoxItem, SearchBoxRow } from '@components/SearchBox'
import InputTextField from '@components/TextField/InputTextField'
import SearchForm from '@components/SearchForm'
import InputSelect from '@components/Select/InputSelect'

import { useFormContext, useWatch } from 'react-hook-form'
import InputRadio from '@components/Radio/InputRadio'
import Button from '@components/Button'
import useBatchModal from '@stores/MDM/batchModal.store'
import React from 'react'
import InputCheckbox from '@components/Checkbox/InputCheckbox'
import InputSwitch from '@components/Switch/InputSwitch'
import { fieldTypeUnion } from '@domain/MDM/pages/common/Modal/Props'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { MSG } from '@constants/MessageCode/msg'

export function useBatchContentActions(props: useBatchContentActionsProps) {
  const { content } = props

  return {
    content: (
      <BatchContent
        rowId={content.rowId}
        gridDataSet={content.gridDataSet}
        columnList={content.columnList}
        updateColumnList={content.updateColumnList}
      />
    ),
    actions: <BatchActions />,
  }
}

function BatchContent(props: BatchContentProps) {
  const { gridDataSet, columnList, updateColumnList, rowId } = props
  const [selectionIds, setSelectionIds] = useBatchModal((state) => [
    state.selectionIds,
    state.setSelectionIds,
  ])
  const { setValue } = useFormContext()

  const targetColumn = useWatch({
    name: 'targetColumn',
  })
  const isUpdate = useWatch({
    name: 'isUpdate',
  })
  const updateColFilter = updateColumnList.find((d) => d.value === targetColumn)
  const UpdateOrDelete = [
    {
      label: '삭제',
      id: 'delete',
    },
    {
      label: '수정',
      id: 'update',
    },
  ]

  return (
    <Box>
      <SearchForm text={''}>
        <SearchBoxRow>
          <SearchBoxItem label={'처리 옵션'} labelWidth={120}>
            <InputRadio
              row
              required
              options={UpdateOrDelete}
              name={'isUpdate'}
            />
          </SearchBoxItem>
        </SearchBoxRow>
        {isUpdate === 'update' ? (
          <>
            <SearchBoxRow>
              <SearchBoxItem required label={'수정 컬럼'} labelWidth={120}>
                <InputSelect
                  name={'targetColumn'}
                  options={updateColumnList}
                  label={'수정 컬럼'}
                  onChangeHandler={(val) => {
                    setValue(
                      'updateCell',
                      updateColumnList.find((d) => d.value === val.value)
                        ?.fieldProps?.defaultValue || null
                    )
                  }}
                />
              </SearchBoxItem>
            </SearchBoxRow>
            <SearchBoxRow>
              <SearchBoxItem required label={'수정 값'} labelWidth={120}>
                <InputTypeField
                  fieldProps={updateColFilter?.fieldProps ?? {}}
                />
              </SearchBoxItem>
            </SearchBoxRow>
          </>
        ) : null}
      </SearchForm>

      <br />
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        pb={1}
      >
        <InfoOutlinedIcon fontSize={'small'} sx={{ color: '#0288D1' }} />
        <Typography
          variant={'caption'}
          ml={1}
          sx={{ width: 160, color: '#00000099' }}
        >
          {MSG.INFO.BATCH_ROW_UPDATE_DELETE}
        </Typography>
      </Box>
      <DataGrid
        getRowId={(row) => row[rowId]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionIds(newSelectionModel)
        }}
        selectionModel={selectionIds}
        rows={gridDataSet}
        columns={columnList}
        rowCount={gridDataSet.length || 0}
        pageSize={5}
        rowThreshold={5}
        toolBar={true}
      />
    </Box>
  )
}

function BatchActions() {
  const [setIsOpenSave] = useBatchModal((state) => [state.setIsOpenSave])

  return (
    <Box>
      <Button
        variant={'contained'}
        size={'medium'}
        data-cy={'batchSaveButton'}
        onClick={() => {
          setIsOpenSave(true)
        }}
      >
        저장
      </Button>
    </Box>
  )
}

function InputTypeField(props: InputTypeFieldProps) {
  const { fieldProps } = props
  const typeFieldProps = { ...fieldProps }
  delete typeFieldProps.inputField

  const TypeFieldList = {
    text: (
      <InputTextField
        {...typeFieldProps}
        required
        name={'updateCell'}
        sx={{
          width: '314px',
        }}
      />
    ),
    number: (
      <InputTextField
        {...typeFieldProps}
        required
        isNumber={true}
        name={'updateCell'}
        sx={{
          width: '314px',
        }}
      />
    ),
    select: <InputSelect {...typeFieldProps} required name={'updateCell'} />,
    radio: <InputRadio {...typeFieldProps} row required name={'updateCell'} />,
    checkbox: <InputCheckbox {...typeFieldProps} row name={'updateCell'} />,
    switch: (
      <InputSwitch
        {...typeFieldProps}
        name={'updateCell'}
        labelPlacement={'end'}
        variant={'body2'}
      />
    ),
  }

  return TypeFieldList[fieldProps.inputField as fieldTypeUnion] ? (
    TypeFieldList[fieldProps.inputField as fieldTypeUnion]
  ) : (
    <Typography color="error" variant={'body1'} sx={{ width: 200 }}>
      정의된 필드가 없습니다.
    </Typography>
  )
}
