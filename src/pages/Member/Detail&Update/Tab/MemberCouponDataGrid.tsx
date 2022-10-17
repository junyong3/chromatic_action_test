import { useCallback, useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { Box, Chip, Link, Stack } from '@mui/material'
import dayjs from 'dayjs'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import {
  MemberCouponDto,
  MemberCouponListRes,
} from '@src/api/model/Commerce/member'
import DataGrid from '@components/DataGrid'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'
import { ListPagination } from '@api/model/Commerce/common'
import { To } from '@routes/To'
import useMemberStore from '@src/stores/Commerce/Member/member.store'
import ExposeToggleDialog, {
  ToggleExposedDialogType,
} from '../Dialog&Modal/ToggleExposedDialog'
import { MemberQueryKey } from '@pages/Member/Props'

function MemberCouponDataGrid({ memberId }: { memberId: string }) {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const { data, isLoading, refetch } = useQueryWrap<MemberCouponListRes>(
    MemberQueryKey.dataGridPagination('couponList', params),
    () =>
      NetworkService.commerceMember.get<ListPagination>(
        COMMERCE_MEMBER_API_PATH.MEMBER_COUPON(memberId),
        params
      )
  )
  const [rows, setRows] = useState<MemberCouponDto[]>([])
  useEffect(() => {
    if (data?.coupon) setRows(data?.coupon)
  }, [refetch, data])

  const exposedToggle = useCallback((couponId: string, isExposed: boolean) => {
    useMemberStore.setState({
      exposeToggleTarget: {
        id: couponId,
        isExposed,
      },
      isExposeToggleDialogOpen: true,
    })
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'couponName',
      headerName: '쿠폰명',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: 'couponType',
      headerName: '쿠폰 종류',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 110,
      flex: 1,
      sortable: false,
    },
    {
      field: 'benefitType',
      headerName: '혜택 유형',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 110,
      flex: 1,
      sortable: false,
    },
    {
      field: 'paymentMethod',
      headerName: '지급 방식',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 110,
      flex: 1,
      sortable: false,
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
      field: 'issuedDate',
      headerName: '발급일시',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 170,
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'used',
      headerName: '사용 여부',
      headerAlign: 'left',
      type: 'boolean',
      align: 'left',
      minWidth: 215,
      flex: 1,
      sortable: false,
      renderCell: ({
        row: {
          couponDuration: { endDate },
          used,
        },
      }) => {
        return used ? (
          <Stack direction={'row'} spacing={'4px'}>
            <Chip label={'사용'} color="primary" size="small" />
            <Box sx={{ lineHeight: '24px' }}>
              {dayjs(used.usedDate).format('YYYY-MM-DD HH:mm:ss')}
              <br />
              <Link
                data-sb-kind={'pages/Commerce/Order/OrderDetail'}
                href={`${To.CommerceOrderList}/${used.orderNumber}`}
                target="_blank"
                color="primary"
                underline="hover"
                sx={{ marginTop: '3px' }}
              >
                주문번호{used.orderNumber}
              </Link>
            </Box>
          </Stack>
        ) : dayjs().diff(dayjs(endDate)) > 0 ? (
          <Chip label={'기간만료'} size="small" />
        ) : (
          <Chip color="success" label={'미사용'} size="small" />
        )
      },
    },
    {
      field: 'manager',
      headerName: '담당자',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      minWidth: 100,
      flex: 1,
      sortable: false,
      renderCell: ({ row: { manager } }) => (
        <Typography variant={'body2'}>
          {!manager ? (
            '시스템'
          ) : (
            <>
              {manager.team}
              <br />
              {manager.name}
            </>
          )}
        </Typography>
      ),
    },
    {
      field: 'func',
      headerName: '기능',
      sortable: false,
      headerAlign: 'left',
      align: 'left',
      renderCell: ({ row }) => {
        const { couponId, used, isExposed } = row
        return !used ? (
          <ButtonCell
            text={isExposed ? '숨김' : '노출'}
            color={isExposed ? 'error' : 'primary'}
            cellInfo={row}
            onCellClick={() => exposedToggle(couponId, isExposed)}
          />
        ) : null
      },
    },
  ]

  return (
    <>
      <DataGrid
        getRowId={({ couponId }) => couponId}
        rows={rows}
        columns={columns}
        useMultiline={true}
        rowCount={data?.total || 0}
        page={params.page - 1}
        pageSize={10}
        rowThreshold={10}
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
            sortModel: [{ field: 'startDate', sort: 'desc' }],
          },
        }}
      />

      <ExposeToggleDialog
        type={ToggleExposedDialogType.COUPON}
        refetchQuery={MemberQueryKey.couponList}
      />
    </>
  )
}

export default MemberCouponDataGrid
