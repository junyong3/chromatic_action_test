import { useEffect, useState } from 'react'
import { Chip, Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import {
  MemberDto,
  MemberListReq,
  MemberListRes,
} from '@src/api/model/Commerce/member'
import { To } from '@routes/To'
import DataGrid from '@components/DataGrid'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { useQueryWrap } from '@queries/useQuery'
import dayjs from 'dayjs'
import useMemberStore, {
  MemberStatus,
  OrderCheck,
} from '@stores/Commerce/Member/member.store'
import { MemberQueryKey } from '../Props'

function MemberDataGrid() {
  const searchCondition = useMemberStore((state) => state.searchCondition)
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...searchCondition,
  })
  const [rows, setRows] = useState<MemberDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<MemberListRes>(
    MemberQueryKey.dataGridPagination('list', params),
    () =>
      NetworkService.commerceMember.get<MemberListReq>(
        COMMERCE_MEMBER_API_PATH.MEMBER_LIST,
        {
          ...params,
          memberStatus: params?.memberStatus.join(','),
          orderCheck: params?.orderCheck.join(','),
        }
      ),
    { enabled: false }
  )

  useEffect(() => {
    if (data?.user) setRows(data?.user)
  }, [refetch, data])

  useUpdateEffect(() => {
    setParams((prevState) => ({ ...prevState, ...searchCondition }))
  }, [searchCondition])

  useUpdateEffect(() => void refetch(), [params, params.page, params.limit])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'UID',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 250,
      flex: 1,
      sortable: false,
      cellClassName: 'MemberDataGrid-UID',
    },
    {
      field: 'name',
      headerName: '이름',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 110,
      sortable: false,
      cellClassName: 'MemberDataGrid-name',
    },
    {
      field: 'email',
      headerName: 'ID',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      flex: 1,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: '휴대폰번호',
      headerAlign: 'left',
      align: 'left',
      type: 'string',
      minWidth: 120,
      sortable: false,
      cellClassName: 'MemberDataGrid-phone',
    },
    {
      field: 'memberStatus',
      headerName: '회원상태',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      sortable: false,
      renderCell: ({ row: { memberStatus, orderCheck } }) => {
        let statusText = ''
        switch (memberStatus) {
          case MemberStatus.NORMAL:
            statusText = '정상'
            break
          case MemberStatus.SECESSION:
            statusText = '탈퇴'
            break
          case MemberStatus.DORMANCY:
            statusText = '휴면'
            break
          default:
            statusText = '알수없음'
        }

        return (
          <>
            <Chip label={statusText} />
            {orderCheck === OrderCheck.YES ? (
              <Chip label={'주문금지'} sx={{ marginLeft: '4px' }} />
            ) : null}
          </>
        )
      },
    },
    {
      field: 'registerDate',
      headerName: '가입일시',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 160,
      flex: 1,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ id }) => {
        return (
          <Link
            href={`${To.CommerceMemberList}/${id}`}
            target="_blank"
            color="primary"
            underline="hover"
            data-sb-kind={'pages/Commerce/Member/MemberDetail'}
          >
            상세
          </Link>
        )
      },
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={data?.total || 0}
      page={params.page - 1}
      pageSize={params.limit}
      rowThreshold={params.limit}
      loading={isLoading}
      paginationMode={'server'}
      checkboxSelection={true}
      disableSelectionOnClick={true}
      pageSizeChangeEvent={(pageSize: number) => {
        setParams((prevState) => {
          return { ...prevState, limit: pageSize }
        })
      }}
      onPageChange={(page: number) => {
        setParams((prevState) => {
          return { ...prevState, page: page + 1 }
        })
      }}
      initialState={{
        sorting: {
          sortModel: [{ field: 'registerDate', sort: 'asc' }],
        },
      }}
    />
  )
}

export default MemberDataGrid
