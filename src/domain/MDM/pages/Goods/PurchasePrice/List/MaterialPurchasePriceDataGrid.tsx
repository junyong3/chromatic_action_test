import { useState } from 'react'
import { Link } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid'
import { PurchasePriceTS } from '@domain/MDM/pages/Goods/PurchasePrice/Props'
import { useMaterialPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/material.store'
import useUpdateEffect from '@hooks/useUpdateEffect'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { NumberCommaFormat } from '@utils/common'
import dayjs from 'dayjs'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { usePurchasePriceListCall } from '../query/usePurchasePriceCall'

function MaterialPurchasePriceDataGrid() {
  const type = GoodsType.Material

  const [searchCondition, setPurchasePriceId] = useMaterialPurchasePriceStore(
    (state) => [state.searchCondition, state.setPurchasePriceId]
  )
  const [params, setParams] = useState({
    ...searchCondition,
  })
  const {
    data: rows = [],
    isLoading,
    refetch,
  } = usePurchasePriceListCall({
    type,
    params,
  })

  useUpdateEffect(() => {
    setParams((prevState) => ({ ...prevState, ...searchCondition }))
  }, [searchCondition])
  useUpdateEffect(() => void refetch(), [params])

  const columns: GridColDef<PurchasePriceTS>[] = [
    {
      field: 'goods',
      headerName: '자재코드',
      flex: 1,
      renderCell: (row: GridRenderCellParams) => {
        return (
          <LinkCell
            title={row.value.name}
            cellInfo={row}
            sbkind={'pages/MDM/Goods/Material/Detail'}
            href={`${To.MDMGoodsMaterial}/${row.value.code}`}
          />
        )
      },
    },
    {
      field: 'supplier',
      headerName: '거래처',
      flex: 1,
      renderCell: (row: GridRenderCellParams) => {
        return (
          <LinkCell
            title={row.value.name}
            cellInfo={row}
            sbkind={'pages/MDM/Partners/Vender/Detail'}
            href={`${To.MDMPartnersVender}/${row.value.code}`}
          />
        )
      },
    },
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
    { field: 'register', headerName: '등록자', flex: 1 },
    {
      field: 'func',
      headerName: '기능',
      renderCell: ({ id }) => {
        return (
          <Link
            href={`${To.MDMGoodsMaterialPurchasePrice}/${id}`}
            data-sb-kind={'pages/MDM/Goods/MaterialPurchasePrice/Detail'}
            target="_blank"
            color="primary"
            underline={'hover'}
          >
            상세
          </Link>
        )
      },
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      toolBar
      onRowClick={({ id }) => setPurchasePriceId(id as string)}
    />
  )
}

export default MaterialPurchasePriceDataGrid
