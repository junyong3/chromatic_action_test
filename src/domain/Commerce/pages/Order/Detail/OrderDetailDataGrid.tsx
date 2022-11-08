import DataGrid from '@components/DataGrid'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { GridColumns } from '@mui/x-data-grid'
import { useEffect, useMemo, useState } from 'react'
import useUpdateEffect from '@hooks/useUpdateEffect'
import dayjs from 'dayjs'
import NumberFormatCell from '@components/DataGrid/renderCell/NumberFormatCell'
import useOrderStore from '@stores/Commerce/Order/order.store'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { NoticeDto, NoticeListRes } from '@api/model/Commerce/notice'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'

function OrderDetailDataGrid() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const [rows, setRows] = useState<NoticeDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<NoticeListRes>(
    ['orderHistory', params, useOrderStore.getState().isCancelView],
    () => Instance.get(COMMERCE_PAYMENT_API_PATH.PAYMENT_HISTORY_LIST, params)
  )

  useEffect(() => {
    if (data?.items) {
      setRows(data?.items)
    }
  }, [refetch, data])
  useUpdateEffect(() => {
    refetch()
  }, [params.page, params.limit])

  const { setCancelView } = useOrderStore()

  const columns: GridColumns<any> = useMemo(
    () => [
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
        field: 'payStatus',
        headerName: '결제 상태',
        type: 'string',
        minWidth: 100,
        flex: 1,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        valueFormatter: ({ value }) => {
          let cellTxt = ''
          switch (value) {
            case 'complete':
              cellTxt = '결제 완료'
              break
            case 'fail':
              cellTxt = '결제 실패'
              break
            case 'allCancel':
              cellTxt = '전체 취소'
              break

            case 'partialCancel':
              cellTxt = '부분 취소'
              break
            case 'completeRefunds':
              cellTxt = '환급 완료'
              break
            default:
              cellTxt = 'error'
          }
          return cellTxt
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
      },
      {
        field: 'amount',
        headerName: '금액',
        type: 'string',
        minWidth: 120,
        flex: 1,
        headerAlign: 'right',
        align: 'right',
        sortable: false,
        renderCell: (params) => {
          return <NumberFormatCell cellInfo={params} unit={'원'} />
        },
      },
      {
        field: 'reason',
        headerName: '결제 ID 및 실패/취소 사유',
        type: 'string',
        minWidth: 370,
        flex: 1,
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
              <div
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {value?.msg}
              </div>
            </div>
          )
        },
      },
      {
        field: 'func',
        headerName: '기능',
        minWidth: 100,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          const status = row.payStatus
          // const payMethod = row.payMethod
          return (
            <>
              {status === 'complete' ? (
                <ButtonCell
                  text={'결제 취소'}
                  color={'error'}
                  cellInfo={row}
                  onCellClick={() => {
                    // cancelReset()
                    useOrderStore.setState({
                      selectRowData: row,
                    })
                    setCancelView(true)
                    // useOrderStore.setState({
                    //   isCancelView: true,
                    // })
                  }}
                />
              ) : null}
            </>
          )
        },
      },
    ],
    [setCancelView]
  )

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={data?.total || 0}
      page={params.page - 1}
      pageSize={10}
      rowThreshold={10}
      autoHeight={false}
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

export default OrderDetailDataGrid
