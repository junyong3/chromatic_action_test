import { useEffect, useState } from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { NumberCommaFormat } from '@utils/common'
import dayjs from 'dayjs'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { PriceHistoryTS } from '../Props'
import { usePurchasePriceHistoryListCall } from '../query/usePurchasePriceCall'

export type PurchasePriceHistoryDataGridProps = {
  type: GoodsType
  purchasePriceId: string
}

function PurchasePriceHistoryDataGrid({
  type,
  purchasePriceId,
}: PurchasePriceHistoryDataGridProps) {
  const [rows, setRows] = useState<PriceHistoryTS[]>([])
  const { data, isLoading, refetch } = usePurchasePriceHistoryListCall({
    type,
    purchasePriceId,
  })

  useEffect(() => {
    if (data) setRows(data)
  }, [refetch, data])

  useUpdateEffect(() => void refetch(), [purchasePriceId])

  const columns: GridColDef<PriceHistoryTS>[] = [
    {
      field: 'price',
      headerName: '가격',
      flex: 1,
      renderCell: (row: GridRenderCellParams) => {
        return `${NumberCommaFormat(row.value)}원`
      },
    },
    {
      field: 'availableStartDate',
      headerName: '적용 시작일',
      flex: 1,
      valueFormatter: ({ value }) => {
        return dayjs(value).format('YYYY-MM-DD')
      },
    },
    {
      field: 'availableEndDate',
      headerName: '적용 시작일',
      flex: 1,
      valueFormatter: ({ value }) => {
        return dayjs(value).format('YYYY-MM-DD')
      },
    },
    { field: 'register', headerName: '등록자', flex: 1 },
  ]

  return (
    <DataGrid
      getRowId={(row) =>
        `${purchasePriceId}-${dayjs(row.availableStartDate).format('YYMMDD')}`
      }
      rows={rows}
      columns={columns}
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      toolBar
    />
  )
}

export default PurchasePriceHistoryDataGrid
