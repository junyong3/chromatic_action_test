import { useEffect, useRef, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import Button from '@components/Button'
import { areaDto } from '@api/model/MDM/config/area'
import useAreaStore from '@stores/MDM/Config/area.store'
import { useAreaListCall } from '../query/useAreaCall'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import { BatchModalRefProps, updateColTS } from '../../../common/Modal/Props'

function AreaDataGrid() {
  const searchInput = useAreaStore((state) => state.SearchInput)
  const { data: AreaList, isLoading } = useAreaListCall(searchInput)

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      areaCode: true,
      areaName: true,
      warehouseCode: true,
      warehouseName: true,
      factoryCode: true,
      factoryName: true,
      keepType: true,
      useYN: true,
    })
  useEffect(() => {
    return () => {
      LoadingService.close()
    }
  }, [])

  const columns: GridColDef<areaDto>[] = [
    {
      field: 'areaCode',
      headerName: '구역코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'areaName',
      headerName: '구역 명',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'warehouseCode',
      headerName: '창고 코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'warehouseName',
      headerName: '창고 명',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'factoryCode',
      headerName: '공장/센터 코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'factoryName',
      headerName: '공장/센터 명',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'keepType',
      headerName: '구역유형',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => {
        switch (value) {
          case 'temperature':
            return '실온'
          case 'frozen':
            return '냉동'
          case 'refrigerated':
            return '냉장'
          default:
            return '기타'
        }
      },
    },
    {
      field: 'useYN',
      headerName: '사용여부',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => (value ? '사용' : '사용중지'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row: { areaCode } }) => {
        return (
          <Link
            href={`${To.MDMConfigArea}/${areaCode}`}
            data-sb-kind={'pages/MDM/config/areaDetail'}
            target="_blank"
            color="primary"
            underline="hover"
          >
            상세
          </Link>
        )
      },
    },
  ]

  const updateColumnList: Array<updateColTS> = [
    {
      label: '구역 명',
      value: 'areaName',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '구역유형',
      value: 'keepType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'temperature',
        options: [
          {
            label: '실온',
            id: 'temperature',
          },
          {
            label: '냉동',
            id: 'frozen',
          },
          {
            label: '냉동',
            id: 'refrigerated',
          },
          {
            label: '기타',
            id: 'etc',
          },
        ],
      },
    },
    {
      label: '사용여부',
      value: 'useYN',
      fieldProps: {
        inputField: 'switch',
        defaultValue: false,
        label: '사용여부',
      },
    },
  ]
  const batchRef = useRef<BatchModalRefProps>(null)
  const batchModalClick = () => {
    if (batchRef.current) batchRef.current.open()
  }
  return (
    <Box>
      <BatchCallDataGridModal
        rowId={'areaCode'}
        title={'지역 정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={AreaList?.items || []}
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
        getRowId={(row) => row.areaCode}
        rows={AreaList?.items || []}
        columns={columns}
        rowCount={AreaList?.items?.length || 0}
        pageSize={5}
        rowThreshold={5}
        loading={isLoading}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => {
          setColumnVisibilityModel(newModel)
        }}
        toolBar={true}
      />
    </Box>
  )
}

export default AreaDataGrid
