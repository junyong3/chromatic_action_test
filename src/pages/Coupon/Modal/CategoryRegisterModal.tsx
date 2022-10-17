import TextFieldElement from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCouponStore } from '@stores/Commerce/Coupon/coupon.store'
import { useMutationWrap } from '@queries/useMutation'
import NetworkService from '@api/NetworkService'
import { Divider, Stack } from '@mui/material'
import DataGrid from '@components/DataGrid'
import {
  GridColDef,
  GridFooter,
  GridFooterContainer,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'
import CheckboxButtonGroupElement from '@components/Checkbox/CheckboxButtonGroupElement'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import FormModal from '@components/Modal/FormModal'
import Typography from '@src/components/Typography'
import FileTemplateModal from './FileTemplateModal'

interface Category {
  id: number
  categoryCode: string
  mainCategoryName: string
  middleCategoryName: string
  subCategoryName: string
}

function CategoryRegisterModal() {
  const { mutate } = useMutationWrap<Category>()
  const [rows, setRows] = useState<Category[]>([])
  const [selectedRows, setSelectedRows] = useState<Category[]>([])
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([])
  const [addedRows, setAddedRows] = useState<Category[]>([])
  const [addedSelectedRows, setAddedSelectedRows] = useState<Category[]>([])
  const [addedSelectedRowIds, setAddedSelectedRowIds] = useState<GridRowId[]>(
    []
  )
  const [isOpenTemplateDialog, setIsOpenTemplateDialog] = React.useState(false)
  const [isConfirmDialog, setIsConfirmDialog] = useState(false)

  const [
    isOpenCategoryRegisterDialog,
    setIsOpenCategoryRegisterDialog,
    setTargetCategoryList,
    setTargetCategoryExcept,
  ] = useCouponStore((state) => [
    state.isOpenCategoryRegisterDialog,
    state.setIsOpenCategoryRegisterDialog,
    state.setTargetCategoryList,
    state.setTargetCategoryExcept,
  ])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      keyword: '',
      except: undefined,
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      NetworkService.commerce.get(COMMERCE_COUPON_API_PATH.CATEGORY_LIST, {
        keyword: data.keyword,
      }),
      {
        onSuccess: ({ items }: any) => {
          setRows(items)
        },
      }
    )
  })

  const resetState = () => {
    methods.setValue('keyword', '')
    setRows([])
    setSelectedRows([])
    setSelectedRowIds([])
    setAddedRows([])
    setAddedSelectedRows([])
    setAddedSelectedRowIds([])
  }

  const onClickRegister = () => {
    setTargetCategoryList(addedRows)
    setTargetCategoryExcept(
      methods.watch('except') ? !!methods.watch('except') : false
    )

    setIsOpenCategoryRegisterDialog(false)
    resetState()
  }

  const onClickAdd = () => {
    setAddedRows([...selectedRows, ...addedRows])
    setSelectedRowIds([])
  }

  const columns: GridColDef[] = [
    { field: 'categoryCode', headerName: '카테고리 코드', flex: 1 },
    { field: 'mainCategoryName', headerName: '대분류명', flex: 1 },
    { field: 'middleCategoryName', headerName: '중분류명', flex: 1 },
    { field: 'subCategoryName', headerName: '소분류명', flex: 1 },
  ]

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setSelectedRows(
      selectionModel.map((d: any) =>
        rows.find((row) => row.id === d)
      ) as Category[]
    )
    setSelectedRowIds(selectionModel)
  }

  const selectedDataGridFooter = () => {
    return (
      <GridFooterContainer>
        <Stack direction={'row'} spacing={2} px={2}>
          <Button
            variant={'outlined'}
            size={'small'}
            disabled={!selectedRowIds.length}
            onClick={() => setSelectedRowIds([])}
          >
            선택 취소
          </Button>
          <Button
            variant={'contained'}
            size={'small'}
            disabled={!selectedRowIds.length}
            onClick={onClickAdd}
          >
            {selectedRowIds.length}개 목록에 추가
          </Button>
        </Stack>
        <GridFooter sx={{ borderTop: 'none' }} />
      </GridFooterContainer>
    )
  }

  const addedDataGridFooter = () => {
    return (
      <GridFooterContainer>
        <Stack direction={'row'} spacing={2} px={2}>
          <Button
            variant={'outlined'}
            size={'small'}
            disabled={!addedSelectedRowIds.length}
            onClick={() => setAddedSelectedRowIds([])}
          >
            선택 취소
          </Button>
          <Button
            variant={'contained'}
            size={'small'}
            color={'error'}
            disabled={!addedSelectedRowIds.length}
            onClick={onClickDeleteAll}
          >
            {addedSelectedRowIds.length}개 삭제
          </Button>
        </Stack>
        <GridFooter sx={{ borderTop: 'none' }} />
      </GridFooterContainer>
    )
  }

  const onSelectionModelChangeAdded = (selectionModel: GridSelectionModel) => {
    setAddedSelectedRows(
      selectionModel.map((d: any) =>
        rows.find((row) => row.id === d)
      ) as Category[]
    )
    setAddedSelectedRowIds(selectionModel)
  }

  const onClickDeleteAll = () => {
    const ids = addedSelectedRows.map((d) => d.id)
    const addedRowsCopy = addedRows.slice()
    for (const ix in ids) {
      const idx = addedRowsCopy.findIndex((d) => d.id === ids[ix])
      addedRowsCopy.splice(idx, 1)
      setAddedRows(addedRowsCopy)
    }
    setAddedSelectedRowIds([])
  }

  const onChangeFile = (e: any) => {
    // TODO 엑셀파일 업로드 구현
    console.log('onChangeFile', e)
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result
      console.log(data)
    }
    reader.readAsBinaryString(file)
  }

  return (
    <FormModal
      size={'lg'}
      open={isOpenCategoryRegisterDialog}
      title={'카테고리 등록'}
      onClose={() => setIsConfirmDialog(true)}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <Stack direction={'row'} spacing={2}>
            <TextFieldElement
              name={'keyword'}
              sx={{ width: '400px' }}
              placeholder={'명칭 또는 코드를 입력하세요'}
            />
            <Button
              type={'submit'}
              variant={'contained'}
              sx={{ width: '110px' }}
              disabled={!methods.watch('keyword')}
            >
              조회
            </Button>
          </Stack>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'categoryCode', sort: 'desc' }],
              },
            }}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={onSelectionModelChange}
            selectionModel={selectedRowIds}
            components={{
              Footer: selectedDataGridFooter,
            }}
            sx={{ mt: 2 }}
          />

          <Divider sx={{ my: 4 }} />

          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant={'subtitle1'}>카테고리 목록</Typography>
            <div>
              <Button
                variant={'text'}
                size={'small'}
                sx={{ mr: 1 }}
                onClick={() => setIsOpenTemplateDialog(true)}
              >
                파일 템플릿보기
              </Button>
              <label htmlFor={'category-button-file'}>
                <Button variant={'contained'} size={'small'} component={'span'}>
                  카테고리코드 파일 업로드 하기
                </Button>
                <input
                  type={'file'}
                  accept={'.xls, .xlsx'}
                  id={'category-button-file'}
                  style={{ display: 'none' }}
                  onChange={onChangeFile}
                />
              </label>
            </div>
          </Stack>
          <DataGrid
            rows={addedRows}
            columns={columns}
            initialState={{
              sorting: {
                sortModel: [{ field: 'categoryCode', sort: 'desc' }],
              },
            }}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={onSelectionModelChangeAdded}
            selectionModel={addedSelectedRowIds}
            components={{
              Footer: addedDataGridFooter,
            }}
            sx={{ mt: 2 }}
          />
        </>
      }
      actions={
        <>
          <CheckboxButtonGroupElement
            row
            name={'except'}
            options={[{ id: 'except', label: '제외 카테고리로' }]}
          />
          <Button
            variant={'contained'}
            sx={{
              width: '128px',
            }}
            onClick={onClickRegister}
            disabled={!addedRows.length}
          >
            등록하기
          </Button>
        </>
      }
    >
      <FileTemplateModal
        open={isOpenTemplateDialog}
        onClose={() => setIsOpenTemplateDialog(false)}
      />

      <Dialog
        size={'xs'}
        open={isConfirmDialog}
        title={'카테고리 등록'}
        onClose={() => setIsConfirmDialog(false)}
        content={
          <>
            데이터 저장 없이 창이 닫힙니다.
            <br />
            계속 진행하시겠어요?
          </>
        }
        actions={
          <>
            <Button onClick={() => setIsConfirmDialog(false)}>취소</Button>
            <Button
              data-cy={'dialogSaveButton'}
              onClick={() => {
                setIsConfirmDialog(false)
                setIsOpenCategoryRegisterDialog(false)
                resetState()
              }}
            >
              확인
            </Button>
          </>
        }
      />
    </FormModal>
  )
}

export default CategoryRegisterModal
