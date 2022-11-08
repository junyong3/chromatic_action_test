import { useEffect, useRef, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import Button from '@components/Button'
import { locationDto, locationType } from '@api/model/MDM/config/location'
import useLocationStore from '@stores/MDM/Config/location.store'
import { useLocationListCall } from '../query/useLocationCall'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import { BatchModalRefProps, updateColTS } from '../../../common/Modal/Props'

function LocationDataGrid() {
  const searchInput = useLocationStore((state) => state.SearchInput)
  const { data: LocationList, isLoading } = useLocationListCall(searchInput)
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      locationCode: true,
      locationName: true,
      cellCol: true,
      cellStage: true,
      cellAlign: true,
      locationType: true,
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

  const columns: GridColDef<locationDto>[] = [
    {
      field: 'locationCode',
      headerName: '로케이션 코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'locationName',
      headerName: '로케이션 명',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'cellCol',
      headerName: 'Cell 열',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'cellStage',
      headerName: 'cell 단',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'cellAlign',
      headerName: 'cell 정렬',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },

    {
      field: 'locationType',
      headerName: '로케이션 유형',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }: { value: locationType }) => {
        const reFormat = {
          heavyRack: '중량랙',
          flatRack: '평치랙',
          slidingRack: '슬라이딩랙',
          shelfRack: '선반랙',
          return: '반품',
          warehouse: '입출하장',
          etc: '기타',
        }
        return reFormat[value] ?? 'error'
      },
    },
    {
      field: 'areaCode',
      headerName: '구역 코드',
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
      headerName: '보관 구분',
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
      renderCell: ({ row: { locationCode } }) => {
        return (
          <Link
            href={`${To.MDMConfigLocation}/${locationCode}`}
            data-sb-kind={'pages/MDM/config/locationDetail'}
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
      label: '로케이션 명',
      value: 'locationName',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: 'Cell 열',
      value: 'cellCol',
      fieldProps: {
        inputField: 'number',
      },
    },
    {
      label: 'Cell 단(층)',
      value: 'cellStage',
      fieldProps: {
        inputField: 'number',
      },
    },
    {
      label: 'cell 정렬',
      value: 'cellAlign',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'temperature',
        options: [
          {
            label: '좌',
            id: 'left',
          },
          {
            label: '중앙',
            id: 'center',
          },
          {
            label: '우',
            id: 'right',
          },
        ],
      },
    },
    {
      label: '보관구분',
      value: 'keepType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'storage',
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
      label: '로케이션 유형',
      value: 'locationType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'heavyRack',
        options: [
          {
            label: '중량랙',
            id: 'heavyRack',
          },
          {
            label: '평치랙',
            id: 'flatRack',
          },
          {
            label: '슬라이드랙',
            id: 'slidingRack',
          },
          {
            label: '선반랙',
            id: 'shelfRack',
          },
          {
            label: '반품',
            id: 'return',
          },
          {
            label: '입출하장',
            id: 'warehouse',
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
        rowId={'locationCode'}
        title={'로케이션 정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={LocationList?.items || []}
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
        getRowId={(row) => row.locationCode}
        rows={LocationList?.items || []}
        columns={columns}
        rowCount={LocationList?.items?.length || 0}
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

export default LocationDataGrid
