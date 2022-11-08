import React, { useEffect, useState } from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'
import {
  GridCellParams,
  GridColDef,
  GridColumnVisibilityModel,
  GridRowClassNameParams,
} from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import LoadingService from '@services/LoadingService'
import useHealthCertificateStore from '@stores/MDM/AddInfo/healthCertificate.store'
import { useHealthCertificateListCall } from '../query/useHealthCertificateCall'
import { healthCertificateDto } from '@api/model/MDM/AddInfo/healthCertificate'
import dayjs from 'dayjs'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { RectColorBox } from '@domain/MDM/pages/AddInfo/HealthCertificate/List/StyleObj'
import { To } from '@routes/To'

function HealthCertificateDataGrid() {
  const searchInput = useHealthCertificateStore((state) => state.SearchInput)
  const { data: HealthCertificateList, isLoading } =
    useHealthCertificateListCall(searchInput)
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      healthCRETCreateDate: true,
      healthCRETExpiryDate: true,
      healthCertificateExpired: true,
      healthCRETCode: false,
      phoneNumber: true,
      healthCertificateFile: true,
      name: true,
      department: true,
    })
  useEffect(() => {
    return () => {
      LoadingService.close()
    }
  }, [])

  const columns: GridColDef<healthCertificateDto>[] = [
    {
      field: 'healthCRETCode',
      headerName: 'id',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'name',
      headerName: '이름',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'department',
      headerName: '부서',
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
      field: 'healthCRETCreateDate',
      headerName: '등록일',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
    },

    {
      field: 'healthCRETExpiryDate',
      headerName: '만료일',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'healthCertificateExpired',
      headerName: '만료 여부',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
      cellClassName: (params: GridCellParams) => {
        const isExpired = params.row[params.field]
        if (isExpired) {
          return 'expired'
        } else {
          return 'available'
        }
      },
      valueFormatter: ({ value }: { value: boolean }) => {
        return value ? '만료' : '유효'
      },
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      renderCell: ({ row: { healthCRETCode } }) => {
        return (
          <Link
            href={`${To.MDMAddInfoHealthCertificate}/${healthCRETCode}`}
            data-sb-kind={'pages/MDM/AddInfo/HealthCertificate/Detail'}
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

  const expiryRowStyle = (
    params: GridRowClassNameParams<healthCertificateDto>
  ) => {
    const expiryDate = dayjs(params.row['healthCRETExpiryDate'])
    const expiryCheck = expiryDate.diff(dayjs().format('YYYY-MM-DD'), 'month')
    if (expiryCheck < 0) {
      return ``
    } else if (expiryCheck < 4) {
      return `warring-row`
    } else {
      return ``
    }
  }
  return (
    <Box
      sx={{
        '& .available': {
          color: 'rgb(56, 142, 60)',
        },
        '& .expired': {
          color: 'rgb(211, 47, 47)',
        },
        '& .warring-row': {
          backgroundColor: () => 'rgb(251,150,0)',
        },
      }}
    >
      <br />
      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        pb={1}
      >
        <InfoOutlinedIcon fontSize={'small'} sx={{ color: '#0288D1' }} />
        <Typography variant={'caption'} sx={{ width: 200, color: '#00000099' }}>
          <Stack
            direction="row"
            justifyContent={'center'}
            alignContent={'center'}
            spacing={2}
          >
            <RectColorBox background={'rgb(251,150,0)'} />
            {'보건증 만료기간이 4개월 미만 입니다.'}
          </Stack>
        </Typography>
      </Box>
      <DataGrid
        getRowId={(row) => row.healthCRETCode}
        rows={HealthCertificateList?.items || []}
        columns={columns}
        rowCount={HealthCertificateList?.items?.length || 0}
        getRowClassName={expiryRowStyle}
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

export default HealthCertificateDataGrid
