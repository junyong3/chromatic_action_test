import { useEffect, useRef, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import useOrgStore from '@stores/MDM/Config/org.store'
import { useOrgListCall } from '@domain/MDM/pages/Config/Organization/query/useOrgListCall'
import { OrganizationDto } from '@api/model/MDM/config/organization'
import { To } from '@routes/To'
import Button from '@components/Button'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import { BatchModalRefProps, updateColTS } from '../../../common/Modal/Props'

function OrganizationDataGrid() {
  const searchInput = useOrgStore((state) => state.SearchInput)
  const { data: orgList, isLoading } = useOrgListCall(searchInput)
  const batchRef = useRef<BatchModalRefProps>(null)

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

  const columns: GridColDef<OrganizationDto, any, any>[] = [
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
  const updateColumnList: Array<updateColTS> = [
    {
      label: '부서명',
      value: 'departmentName',
      fieldProps: {
        inputField: 'text',
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
  const batchModalClick = () => {
    if (batchRef.current) batchRef.current.open()
  }

  return (
    <Box>
      <BatchCallDataGridModal
        rowId={'departmentCode'}
        title={'조직정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={orgList?.items || []}
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
