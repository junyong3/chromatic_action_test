import { useEffect, useMemo, useState } from 'react'
import DataGrid from '@components/DataGrid'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { GridColumns, GridRowParams } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import { To } from '@routes/To'
import useUpdateEffect from '@hooks/useUpdateEffect'
import dayjs from 'dayjs'
import JIcon from '@components/JIcon'
import NumberFormatCell from '@components/DataGrid/renderCell/NumberFormatCell'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import {
  paymentMethodValueFormatter,
  paymentStatusValueFormatter,
} from '@utils/common'
import Typography from '@components/Typography'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { PaymentDto, PaymentListRes } from '@api/model/Commerce/payment'

function PaymentDataGrid() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const { data, isLoading, refetch } = useQueryWrap<PaymentListRes>(
    ['paymentList', params],
    () => Instance.get(COMMERCE_PAYMENT_API_PATH.PAYMENT_LIST, params)
  )
  const [rows, setRows] = useState<PaymentDto[]>([])

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [refetch, data])
  useUpdateEffect(() => {
    refetch()
  }, [params.page, params.limit])

  const columns: GridColumns<any> = useMemo(
    () => [
      {
        field: 'actions',
        type: 'actions',
        align: 'center',
        minWidth: 50,
        flex: 1,
        getActions: (params: GridRowParams) => [
          <JIcon
            name={'OpenEye'}
            onClick={() => {
              console.log(params)
            }}
            style={{
              cursor: 'pointer',
            }}
            key={params.id}
          />,
        ],
      },
      {
        field: 'createdAt',
        headerName: '일시',
        type: 'string',
        minWidth: 180,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        valueFormatter: ({ value }) =>
          dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        field: 'orderNumber',
        headerName: '주문 번호',
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
              sbkind={'pages/Commerce/Order/OrderDetail'}
              href={`${To.CommerceOrderList}/${cellParam.value}`}
            />
          )
        },
      },
      {
        field: 'userInfo',
        headerName: '회원 정보',
        type: 'string',
        minWidth: 140,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderCell: (cellParam) => {
          return (
            <div>
              <div>
                <LinkCell
                  title={cellParam.value?.userName}
                  cellInfo={cellParam}
                  target="_blank"
                  sbkind={'pages/Commerce/Member/Detail'}
                  href={`${To.CommerceMemberList}/${cellParam.value?.userId}`}
                />
              </div>
              <div>{cellParam.value?.phone}</div>
            </div>
          )
        },
      },
      {
        field: 'payStatus',
        headerName: '결제 상태',
        type: 'string',
        minWidth: 100,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        valueFormatter: ({ value }) => {
          return paymentStatusValueFormatter(value)
        },
      },
      {
        field: 'payMethod',
        headerName: '결제 방법',
        type: 'string',
        minWidth: 200,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        valueFormatter: (row) => {
          return paymentMethodValueFormatter(row)
        },
      },
      {
        field: 'amount',
        headerName: '금액',
        type: 'number',
        minWidth: 120,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        sortable: false,
        renderCell: (cellParam) => {
          return <NumberFormatCell cellInfo={cellParam} unit={'원'} />
        },
      },
      {
        field: 'reason',
        headerName: '결제 ID 및 실패/취소 사유',
        type: 'string',
        flex: 1,
        minWidth: 700,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderCell: ({ value }) => {
          return (
            <div
              style={{
                width: '100%',
              }}
            >
              <div>{value?.payId}</div>
              <div>{value?.msg}</div>
            </div>
          )
        },
      },
      {
        field: 'func',
        headerName: '기능',
        minWidth: 120,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <Link
              href={`${To.CommerceOrderList}/${row.orderNumber}`}
              target="_blank"
              color="primary"
              underline="hover"
            >
              <Typography variant={'subtitle2'}>재결제 안내</Typography>
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
          sortModel: [{ field: 'createdAt', sort: 'desc' }],
        },
      }}
    />
  )
}

export default PaymentDataGrid
