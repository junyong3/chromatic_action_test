import FormModal from '@components/Modal/FormModal'
import React, {
  forwardRef,
  useEffect,
  Ref,
  useState,
  useImperativeHandle,
} from 'react'
import { useForm } from 'react-hook-form'
import { Box, Grid, IconButton, InputBase, Link, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import DataGrid from '@components/DataGrid'
import { useQueryWrap } from '@queries/useQuery'
import useUpdateEffect from '@hooks/useUpdateEffect'
import { getAddress, jusoDto, jusoRes, params } from '@api/Instance/JusoAPi'
import useAlertDialog from '@components/Dialog/hooks/useAlertDialog'
import usePostCodeStore from '@stores/postCode.store'
import shallow from 'zustand/shallow'
import { JusoCodePopUpProps } from '@components/PopupPostCode/Props'

function JusoCodePopUp(props: any, ref: Ref<JusoCodePopUpProps>) {
  const [isJusoPopup, setIsJusoPopup] = useState(false)
  useImperativeHandle(ref, () => ({
    open: () => setIsJusoPopup(true),
  }))
  const formContext = useForm<{ searchAddress: string }>({
    mode: 'onBlur',
    defaultValues: {
      searchAddress: '',
    },
  })
  const [setKeyword] = usePostCodeStore((state) => [state.setKeyword], shallow)
  const [alertInput, setAlertInput] = useState({
    addTitle: '확인',
    addContent: ' ',
  })
  const { AlertOpen, AlertComp } = useAlertDialog(alertInput)
  const onSubmit = formContext.handleSubmit((data) => {
    const validCheck = checkSearchedWord(data.searchAddress)
    if (validCheck.isPass) {
      setKeyword(data.searchAddress)
    } else {
      // alert창 보여주기
      setAlertInput((prevState) => {
        return {
          ...prevState,
          addContent: validCheck.alertContent,
        }
      })
      AlertOpen(true)
    }
  })
  return (
    <FormModal
      size={'md'}
      open={isJusoPopup}
      title={'주소 검색(도로명)'}
      onClose={() => {
        setIsJusoPopup(false)
      }}
      methods={formContext}
      onSubmit={onSubmit}
      content={
        <Grid
          container
          direction="column"
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
        >
          <Grid item xs={12}>
            <Stack
              direction="row"
              sx={{
                width: '852px',
                border: '1px solid black',
              }}
              px={2}
              mb={3}
            >
              <InputBase
                {...formContext.register('searchAddress', { required: true })}
                fullWidth
                placeholder="도로명 주소를 입력해주세요."
                inputProps={{ 'aria-label': '도로명 주소를 입력해주세요.' }}
                id="searchAddress"
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    ev.preventDefault()
                    void onSubmit()
                  }
                }}
              />
              <IconButton
                onClick={() => {
                  void onSubmit()
                }}
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ height: '400px', overflow: 'auto' }}>
              <JusoDtaGrid setIsJusoPopup={setIsJusoPopup} />
            </Box>
          </Grid>
          <AlertComp />
        </Grid>
      }
    />
  )
}

function JusoDtaGrid(props: { setIsJusoPopup: (isOpen: boolean) => void }) {
  const { setIsJusoPopup } = props
  const [keyword, setJusoPostCode] = usePostCodeStore(
    (state) => [state.keyword, state.setJusoPostCode],
    shallow
  )
  const [params, setParams] = useState<params>({
    confmKey: 'devU01TX0FVVEgyMDIyMTEwMTA5NDIzNDExMzE2NjA=',
    addInfoYn: 'Y',
    keyword: '',
    resultType: 'json',
    currentPage: 1,
    countPerPage: 50,
  })
  const { data, isLoading, refetch } = useQueryWrap<jusoRes>(
    ['jusoList', params],
    () => getAddress(params),
    {
      enabled: !!params.keyword,
    }
  )
  const [rows, setRows] = useState<jusoDto[]>([])

  useEffect(() => {
    setParams((prevState) => {
      return { ...prevState, keyword }
    })
  }, [keyword])

  useEffect(() => {
    if (data?.results) {
      setRows(data?.results.juso || [])
    }
  }, [refetch, data?.results])
  useUpdateEffect(() => {
    refetch()
  }, [params.currentPage, params.countPerPage])

  const columns: GridColDef<jusoDto>[] = [
    {
      field: 'No',
      headerName: 'No',
      headerAlign: 'center',
      align: 'center',
      minWidth: 20,
      flex: 1,
      sortable: false,
    },
    {
      field: 'Addr',
      headerName: '주소',
      headerAlign: 'center',
      align: 'left',
      minWidth: 290,
      flex: 10,
      sortable: false,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Stack
            direction="column"
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setJusoPostCode(row)
              setIsJusoPopup(false)
            }}
          >
            <div>
              <Link color="primary" underline="hover">
                [도로명]: {row.roadAddr}
              </Link>
            </div>
            <div>
              <Link color="primary" underline="none">
                [지번]: {row.jibunAddr}
              </Link>
            </div>
          </Stack>
        )
      },
    },
    {
      field: 'zipNo',
      headerName: '우편번호',
      headerAlign: 'center',
      align: 'center',
      minWidth: 90,
      flex: 2,
      sortable: false,
    },
  ]
  return (
    <>
      <DataGrid
        getRowId={(row) => row.No}
        rows={rows}
        density={'comfortable'}
        columns={columns}
        rowCount={Number(data?.results?.common?.totalCount || 0)}
        page={Number(data?.results?.common?.currentPage || 1) - 1}
        useMultiline
        pageSize={50}
        rowThreshold={50}
        loading={isLoading}
        paginationMode={'server'}
        pageSizeChangeEvent={(pageSize: number) => {
          setParams((prevState) => {
            return { ...prevState, countPerPage: pageSize }
          })
        }}
        onPageChange={(page: number) => {
          setParams((prevState) => {
            return { ...prevState, currentPage: page + 1 }
          })
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
      />
    </>
  )
}

export default forwardRef(JusoCodePopUp)

const checkSearchedWord = (inputKeyWord: string) => {
  if (inputKeyWord.length > 0) {
    //특수문자 제거
    const expText = /[%=><]/
    if (expText.test(inputKeyWord) == true) {
      return {
        isPass: false,
        alertContent: '특수문자를 입력 할수 없습니다.',
      }
    }

    //특정문자열(sql예약어의 앞뒤공백포함) 제거
    const sqlArray = [
      //sql 예약어
      'OR',
      'SELECT',
      'INSERT',
      'DELETE',
      'UPDATE',
      'CREATE',
      'DROP',
      'EXEC',
      'UNION',
      'FETCH',
      'DECLARE',
      'TRUNCATE',
    ]

    let regex
    for (let i = 0; i < sqlArray.length; i++) {
      regex = new RegExp(sqlArray[i], 'gi')

      if (regex.test(inputKeyWord)) {
        return {
          isPass: false,
          alertContent: `"${sqlArray[i]}" 와(과) 같은 특정문자로 검색할 수 없습니다.`,
        }
      }
    }
  }
  return {
    isPass: true,
    alertContent: '',
  }
}
