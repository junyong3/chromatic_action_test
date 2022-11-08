import { useState } from 'react'
import { Link } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid'
import { SellingPriceTS } from '@domain/MDM/pages/Goods/SellingPrice/Props'
import { useProductSellingPriceStore } from '@stores/MDM/Goods/SellingPrice/product.store'
import useUpdateEffect from '@hooks/useUpdateEffect'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { NumberCommaFormat } from '@utils/common'
import dayjs from 'dayjs'
import { useSellingPriceListCall } from '../query/useSellingPriceCall'

function ProductSellingPriceDataGrid() {
  const [searchCondition, setSellingPriceId] = useProductSellingPriceStore(
    (state) => [state.searchCondition, state.setSellingPriceId]
  )
  const [params, setParams] = useState({
    ...searchCondition,
  })
  const {
    data: rows = [],
    isLoading,
    refetch,
  } = useSellingPriceListCall(params)

  useUpdateEffect(() => {
    setParams((prevState) => ({ ...prevState, ...searchCondition }))
  }, [searchCondition])
  useUpdateEffect(() => void refetch(), [params])

  const columns: GridColDef<SellingPriceTS>[] = [
    {
      field: 'goods',
      headerName: '자재코드',
      flex: 1,
      renderCell: (row: GridRenderCellParams) => {
        return (
          <LinkCell
            title={row.value.name}
            cellInfo={row}
            sbkind={'pages/MDM/Goods/Product/Detail'}
            href={`${To.MDMGoodsProduct}/${row.value.code}`}
          />
        )
      },
    },
    {
      field: 'customer',
      headerName: '거래처',
      flex: 1,
      renderCell: (row: GridRenderCellParams) => {
        return (
          <LinkCell
            title={row.value.name}
            cellInfo={row}
            sbkind={'pages/MDM/Partners/Client/Detail'}
            href={`${To.MDMPartnersClient}/${row.value.code}`}
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
            href={`${To.MDMGoodsProductSellingPrice}/${id}`}
            data-sb-kind={'pages/MDM/Goods/ProductSellingPrice/Detail'}
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
      onRowClick={({ id }) => setSellingPriceId(id as string)}
    />
  )
}

export default ProductSellingPriceDataGrid
