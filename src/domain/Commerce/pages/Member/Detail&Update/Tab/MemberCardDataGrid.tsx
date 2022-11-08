import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import Instance from '@api/Instance'
import { dummyDataTs } from '@components/DataGrid/FakerData/mockGridData'
import DataGrid from '@components/DataGrid'
import { useQueryWrap } from '@queries/useQuery'
import { MemberQueryKey } from '@domain/Commerce/pages/Member/Props'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import ButtonCell from '@components/DataGrid/renderCell/ButtonCell'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { useParams } from 'react-router-dom'
import { CardDto } from '@api/model/Commerce/payment'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryClient } from 'react-query'
import { useErrorStore } from '@stores/error.store'

function MemberCardDataGrid() {
  const { id: memberId } = useParams()
  const queryClient = useQueryClient()
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const {
    data: userCardList,
    isLoading,
    refetch,
  } = useQueryWrap<CardDto[]>(MemberQueryKey.cardList, () =>
    Instance.get(COMMERCE_PAYMENT_API_PATH.MEMBER_CREDIT_CARD, {
      userId: memberId,
    })
  )
  const { mutate: cardDelete } = useMutationWrap()
  const [rows, setRows] = useState<CardDto[]>([])
  const [selectRow, setSelectRow] = useState<CardDto>()
  const onRowClickHandler = (row: CardDto) => {
    setSelectRow(row)
  }

  useEffect(() => {
    if (userCardList) {
      // 가장 최근 날짜로 index 셋팅
      setRows(
        userCardList
          .sort((a, b) => {
            return dayjs(b.lastUsedAt).valueOf() - dayjs(a.lastUsedAt).valueOf()
          })
          .map((d, index) => {
            const data = d
            d.index = index + 1
            return data
          })
      )
    }
    return () => {
      LoadingService.close()
    }
  }, [refetch, userCardList])

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: 'index',
      headerAlign: 'left',
      align: 'left',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'cardId',
      headerAlign: 'left',
      align: 'left',
      hide: true,
    },
    {
      field: 'userId',
      headerName: 'userId',
      headerAlign: 'left',
      align: 'left',
      hide: true,
    },
    {
      field: 'cardName',
      headerName: '카드 별명(뒷 4자리)',
      headerAlign: 'left',
      align: 'left',
      minWidth: 180,
      flex: 1,
      sortable: false,
      valueFormatter: (row) => {
        const rowData = row.api.getRow(row.id)
        return row.value + `(${rowData.last4Digits})`
      },
    },
    {
      field: 'company',
      headerName: '카드사',
      headerAlign: 'left',
      align: 'left',
      minWidth: 130,
      flex: 1,
      sortable: false,
    },
    {
      field: 'type',
      headerName: '종류',
      headerAlign: 'left',
      align: 'left',
      minWidth: 60,
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => (value === 'check' ? '체크' : '신용'),
    },
    {
      field: 'expirationDt',
      headerName: '유효기간',
      headerAlign: 'left',
      align: 'left',
      minWidth: 100,
      flex: 1,
      sortable: false,
      valueFormatter: (row) => {
        const val = row.value.replace('-', '')
        return val.slice(4, 6) + '/' + val.slice(2, 4)
      },
    },
    {
      field: 'createdAt',
      headerName: '등록 일시',
      headerAlign: 'left',
      align: 'left',
      minWidth: 210,
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'lastUsedAt',
      headerName: '마지막 사용 일시',
      headerAlign: 'left',
      align: 'left',
      minWidth: 210,
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'func',
      headerName: '기능',
      flex: 1,
      renderCell: (params: GridRenderCellParams<dummyDataTs>) => {
        const deleteClick = () => {
          setIsDeleteDialog(true)
        }
        return (
          <ButtonCell
            data-cy={'cardDelete'}
            text={'삭제'}
            color={'error'}
            cellInfo={params}
            onCellClick={deleteClick}
          />
        )
      },
      sortable: false,
    },
  ]
  const onClickDeleteCard = () => {
    LoadingService.show()
    setIsDeleteDialog(false)

    cardDelete(
      Instance.delete(
        COMMERCE_PAYMENT_API_PATH.MEMBER_CREDIT_CARD + `/${selectRow?.id}`
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.DELETE_CARD)
          queryClient.invalidateQueries(MemberQueryKey.cardList)
        },
        onError: () => {
          // const code = response?.data.code
          useErrorStore.setState({
            isSystemError: true,
          })
        },
        onSettled: () => {
          setIsDeleteDialog(false)
          LoadingService.close()
        },
      }
    )
  }

  return (
    <Box>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        rowCount={userCardList?.length || 0}
        onRowClick={(r: GridRowParams<CardDto>) => {
          onRowClickHandler(r.row)
        }}
        pageSize={5}
        rowThreshold={5}
        loading={isLoading}
        initialState={{
          sorting: {
            sortModel: [{ field: 'index', sort: 'asc' }],
          },
        }}
      />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 카드를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button data-cy={'dialogDeleteButton'} onClick={onClickDeleteCard}>
              카드 삭제
            </Button>
          </>
        }
      />
    </Box>
  )
}

export default MemberCardDataGrid
