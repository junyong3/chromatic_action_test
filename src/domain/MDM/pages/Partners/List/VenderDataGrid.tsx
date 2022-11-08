import { useState } from 'react'
import { Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { VenderListReq, VenderListRes } from '@api/model/MDM/Partners/vender'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'
import { PartnersQueryKey, VenderTS } from '@domain/MDM/pages/Partners/Props'
import { useVenderStore } from '@stores/MDM/Partners/vender.store'
import useUpdateEffect from '@hooks/useUpdateEffect'

function VenderDataGrid() {
  const searchCondition = useVenderStore((state) => state.searchCondition)
  const [params, setParams] = useState({
    ...searchCondition,
  })
  const {
    data: rows = [],
    isLoading,
    refetch,
  } = useQueryWrap<VenderListRes>(
    PartnersQueryKey.dataGridPagination('venderList', params),
    () =>
      Instance.get<VenderListReq>(
        MDM_PARTNERS_API_PATH.PARTNERS_LIST('vender'),
        params
      )
  )

  useUpdateEffect(() => {
    setParams((prevState) => ({ ...prevState, ...searchCondition }))
  }, [searchCondition])
  useUpdateEffect(() => void refetch(), [params])

  const columns: GridColDef<VenderTS>[] = [
    { field: 'venderCode', headerName: '업체코드', flex: 1 },
    { field: 'venderName', headerName: '업체명', flex: 1 },
    {
      field: 'address',
      headerName: '주소',
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: ({ row: { address } }) => {
        return address.postcode ? (
          <Typography variant="body2">
            {address.postcode}
            <br />
            {address.address1} {address.address2}
          </Typography>
        ) : (
          '-'
        )
      },
    },
    { field: 'businessNumber', headerName: '사업자번호', flex: 1 },
    { field: 'manager', headerName: '담당자', minWidth: 40 },
    { field: 'phone', headerName: '연락처', flex: 1 },
    { field: 'handlingCategory', headerName: '주요취급카테고리', flex: 1 },
    {
      field: 'func',
      headerName: '기능',
      renderCell: ({ id }) => {
        return (
          <Link
            href={`${To.MDMPartnersVender}/${id}`}
            data-sb-kind={'pages/MDM/Partners/Vender/Detail'}
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

  return (
    <DataGrid
      getRowId={(row) => row.venderCode}
      rows={rows}
      columns={columns}
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      toolBar
    />
  )
}

export default VenderDataGrid
