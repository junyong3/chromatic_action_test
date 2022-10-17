import { useEffect, useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import useOrgStore from '@stores/MDM/Organization/org.store'
import { useOrgListCall } from '@pages/Organization/query/useOrgListCall'
import { OrganizationDto } from '@api/model/MDM/organization'
import { To } from '@routes/To'
import Button from '@components/Button'

function OrganizationDataGrid() {
  const searchInput = useOrgStore((state) => state.SearchInput)
  const { data: orgList, isLoading } = useOrgListCall(searchInput)

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      address1: true,
      address2: true,
      departmentCode: true,
      departmentName: true,
      manager: true,
      memo: true,
      useYN: true,
      zipcode: true,
      func: true,
    })
  useEffect(() => {
    return () => {
      LoadingService.close()
    }
  }, [])

  const columns: GridColDef<OrganizationDto>[] = [
    {
      field: 'departmentCode',
      headerName: '부서코드',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'departmentName',
      headerName: '부서명',
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
      renderCell: ({ row: { departmentCode } }) => {
        return (
          <Link
            href={`${To.MDMConfigOrg}/${departmentCode}`}
            data-sb-kind={'pages/MDM/config/OrganizationDetail'}
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
        getRowId={(row) => row.departmentCode}
        rows={orgList?.items || []}
        columns={columns}
        rowCount={orgList?.items?.length || 0}
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

export default OrganizationDataGrid
