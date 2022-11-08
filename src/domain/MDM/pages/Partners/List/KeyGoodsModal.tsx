import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import Button from '@components/Button'
import DataGrid from '@components/DataGrid'
import FormModal from '@components/Modal/FormModal'
import InputTextField from '@components/TextField/InputTextField'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { KeyGoodsTS } from '../Props'
import { useKeyGoodsListCall } from '../query/usePartnersCall'

type KeyGoodsModalProps = {
  onSelect: (selected: KeyGoodsTS) => void
}

export interface KeyGoodsModalRefProps {
  open: () => void
}

function KeyGoodsModal(
  { onSelect }: KeyGoodsModalProps,
  ref: Ref<KeyGoodsModalRefProps>
) {
  const [isOpeKeyGoodsModal, setIsOpeKeyGoodsModal] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [selectRow, setSelectRow] = useState<KeyGoodsTS | null>(null)
  const { data, isLoading, refetch } = useKeyGoodsListCall({
    keyword: keyword,
  })
  const [rows, setRows] = useState<KeyGoodsTS[]>([])
  const columns: GridColDef<KeyGoodsTS>[] = [
    { field: 'code', headerName: '자재 코드', flex: 1 },
    { field: 'name', headerName: '자재 명', flex: 1 },
  ]

  useEffect(() => {
    if (data) setRows(data)
  }, [refetch, data])

  useUpdateEffect(() => void refetch(), [keyword])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpeKeyGoodsModal(true),
  }))

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      keyword,
    },
  })

  const onSubmit = methods.handleSubmit((inputData) => {
    setKeyword(inputData.keyword)
  })

  const onClose = () => {
    methods.reset({ keyword: '' })
    setIsOpeKeyGoodsModal(false)
  }

  const onClickComplete = () => {
    if (!selectRow) return
    onSelect(selectRow)
    onClose()
  }

  return (
    <FormModal
      formId={'KeyGoodsModalForm'}
      size={'lg'}
      open={isOpeKeyGoodsModal}
      title={'대표상품 찾기'}
      methods={methods}
      onClose={onClose}
      onSubmit={onSubmit}
      content={
        <>
          <Stack direction={'row'} spacing={2}>
            <InputTextField
              name={'keyword'}
              sx={{ width: '400px' }}
              placeholder={'자재코드 또는 자재명을 입력하세요'}
            />
            <Button
              type={'submit'}
              form={'KeyGoodsModalForm'}
              variant={'contained'}
              sx={{ width: '110px' }}
              disabled={!methods.watch('keyword')}
            >
              찾기
            </Button>
          </Stack>
          <DataGrid
            getRowId={(row) => row.code}
            rows={rows}
            columns={columns}
            pageSize={5}
            loading={isLoading}
            onRowClick={({ row }) => {
              setSelectRow(row)
            }}
            // checkboxSelection
            // onSelectionModelChange={(newSelectionModel) => {
            //   setSelectionModel(newSelectionModel)
            // }}
            // selectionModel={selectionModel}
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
            onClick={onClickComplete}
            disabled={!selectRow}
          >
            선택완료
          </Button>
        </>
      }
    ></FormModal>
  )
}

export default forwardRef(KeyGoodsModal)
