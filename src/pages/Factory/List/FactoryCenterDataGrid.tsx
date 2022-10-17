import { useEffect, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import Button from '@components/Button'
import useFactoryStore from '@stores/MDM/Factory/factory.store'
import { useFactoryListCall } from '@pages/Factory/query/useFactoryCall'
import { FactoryDto } from '@api/model/MDM/factory'

function FactoryCenterDataGrid() {
  const searchInput = useFactoryStore((state) => state.SearchInput)
  const { data: factoryList, isLoading } = useFactoryListCall(searchInput)

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      address1: true,
      address2: true,
      factoryCode: true,
      factoryName: true,
      manager: true,
      companyNumber: true,
      phoneNumber: true,
      memo: true,
      centerType: true,
      useYN: true,
      zipcode: true,
      func: true,
    })
  useEffect(() => {
    return () => {
      LoadingService.close()
    }
  }, [])

  const columns: GridColDef<FactoryDto>[] = [
    {
      field: 'factoryCode',
      headerName: '부서코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'factoryName',
      headerName: '부서명',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'companyNumber',
      headerName: '사업자번호',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: '전화번',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'zipcode',
      headerName: '우편번호',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'address1',
      headerName: '주소',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'address2',
      headerName: '상세주소',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'manager',
      headerName: '담당자',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
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
      field: 'centerType',
      headerName: '센터유형',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) =>
        value === 'logistics' ? '제조센터(공정)' : '물류센터',
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
      renderCell: ({ row: { factoryCode } }) => {
        return (
          <Link
            href={`${To.MDMConfigFactory}/${factoryCode}`}
            data-sb-kind={'pages/MDM/config/Factory'}
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

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'center',
          padding: '0 0 12px 0',
        }}
      >
        <Button color={'primary'} variant={'text'} size={'small'}>
          일괄 수정 및 삭제
        </Button>
      </Box>
      <DataGrid
        getRowId={(row) => row.factoryCode}
        rows={factoryList?.items || []}
        columns={columns}
        rowCount={factoryList?.items?.length || 0}
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

export default FactoryCenterDataGrid
