import { useEffect, useMemo, useState } from 'react'
import DataGrid from '@components/DataGrid'
import { useQueryWrap } from '@queries/useQuery'
import NetworkService from '@api/NetworkService'
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import useUpdateEffect from '@hooks/useUpdateEffect'
import dayjs from 'dayjs'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { To } from '@routes/To'
import { useCouponStore } from '@stores/Commerce/Coupon/coupon.store'
import { COMMERCE_COUPON_API_PATH } from '@api/path/Commerce/couponPath'
import {
  CouponDto,
  CouponListReq,
  CouponListRes,
} from '@api/model/Commerce/coupon'
import Chip from '@mui/material/Chip'
import Typography from '@components/Typography'
import { CouponQueryKey } from '../Props'

function CouponDataGrid() {
  const searchCondition = useCouponStore((state) => state.searchCondition)
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...searchCondition,
  })
  const [rows, setRows] = useState<CouponDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<CouponListRes>(
    CouponQueryKey.dataGridPagination('list', params),
    () =>
      NetworkService.commerce.get<CouponListReq>(
        COMMERCE_COUPON_API_PATH.COUPON_LIST,
        params
      )
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
        field: 'couponCode',
        headerName: '쿠폰코드',
        type: 'string',
        width: 125,
        headerAlign: 'left',
        align: 'left',
        renderCell: (row: GridRenderCellParams) => {
          return (
            <LinkCell
              title={row.value.couponCode}
              cellInfo={row}
              sbKind={'pages/Commerce/Coupon/CouponDetail'}
              href={`${To.CommerceCouponList}/${row.id}`}
            />
          )
        },
      },
      {
        field: 'couponName',
        type: 'string',
        width: 180,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
        renderHeader: () => {
          return (
            <div>
              <Typography variant={'subtitle2'}>관리자용 쿠폰명/</Typography>
              <Typography variant={'subtitle2'}>고객용 쿠폰명</Typography>
            </div>
          )
        },
        renderCell: (row: GridRenderCellParams) => {
          return (
            <div>
              <div>
                <LinkCell
                  title={row.value.internal}
                  cellInfo={row}
                  sbKind={'pages/Commerce/Coupon/CouponDetail'}
                  href={`${To.CommerceCouponList}/${row.id}`}
                />
              </div>
              <div>
                <LinkCell
                  title={row.value.customer}
                  cellInfo={row}
                  sbKind={'pages/Commerce/Coupon/CouponDetail'}
                  href={`${To.CommerceCouponList}/${row.id}`}
                />
              </div>
            </div>
          )
        },
      },
      {
        field: 'couponDuration',
        headerName: '사용 가능 기간',
        headerAlign: 'left',
        align: 'left',
        minWidth: 218,
        flex: 1,
        sortable: false,
        renderCell: ({ row: { couponDuration } }) => (
          <div>
            <div>
              <Chip
                label={'시작'}
                color="primary"
                size="small"
                sx={{ marginRight: '4px' }}
              />
              {dayjs(couponDuration.startDate).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div style={{ marginTop: '9px' }}>
              <Chip label={'종료'} size="small" sx={{ marginRight: '4px' }} />
              {dayjs(couponDuration.endDate).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
        ),
      },
      {
        field: 'couponType',
        headerName: '쿠폰종류',
        type: 'string',
        width: 100,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'benefitType',
        headerName: '혜택유형',
        type: 'string',
        width: 120,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'paymentMethod',
        headerName: '지급방식',
        type: 'string',
        width: 120,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'status',
        headerName: '상태',
        type: 'string',
        width: 90,
        headerAlign: 'left',
        align: 'left',
      },
      {
        field: 'createdDate',
        headerName: '등록일',
        type: 'string',
        width: 120,
        headerAlign: 'left',
        align: 'left',
      },
    ],
    []
  )

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      useMultiline={true}
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
  )
}

export default CouponDataGrid
