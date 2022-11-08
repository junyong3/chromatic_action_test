import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import dayjs from 'dayjs'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_NOTICE_API_PATH } from '@api/path/Commerce/noticePath'
import { ListPagination } from '@api/model/Commerce/common'
import { NoticeDto, NoticeListRes } from '@api/model/Commerce/notice'
import { To } from '@routes/To'
import useUpdateEffect from '@hooks/useUpdateEffect'
import DataGrid from '@components/DataGrid'

function NoticeDataGrid() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const { data, isLoading, refetch } = useQueryWrap<NoticeListRes>(
    ['noticeList', params],
    () =>
      Instance.get<ListPagination>(COMMERCE_NOTICE_API_PATH.NOTICE_LIST, params)
  )
  const [rows, setRows] = useState<NoticeDto[]>([])

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [refetch, data])
  useUpdateEffect(() => {
    refetch()
  }, [params.page, params.limit])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'title',
      headerName: '공지 제목',
      type: 'string',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      sortable: false,
    },
    {
      field: 'published',
      headerName: '노출 상태',
      type: 'string',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      valueFormatter: ({ value }) => (value ? '노출' : '미노출'),
    },
    {
      field: 'createdAt',
      headerName: '생성날짜',
      type: 'string',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'updateAt',
      headerName: '수정날짜',
      type: 'string',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      hide: true,
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
            data-sb-kind={'pages/Commerce/Notice/NoticeDetail'}
            href={`${To.CommerceNoticeList}/${id}`}
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
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={data?.total || 0}
      page={params.page - 1}
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      paginationMode={'server'}
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
          sortModel: [{ field: 'createdAt', sort: 'desc' }],
        },
      }}
    />
  )
}

export default NoticeDataGrid
