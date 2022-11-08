import DataGrid from '@components/DataGrid'
import React, { useEffect, useRef, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { Box, Link } from '@mui/material'
import { To } from '@routes/To'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { useProductStore } from '@stores/MDM/Goods/product.store'
import { ProductDto, productListRes } from '@api/model/MDM/Goods/product'
import { ProductQueryKey } from '@domain/MDM/pages/Goods/Product/Props'
import { MDM_GOODS_PRODUCT_API_PATH } from '@src/api/path/MDM/Goods/productPath'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import Button from '@components/Button'
import {
  BatchModalRefProps,
  updateColTS,
} from '@domain/MDM/pages/common/Modal/Props'

function ProductDataGrid() {
  const searchCondition = useProductStore((state) => state.searchCondition)
  const [rows, setRows] = useState<ProductDto[]>([])

  const { data, isLoading, refetch } = useQueryWrap<productListRes>(
    ProductQueryKey.productList,
    () => Instance.get(MDM_GOODS_PRODUCT_API_PATH.PRODUCT_LIST, searchCondition)
  )

  const columns: GridColDef<ProductDto>[] = [
    {
      field: 'materialCode',
      headerName: '자재코드',
      renderCell: (params) => {
        return (
          <Link
            href={`${To.MDMGoodsProduct}/1`}
            data-sb-kind={'pages/MDM/Goods/Product/Detail'}
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
            data-sb-kind={'pages/MDM/Goods/Product/Detail'}
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

  const updateColumnList: Array<updateColTS> = [
    {
      label: '자재명',
      value: 'materialName',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '군',
      value: 'group',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: 'Ph1',
      value: 'ph1',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: 'Ph2',
      value: 'ph2',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: 'Ph3',
      value: 'ph3',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '자재유형',
      value: 'materialType',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '조달구분',
      value: 'procurementCategory',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '브랜드 구분',
      value: 'brandType',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '유통기간',
      value: 'shelfLife',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '출고허용기간(min)',
      value: 'minDeliveryAllowablePeriod',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '출고허용기간(max)',
      value: 'maxDeliveryAllowablePeriod',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '소비기간',
      value: 'consumptionPeriod',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '공급상태',
      value: 'supplyStatus',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '리드타임(일)',
      value: 'leadTime',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '발주단위',
      value: 'orderUnit',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '기본단위',
      value: 'basicUnit',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '입고단위',
      value: 'warehousingUnit',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '박스입수량',
      value: 'boxQuantity',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '파레트당 적재수량',
      value: 'loadedQuantityPerPallet',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '발주단위수량',
      value: 'orderUnitQuantity',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '최소발주수량',
      value: 'minOrderQuantity',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '최대발주수량',
      value: 'maxOrderQuantity',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '입고가능요일',
      value: 'availableDays',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '자동발주 여부',
      value: 'isAutomaticOrdering',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '단일바코드 사용여부',
      value: 'isUseSingleBarcode',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '사용여부',
      value: 'isUse',
      fieldProps: {
        inputField: 'text',
      },
    },
  ]
  const batchRef = useRef<BatchModalRefProps>(null)
  const batchModalClick = () => {
    if (batchRef.current) batchRef.current.open()
  }

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [refetch, data])

  useUpdateEffect(() => {
    void refetch()
  }, [searchCondition])

  return (
    <>
      <BatchCallDataGridModal
        rowId={'materialCode'}
        title={'제상품 정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={rows || []}
        updateColumnList={updateColumnList}
        ref={batchRef}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'center',
          padding: '0 0 12px 0',
        }}
      >
        <Button
          color={'primary'}
          variant={'text'}
          size={'small'}
          onClick={batchModalClick}
        >
          일괄 수정 및 삭제
        </Button>
      </Box>
      <DataGrid
        getRowId={(row) => row.materialCode}
        rows={rows}
        columns={columns}
        pageSize={50}
        rowThreshold={50}
        loading={isLoading}
        toolBar
      />
    </>
  )
}

export default ProductDataGrid
