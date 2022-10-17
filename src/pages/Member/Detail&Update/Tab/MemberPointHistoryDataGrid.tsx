import { useCallback, useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import {
  MemberPointHistoryDto,
  MemberPointHistoryListRes,
} from '@src/api/model/Commerce/member'
import { ListPagination } from '@api/model/Commerce/common'
import DataGrid from '@components/DataGrid'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'
import Typography from '@components/Typography'
import { useQueryWrap } from '@queries/useQuery'
import { useMemberPointStore } from '@src/stores/Commerce/Member/member.point.store'
import useMemberStore from '@src/stores/Commerce/Member/member.store'
import ExposeToggleDialog, {
  ToggleExposedDialogType,
} from '../Dialog&Modal/ToggleExposedDialog'
import { MemberQueryKey } from '@pages/Member/Props'

function MemberPointHistoryDataGrid({ memberId }: { memberId: string }) {
  const [setUsablePoint, setExpiringPoint] = useMemberPointStore((state) => [
    state.setUsablePoint,
    state.setExpiringPoint,
  ])

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const [rows, setRows] = useState<MemberPointHistoryDto[]>([])
  const { data, isLoading, refetch } = useQueryWrap<MemberPointHistoryListRes>(
    MemberQueryKey.dataGridPagination('pointHistoryList', params),
    () =>
      NetworkService.commerceMember.get<ListPagination>(
        COMMERCE_MEMBER_API_PATH.MEMBER_POINT_HISTORY(memberId),
        params
      )
  )
  useEffect(() => {
    setUsablePoint(data?.usablePoint ?? 0)
    setExpiringPoint(data?.expiringPoint ?? 0)
    if (data?.point) setRows(data?.point)
  }, [setUsablePoint, setExpiringPoint, refetch, data])

  const exposedToggle = useCallback((pointId: string, isExposed: boolean) => {
    useMemberStore.setState({
      exposeToggleTarget: {
        id: pointId,
        isExposed,
      },
      isExposeToggleDialogOpen: true,
    })
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'registerDate',
      headerName: '지급일시',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'reason',
      headerName: '사유',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      flex: 1,
      sortable: false,
    },
    {
      field: 'amount',
      headerName: '금액(원)',
      headerAlign: 'left',
      type: 'number',
      align: 'left',
      flex: 1,
      sortable: false,
    },
    {
      field: 'endDate',
      headerName: '소멸일시',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'manager',
      headerName: '담당자',
      headerAlign: 'left',
      type: 'string',
      align: 'left',
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
        const { pointId, manager, isExposed } = row
        return manager ? (
          <ButtonCell
            text={isExposed ? '숨김' : '노출'}
            color={isExposed ? 'error' : 'primary'}
            cellInfo={row}
            onCellClick={() => exposedToggle(pointId, isExposed)}
          />
        ) : null
      },
    },
  ]

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
            sortModel: [{ field: 'registerDate', sort: 'desc' }],
          },
        }}
        getRowId={({ pointId }) => pointId}
      />

      <ExposeToggleDialog
        type={ToggleExposedDialogType.POINT_HISTORY}
        refetchQuery={MemberQueryKey.pointHistoryList}
      />
    </>
  )
}

export default MemberPointHistoryDataGrid
