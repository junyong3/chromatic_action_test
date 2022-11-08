import { DialogContent } from '@mui/material'
import Dialog from '@components/Dialog/Dialog'
import React, { useEffect, useMemo, useState } from 'react'
import { usePointStore } from '@stores/Commerce/Point/point.store'
import DataGrid from '@components/DataGrid'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { GridColumns } from '@mui/x-data-grid'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_POINT_API_PATH } from '@api/path/Commerce/pointPath'
import {
  PointFailedDto,
  PointFailedListReq,
  PointFailedListRes,
} from '@api/model/Commerce/point'

function PaymentFailDetailDialog() {
  const [
    isPaymentFailDetailDialog,
    paymentFailDetailParams,
    setIsPaymentFailDetailDialog,
  ] = usePointStore((state) => [
    state.isPaymentFailDetailDialog,
    state.paymentFailDetailParams,
    state.setIsPaymentFailDetailDialog,
  ])

  const onClose = () => {
    setIsPaymentFailDetailDialog(false)
  }

  const [params, setParams] = useState({
    id: paymentFailDetailParams,
    page: 1,
    limit: 10,
  })
  const [rows, setRows] = useState<PointFailedDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<PointFailedListRes>(
    ['pointList', params],
    () =>
      Instance.get<PointFailedListReq>(
        COMMERCE_POINT_API_PATH.POINT_FAILED_LIST,
        params
      )
  )

  useEffect(() => {
    if (data?.items) setRows(data?.items)
  }, [refetch, data])
  useUpdateEffect(() => {
    void refetch()
  }, [params.id, params.page, params.limit])

  const columns: GridColumns<any> = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'no.',
        type: 'number',
        width: 56,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'customerPhone',
        headerName: '고객 번호',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
    ],
    []
  )

  return (
    <Dialog
      size={'sm'}
      open={isPaymentFailDetailDialog}
      title={'등록 실패 데이터'}
      onClose={onClose}
    >
      <DialogContent dividers sx={{ p: '16px 24px !important' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={data?.total || 0}
          page={params.page - 1}
          pageSize={50}
          rowThreshold={50}
          loading={isLoading}
          paginationMode={'server'}
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
              sortModel: [{ field: 'createdAt', sort: 'desc' }],
            },
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PaymentFailDetailDialog
