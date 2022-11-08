import TextFieldElement from '@components/TextField/InputTextField'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCouponStore } from '@stores/Commerce/Coupon/coupon.store'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { Divider, Stack } from '@mui/material'
import DataGrid from '@components/DataGrid'
import {
  GridColDef,
  GridFooter,
  GridFooterContainer,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import FormModal from '@components/Modal/FormModal'
import Typography from '@components/Typography'
import FileTemplateModal from './FileTemplateModal'

interface Customer {
  id: number
  customerCode: string
  customerName: string
  email: string
}

function CustomerRegisterModal() {
  const { mutate } = useMutationWrap<Customer>()
  const [rows, setRows] = useState<Customer[]>([])
  const [selectedRows, setSelectedRows] = useState<Customer[]>([])
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([])
  const [addedRows, setAddedRows] = useState<Customer[]>([])
  const [addedSelectedRows, setAddedSelectedRows] = useState<Customer[]>([])
  const [addedSelectedRowIds, setAddedSelectedRowIds] = useState<GridRowId[]>(
    []
  )
  const [isOpenTemplateDialog, setIsOpenTemplateDialog] = React.useState(false)
  const [isConfirmDialog, setIsConfirmDialog] = useState(false)

  const [
    isOpenCustomerRegisterDialog,
    setIsOpenCustomerRegisterDialog,
    setTargetCustomerList,
  ] = useCouponStore((state) => [
    state.isOpenCustomerRegisterDialog,
    state.setIsOpenCustomerRegisterDialog,
    state.setTargetCustomerList,
  ])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      keyword: '',
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    mutate(
      Instance.get(COMMERCE_COUPON_API_PATH.CUSTOMER_LIST, {
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
    setTargetCustomerList(addedRows)

    setIsOpenCustomerRegisterDialog(false)
    resetState()
  }

  const onClickAdd = () => {
    setAddedRows([...selectedRows, ...addedRows])
    setSelectedRowIds([])
  }

  const columns: GridColDef[] = [
    { field: 'customerCode', headerName: '회원코드', flex: 1 },
    { field: 'customerName', headerName: '회원명', flex: 1 },
    { field: 'email', headerName: '아이디', flex: 1 },
  ]

  const onSelectionModelChange = (selectionModel: GridSelectionModel) => {
    setSelectedRows(
      selectionModel.map((d: any) =>
        rows.find((row) => row.id === d)
      ) as Customer[]
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
            {selectedRowIds.length}명 목록에 추가
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
            {addedSelectedRowIds.length}명 삭제
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
      ) as Customer[]
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
      // const workBook = XLSX.read(data, { type: 'binary' })
      // workBook.SheetNames.forEach((sheetName) => {
      //   console.log(`sheet name : ${sheetName}`)
      //   const row = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      //   console.log(row)
      // })
    }
    reader.readAsBinaryString(file)
  }

  return (
    <FormModal
      size={'lg'}
      open={isOpenCustomerRegisterDialog}
      title={'회원 등록'}
      onClose={() => setIsConfirmDialog(true)}
      methods={methods}
      onSubmit={onSubmit}
      content={
        <>
          <Stack direction={'row'} spacing={2}>
            <TextFieldElement
              name={'keyword'}
              sx={{ width: '400px' }}
              placeholder={'회원명, 회원코드, 핸드폰번호를 입력하세요'}
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
                sortModel: [{ field: 'customerCode', sort: 'desc' }],
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
            <Typography variant={'subtitle1'}>회원 목록</Typography>
            <div>
              <Button
                variant={'text'}
                size={'small'}
                sx={{ mr: 1 }}
                onClick={() => setIsOpenTemplateDialog(true)}
              >
                파일 템플릿보기
              </Button>
              <label htmlFor={'customer-button-file'}>
                <Button variant={'contained'} size={'small'} component={'span'}>
                  회원코드 파일 업로드 하기
                </Button>
                <input
                  type={'file'}
                  accept={'.xls, .xlsx'}
                  id={'customer-button-file'}
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
                sortModel: [{ field: 'customerCode', sort: 'desc' }],
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
          <Button
            variant={'contained'}
            sx={{
              width: '128px',
            }}
            size={'large'}
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
        title={'회원 등록'}
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
                setIsOpenCustomerRegisterDialog(false)
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

export default CustomerRegisterModal
