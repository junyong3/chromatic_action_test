import React, { useEffect, useMemo, useState } from 'react'
import { reportListDto } from '@api/model/Commerce/review'
import { useReviewReportCall } from '@domain/Commerce/pages/Review/query/useReviewCall'
import { GridColumns } from '@mui/x-data-grid'
import dayjs from 'dayjs'

import DataGrid from '@components/DataGrid'
import { useFormContext } from 'react-hook-form'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { To } from '@routes/To'

function ReviewReportDataGrid() {
  const { getValues } = useFormContext()
  const { data, isLoading } = useReviewReportCall({ id: getValues('uid') })
  const [rows, setRows] = useState<reportListDto[]>([])

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [data?.items])

  const columns: GridColumns<reportListDto> = useMemo(
    () => [
      {
        field: 'reportDate',
        headerName: '신고 일시',
        type: 'string',
        minWidth: 170,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        valueFormatter: ({ value }) =>
          dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        field: 'reportUID',
        headerName: '신고자',
        type: 'string',
        minWidth: 250,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderCell: (cellParam) => {
          return (
            <LinkCell
              cellInfo={cellParam}
              target="_blank"
              href={`${To.CommerceMemberList}/${cellParam.row.reportUID}`}
            />
          )
        },
      },
      {
        field: 'reportReason',
        headerName: '신고 사유',
        type: 'string',
        minWidth: 230,
        flex: 4,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
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
      pageSize={10}
      rowThreshold={10}
      loading={isLoading}
      initialState={{
        sorting: {
          sortModel: [{ field: 'reportDate', sort: 'desc' }],
        },
      }}
    />
  )
}

export default ReviewReportDataGrid
