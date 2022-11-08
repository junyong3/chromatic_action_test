import React, { useEffect, useMemo, useState } from 'react'
import DataGrid from '@components/DataGrid'
import { GridColumns } from '@mui/x-data-grid'
import { Chip, Link } from '@mui/material'
import { To } from '@routes/To'
import useUpdateEffect from '@hooks/useUpdateEffect'
import dayjs from 'dayjs'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import Typography from '@components/Typography'
import { reviewDto, reviewReq } from '@api/model/Commerce/review'
import { useReviewListCall } from '@domain/Commerce/pages/Review/query/useReviewCall'
import useReviewStore from '@stores/Commerce/Reviwe/review.store'

function ReviewDataGrid() {
  const [SearchInput] = useReviewStore((state) => [state.SearchInput])
  const [params, setParams] = useState<reviewReq>({
    rangeDate: {
      startDate: SearchInput.rangeDate.startDate,
      endDate: SearchInput.rangeDate.endDate,
    },
    exposureState: SearchInput.exposureState,
    reviewType: SearchInput.reviewType,
    reportType: SearchInput.reportType,
    filter: SearchInput.filter,
    page: 1,
    limit: 10,
  })
  const { data, isLoading, refetch } = useReviewListCall(params)
  const [rows, setRows] = useState<reviewDto[]>([])

  useEffect(() => {
    console.log('검색조건 변경')
    setParams((prevState) => {
      return { ...prevState, SearchInput }
    })
  }, [SearchInput])
  useEffect(() => {
    if (data?.items) {
      console.log(data?.items)
      setRows(data?.items)
    }
  }, [refetch, data?.items])
  useUpdateEffect(() => {
    refetch()
  }, [params.page, params.limit])

  const columns: GridColumns<reviewDto> = useMemo(
    () => [
      {
        field: 'createDate',
        headerName: '작성 일시',
        type: 'string',
        minWidth: 170,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        valueFormatter: ({ value }) =>
          dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        field: 'productName',
        headerName: '상품명',
        type: 'string',
        minWidth: 180,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderCell: (cellParam) => {
          return (
            <LinkCell
              cellInfo={cellParam}
              target="_blank"
              href={`${To.CommerceReviewList}`}
            />
          )
        },
      },
      {
        field: 'productOption',
        headerName: '옵션명',
        type: 'string',
        minWidth: 140,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'isExposure',
        headerName: '노출 상태',
        minWidth: 80,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          const colorVal = params.value === 'exposure' ? 'primary' : 'default'
          const textVal = params.value === 'exposure' ? '노출' : '미노출'
          return <Chip label={textVal} color={colorVal} size="medium" />
        },
      },
      {
        field: 'reviewType',
        headerName: '리뷰 종류',
        type: 'string',
        minWidth: 80,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        valueFormatter: ({ value }) =>
          value === 'textReview' ? '텍스트' : '사진',
      },
      {
        field: 'reviewContent',
        headerName: '리뷰 내용 요약',
        type: 'string',
        minWidth: 500,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
      },
      {
        field: 'userName',
        headerName: '작성자',
        type: 'string',
        minWidth: 130,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'func',
        headerName: '기능',
        minWidth: 40,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <Link
              href={`${To.CommerceReviewList}/${row.id}`}
              target="_blank"
              color="primary"
              underline="hover"
            >
              <Typography variant={'subtitle2'}>상세</Typography>
            </Link>
          )
        },
      },
    ],
    []
  )

  return (
    <DataGrid
      rows={rows}
      useMultiline={true}
      columns={columns}
      rowCount={data?.total || 0}
      page={params.page - 1}
      pageSize={50}
      rowThreshold={50}
      loading={isLoading}
      paginationMode={'server'}
      disableSelectionOnClick={true}
      getRowClassName={(params) => `custom-row-${params.row.payStatus}`}
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
          sortModel: [{ field: 'createDate', sort: 'desc' }],
        },
      }}
    />
  )
}

export default ReviewDataGrid
