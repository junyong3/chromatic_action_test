import { useEffect, useMemo, useState } from 'react'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import { COMMERCE_POINT_API_PATH } from '@api/path/Commerce/pointPath'
import { PointDto, PointListReq, PointListRes } from '@api/model/Commerce/point'
import useUpdateEffect from '@hooks/useUpdateEffect'
import DataGrid from '@components/DataGrid'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { usePointStore } from '@stores/Commerce/Point/point.store'
import { NumberCommaFormat } from '@utils/common'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'
import PaymentFailDetailDialog from '@domain/Commerce/pages/Point/Dialog/PaymentFailDetailDialog'
import FileDeleteConfirmDialog from '@domain/Commerce/pages/Point/Dialog/FileDeleteConfirmDialog'

function PointDataGrid() {
  const [
    searchCondition,
    setIsPaymentFailDetailDialog,
    setIsPaymentDeleteDialog,
  ] = usePointStore((state) => [
    state.searchCondition,
    state.setIsPaymentFailDetailDialog,
    state.setIsPaymentDeleteDialog,
  ])

  const [params, setParams] = useState({
    searchCondition: searchCondition,
    page: 1,
    limit: 10,
  })
  const [rows, setRows] = useState<PointDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<PointListRes>(
    ['pointList', params],
    () => Instance.get<PointListReq>(COMMERCE_POINT_API_PATH.POINT_LIST, params)
  )

  useEffect(() => {
    if (data?.items) setRows(data?.items)
  }, [refetch, data])
  useUpdateEffect(() => {
    void refetch()
  }, [searchCondition, params.page, params.limit])

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
        field: 'registrationDate',
        headerName: '등록 날짜',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        valueFormatter: ({ value }) => {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        field: 'registrationFileName',
        headerName: '등록 파일명',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
      },
      {
        field: 'paymentStartDate',
        headerName: '지급 시작일시',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        valueFormatter: ({ value }) => {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        field: 'createdName',
        headerName: '생성자',
        type: 'string',
        width: 120,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'status',
        headerName: '상태',
        type: 'string',
        width: 120,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'paymentResult',
        headerName: '지급 결과',
        type: 'string',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        renderCell: (row: GridRenderCellParams) => {
          return (
            <div>
              성공 {NumberCommaFormat(row.value.success)}명<br />
              <LinkCell
                title={`실패 ${NumberCommaFormat(row.value.fail)}명`}
                cellInfo={row}
                onCellClick={() => {
                  setIsPaymentFailDetailDialog(true, row.id)
                }}
              />
            </div>
          )
        },
      },
      {
        field: 'func',
        headerName: '기능',
        flex: 1,
        sortable: false,
        renderCell: (row: GridRenderCellParams) => {
          const onClickDeleteRow = () => {
            setIsPaymentDeleteDialog(true, row.id)
          }

          const isStart = dayjs(row.row.paymentStartDate).isBefore(dayjs())

          return (
            <ButtonCell
              text={'삭제'}
              color={'error'}
              cellInfo={row}
              onCellClick={onClickDeleteRow}
              disabled={isStart}
            />
          )
        },
      },
    ],
    [setIsPaymentDeleteDialog, setIsPaymentFailDetailDialog]
  )

  return (
    <>
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
            sortModel: [{ field: 'registrationDate', sort: 'desc' }],
          },
        }}
      />

      <PaymentFailDetailDialog />
      <FileDeleteConfirmDialog />
    </>
  )
}

export default PointDataGrid
