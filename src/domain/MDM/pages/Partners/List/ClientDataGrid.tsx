import { useState } from 'react'
import { Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { ClientListReq, ClientListRes } from '@api/model/MDM/Partners/client'
import Instance from '@api/Instance'
import { MDM_PARTNERS_API_PATH } from '@api/path/MDM/partnersPath'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'
import { ClientTS, PartnersQueryKey } from '@domain/MDM/pages/Partners/Props'
import { useClientStore } from '@stores/MDM/Partners/client.store'
import useUpdateEffect from '@hooks/useUpdateEffect'

function ClientDataGrid() {
  const searchCondition = useClientStore((state) => state.searchCondition)
  const [params, setParams] = useState({
    ...searchCondition,
  })
  const {
    data: rows = [],
    isLoading,
    refetch,
  } = useQueryWrap<ClientListRes>(
    PartnersQueryKey.dataGridPagination('clientList', params),
    () =>
      Instance.get<ClientListReq>(
        MDM_PARTNERS_API_PATH.PARTNERS_LIST('client'),
        params
      )
  )

  useUpdateEffect(() => {
    setParams((prevState) => ({ ...prevState, ...searchCondition }))
  }, [searchCondition])
  useUpdateEffect(() => void refetch(), [params])

  const columns: GridColDef<ClientTS>[] = [
    { field: 'clientCode', headerName: '업체코드' },
    { field: 'clientName', headerName: '업체명' },
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
            href={`${To.MDMPartnersClient}/${id}`}
            data-sb-kind={'pages/MDM/Partners/Client/Detail'}
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
      getRowId={(row) => row.clientCode}
      rows={rows}
      columns={columns}
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      toolBar
    />
  )
}

export default ClientDataGrid
