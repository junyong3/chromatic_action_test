import { useEffect, useRef, useState } from 'react'
import { Box, Link } from '@mui/material'
import { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import Button from '@components/Button'
import useFactoryStore from '@stores/MDM/Config/factory.store'
import { useFactoryListCall } from '@domain/MDM/pages/Config/Factory/query/useFactoryCall'
import { FactoryDto } from '@api/model/MDM/config/factory'
import BatchCallDataGridModal from '@domain/MDM/pages/common/Modal/BatchCallDataGridModal'
import { BatchModalRefProps, updateColTS } from '../../../common/Modal/Props'

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
      headerName: '전화번호',
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

  const updateColumnList: Array<updateColTS> = [
    {
      label: '공장/센터 명',
      value: 'factoryName',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '사업자 번호',
      value: 'companyNumber',
      fieldProps: {
        inputField: 'text',
      },
    },
    {
      label: '전화번호',
      value: 'phoneNumber',
      fieldProps: {
        inputField: 'number',
      },
    },
    {
      label: '센터유형',
      value: 'centerType',
      fieldProps: {
        inputField: 'radio',
        defaultValue: 'logistics',
        options: [
          {
            label: '제조센터(공장)',
            id: 'logistics',
          },
          {
            label: '물류센터',
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
        rowId={'factoryCode'}
        title={'공장/센터 정보'}
        columnList={columns.filter((d) => {
          return d.field !== 'func'
        })}
        gridDataSet={factoryList?.items || []}
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
