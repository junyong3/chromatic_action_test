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
import { GoodsTS } from '../Props'
import { useGoodsListCall } from '../query/usePurchasePriceCall'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'

type GoodsModalProps = {
  type: GoodsType
  onSelect: (selected: GoodsTS) => void
}

export interface GoodsModalRefProps {
  open: () => void
}

function GoodsModal(
  { type, onSelect }: GoodsModalProps,
  ref: Ref<GoodsModalRefProps>
) {
  const fieldName = type === GoodsType.Material ? '원부자재' : '제상품'
  const [isOpenGoodsModal, setIsOpenGoodsModal] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [selectRow, setSelectRow] = useState<GoodsTS | null>(null)
  const { data, isLoading, refetch } = useGoodsListCall({
    type,
    keyword,
  })
  const [rows, setRows] = useState<GoodsTS[]>([])
  const columns: GridColDef<GoodsTS>[] = [
    { field: 'code', headerName: `${fieldName} 코드`, flex: 1 },
    { field: 'name', headerName: `${fieldName} 명`, flex: 1 },
  ]

  useEffect(() => {
    if (data) setRows(data)
  }, [refetch, data])

  useUpdateEffect(() => void refetch(), [keyword])

  useImperativeHandle(ref, () => ({
    open: () => setIsOpenGoodsModal(true),
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
    setIsOpenGoodsModal(false)
  }

  const onClickComplete = () => {
    if (!selectRow) return
    onSelect(selectRow)
    onClose()
  }

  return (
    <FormModal
      formId={'GoodsModalForm'}
      size={'lg'}
      open={isOpenGoodsModal}
      title={`${fieldName} 찾기`}
      methods={methods}
      onClose={onClose}
      onSubmit={onSubmit}
      content={
        <>
          <Stack direction={'row'} spacing={2}>
            <InputTextField
              name={'keyword'}
              sx={{ width: '400px' }}
              placeholder={`${fieldName}코드 또는 ${fieldName}명을 입력하세요`}
            />
            <Button
              type={'submit'}
              form={'GoodsModalForm'}
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
    />
  )
}

export default forwardRef(GoodsModal)
