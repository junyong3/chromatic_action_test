import { useEffect, useRef, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import Button from '@components/Button'
import useWarehouseStore from '@stores/MDM/Config/warehouse.store'
import { warehouseDto } from '@api/model/MDM/config/warehouse'
import { useWarehouseListCall } from '@domain/MDM/pages/Config/Warehouse/query/useWarehouseCall'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import { BatchModalRefProps, updateColTS } from '../../../common/Modal/Props'

function WarehouseDataGrid() {
  const searchInput = useWarehouseStore((state) => state.SearchInput)
  const { data: warehouseList, isLoading } = useWarehouseListCall(searchInput)

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      warehouseCode: true,
      warehouseName: true,
      factoryCode: true,
      factoryName: true,
      keepType: true,
      saveType: true,
      ManagementType: true,
      memo: true,
      useYN: true,
    })
  useEffect(() => {
    return () => {
      LoadingService.close()
    }
  }, [])

  const columns: GridColDef<warehouseDto>[] = [
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
      headerName: '보관구분',
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
      field: 'saveType',
      headerName: '창고유형',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => {
        switch (value) {
          case 'storage':
            return '보관영역'
          case 'warehouse':
            return '입고창고'
          case 'release':
            return '출고창고'
          default:
            return '기타'
        }
      },
    },
    {
      field: 'ManagementType',
      headerName: '관리구분',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => {
        switch (value) {
          case 'logistics':
            return '물류'
          default:
            return '제조'
        }
      },
    },
    {
      field: 'memo',
      headerName: '메모',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
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
      renderCell: ({ row: { warehouseCode } }) => {
        return (
          <Link
            href={`${To.MDMConfigWarehouse}/${warehouseCode}`}
            data-sb-kind={'pages/MDM/config/WareHouseDetail'}
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
      label: '창고 명',
      value: 'warehouseName',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '보관구분',
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
      label: '창고유형',
      value: 'saveType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'storage',
        options: [
          {
            label: '보관영역',
            id: 'storage',
          },
          {
            label: '입고창고',
            id: 'warehouse',
          },
          {
            label: '출고창고',
            id: 'release',
          },
          {
            label: '기타',
            id: 'etc',
          },
        ],
      },
    },
    {
      label: '관리구분',
      value: 'ManagementType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'logistics',
        options: [
          {
            label: '제조',
            id: 'logistics',
          },
          {
            label: '물류',
            id: 'manufacturing',
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
    {
      label: '메모',
      value: 'memo',
      fieldProps: {
        inputField: 'text',
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
        rowId={'warehouseCode'}
        title={'창고 정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={warehouseList?.items || []}
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
        getRowId={(row) => row.warehouseCode}
        rows={warehouseList?.items || []}
        columns={columns}
        rowCount={warehouseList?.items?.length || 0}
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

export default WarehouseDataGrid
