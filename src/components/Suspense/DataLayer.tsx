import DataGrid from '@components/DataGrid'
import { useEffect, useState } from 'react'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery, UseQueryResult } from 'react-query'

const useDummyQuery = () => {
  const { data }: UseQueryResult<dummyDataTs[], Error> = useQuery<
    dummyDataTs[],
    Error
  >(['Suspense'], () => fetchList<dummyDataTs>(3000), {
    refetchOnWindowFocus: true,
    suspense: true,
    useErrorBoundary: true,
  })

  return data ?? []
}
const DataLayer = () => {
  const dataSet = useDummyQuery()
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, hide: true },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'email', headerName: '메일', flex: 1 },
    { field: 'company', headerName: '회사', flex: 1, sortable: false },
    { field: 'title', headerName: '제목', flex: 1 },
  ]
  return <DataGrid rows={dataSet} columns={columns} />
}

export default DataLayer
