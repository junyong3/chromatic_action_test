import DataGrid from '@components/DataGrid'
import React, { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { Link } from '@mui/material'
import { To } from '@routes/To'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { useProductStore } from '@src/stores/MDM/Product/product.store'
import { ProductDto, productListRes } from '@src/api/model/MDM/product'
import { ProductQueryKey } from '@pages/Product/Props'
import { MDM_PRODUCT_API_PATH } from '@api/path/MDM/productPath'

function ProductDataGrid() {
  const searchCondition = useProductStore((state) => state.searchCondition)
  const [rows, setRows] = useState<ProductDto[]>([])

  const { data, isLoading, refetch } = useQueryWrap<productListRes>(
    ProductQueryKey.productList,
    () =>
      NetworkService.mdm.get(MDM_PRODUCT_API_PATH.PRODUCT_LIST, searchCondition)
  )

  const columns: GridColDef[] = [
    {
      field: 'materialCode',
      headerName: '자재코드',
      renderCell: (params) => {
        return (
          <Link
            href={`${To.MDMGoodsProduct}/1`}
            data-sb-kind={'pages/MDM/Product/ProductDetail'}
            target="_blank"
            color="primary"
            underline={'hover'}
          >
            {params.row.materialCode}
          </Link>
        )
      },
    },
    { field: 'materialName', headerName: '자재명' },
    { field: 'group', headerName: '군' },
    { field: 'ph1', headerName: 'Ph1' },
    { field: 'ph2', headerName: 'Ph2' },
    { field: 'ph3', headerName: 'Ph3' },
    { field: 'materialType', headerName: '자재유형' },
    { field: 'procurementCategory', headerName: '조달구분' },
    { field: 'brandType', headerName: '브랜드 구분' },
    { field: 'shelfLife', headerName: '유통기간' },
    { field: 'minDeliveryAllowablePeriod', headerName: '출고허용기간(min)' },
    { field: 'maxDeliveryAllowablePeriod', headerName: '출고허용기간(max)' },
    { field: 'consumptionPeriod', headerName: '소비기간' },
    { field: 'supplyStatus', headerName: '공급상태' },
    { field: 'leadTime', headerName: '리드타임(일)' },
    { field: 'orderUnit', headerName: '발주단위' },
    { field: 'basicUnit', headerName: '기본단위' },
    { field: 'warehousingUnit', headerName: '입고단위' },
    { field: 'boxQuantity', headerName: '박스입수량' },
    { field: 'loadedQuantityPerPallet', headerName: '파레트당 적재수량' },
    { field: 'orderUnitQuantity', headerName: '발주단위수량' },
    { field: 'minOrderQuantity', headerName: '최소발주수량' },
    { field: 'maxOrderQuantity', headerName: '최대발주수량' },
    { field: 'availableDays', headerName: '입고가능요일' },
    { field: 'isAutomaticOrdering', headerName: '자동발주 여부' },
    { field: 'isUseSingleBarcode', headerName: '단일바코드 사용여부' },
    { field: 'isUse', headerName: '사용여부' },
    {
      field: 'func',
      headerName: '기능',
      renderCell: (params) => {
        return (
          <Link
            href={`${To.MDMGoodsProduct}/1`}
            data-sb-kind={'pages/MDM/Product/ProductDetail'}
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

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [refetch, data])

  useUpdateEffect(() => {
    void refetch()
  }, [searchCondition])

  return (
    <DataGrid
      getRowId={(row) => row.materialCode}
      rows={rows}
      columns={columns}
      pageSize={50}
      rowThreshold={50}
      loading={isLoading}
    />
  )
}

export default ProductDataGrid
