import React, { useState } from 'react'
import TextFieldElement from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { useForm } from 'react-hook-form'
import { useCouponStore } from '@stores/Commerce/Coupon/coupon.store'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { Divider, Stack } from '@mui/material'
import RadioButtonGroupElement from '@components/Radio/RadioButtonGroupElement'
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
import Typography from '@components/Typography'
import FileTemplateModal from './FileTemplateModal'

interface Product {
  id: number
  productCode: string
  productName: string
  price: number
  categoryName: string
}

function ProductRegisterModal() {
  const { mutate } = useMutationWrap<Product>()
  const [rows, setRows] = useState<Product[]>([])
  const [selectedRows, setSelectedRows] = useState<Product[]>([])
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([])
  const [addedRows, setAddedRows] = useState<Product[]>([])
  const [addedSelectedRows, setAddedSelectedRows] = useState<Product[]>([])
  const [addedSelectedRowIds, setAddedSelectedRowIds] = useState<GridRowId[]>(
    []
  )
  const [isOpenTemplateDialog, setIsOpenTemplateDialog] = React.useState(false)
  const [isConfirmDialog, setIsConfirmDialog] = useState(false)

  const [
    isOpenProductRegisterDialog,
    setIsOpenProductRegisterDialog,
    setTargetProductList,
    setTargetCategoryList,
    setTargetProductExcept,
  ] = useCouponStore((state) => [
    state.isOpenProductRegisterDialog,
    state.setIsOpenProductRegisterDialog,
    state.setTargetProductList,
    state.setTargetCategoryList,
    state.setTargetProductExcept,
  ])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      searchType: 'product',
      keyword: '',
      except: undefined,
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      Instance.get(COMMERCE_COUPON_API_PATH.PRODUCT_LIST, {
        searchType: data.searchType,
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
    if (methods.watch('searchType') === 'product') {
      setTargetProductList(addedRows)
      setTargetProductExcept(
        methods.watch('except') ? !!methods.watch('except') : false
      )
    } else if (methods.watch('searchType') === 'category') {
      setTargetCategoryList(addedRows)
      setTargetProductExcept(
        methods.watch('except') ? !!methods.watch('except') : false
      )
    }

    setIsOpenProductRegisterDialog(false)
    resetState()
  }

  const onClickAdd = () => {
    setAddedRows([...selectedRows, ...addedRows])
    setSelectedRowIds([])
  }

  const columns: GridColDef[] = [
    { field: 'productCode', headerName: '상품코드', flex: 1 },
    { field: 'productName', headerName: '상품명', flex: 1 },
    { field: 'price', headerName: '판매가', flex: 1 },
    { field: 'categoryName', headerName: '카테고리명(대>중>소)', flex: 1 },
  ]

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setSelectedRows(
      selectionModel.map((d: any) =>
        rows.find((row) => row.id === d)
      ) as Product[]
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
      ) as Product[]
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
      open={isOpenProductRegisterDialog}
      title={'상품 등록'}
      onClose={() => setIsConfirmDialog(true)}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <RadioButtonGroupElement
            name={'searchType'}
            row
            options={[
              { id: 'product', label: '상품정보로 조회' },
              { id: 'category', label: '카테고리로 조회' },
            ]}
          />
          <Stack direction={'row'} spacing={2}>
            <TextFieldElement
              name={'keyword'}
              sx={{ width: '400px' }}
              placeholder={
                methods.watch('searchType') === 'product'
                  ? '상품명 또는 상품코드를 입력하세요'
                  : '카테고리 명칭 또는 코드를 입력하세요'
              }
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
            rowHeight={45}
            initialState={{
              sorting: {
                sortModel: [{ field: 'productCode', sort: 'desc' }],
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
            <Typography variant={'subtitle1'}>상품 목록</Typography>
            <div>
              <Button
                variant={'text'}
                size={'small'}
                sx={{ mr: 1 }}
                onClick={() => setIsOpenTemplateDialog(true)}
              >
                파일 템플릿보기
              </Button>
              <label htmlFor={'product-button-file'}>
                <Button variant={'contained'} size={'small'} component={'span'}>
                  상품코드 파일 업로드 하기
                </Button>
                <input
                  type={'file'}
                  accept={'.xls, .xlsx'}
                  id={'product-button-file'}
                  style={{ display: 'none' }}
                  onChange={onChangeFile}
                />
              </label>
            </div>
          </Stack>

          <DataGrid
            rows={addedRows}
            columns={columns}
            rowHeight={45}
            initialState={{
              sorting: {
                sortModel: [{ field: 'productCode', sort: 'desc' }],
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
        title={'상품 등록'}
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
                setIsOpenProductRegisterDialog(false)
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

export default ProductRegisterModal
