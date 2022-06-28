import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'

import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'
import dayjs from 'dayjs'
import LinearProgressBar from '@components/DataGrid/renderComponent/LinearProgressBar'
import { LinearProgress } from '@mui/material'

const Template: Story<DataGridProps> = (args: DataGridProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataSet, setDataSet] = useState<dummyDataTs[]>([])

  useEffect(() => {
    setIsLoading(false)
  }, [dataSet])

  useEffect(() => {
    setIsLoading(true)
    async function dataCall() {
      const data = await fetchList<dummyDataTs>(3000)
      setDataSet(data)
    }
    dataCall()
  }, [])
  const dateFormat = (params: any, format = 'YYYY-MM-DD') => {
    return dayjs(params.row.date).format(format)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'krw', headerName: 'KRW', type: 'number', flex: 1 },
    {
      field: 'formatDate',
      headerName: 'DateFormat',
      flex: 1,
      valueGetter: (params) => {
        return dateFormat(params, 'YYYY-MM-DD HH:mm:ss')
      },
    },
  ]

  return (
    <DataGrid
      {...args}
      rows={dataSet}
      columns={columns}
      loading={isLoading}
      components={{
        LoadingOverlay: LinearProgress,
      }}
    />
  )
}
export default {
  title: 'components/MUI/DataGrid',
  component: DataGrid,
  argTypes: {
    density: {
      control: 'inline-radio',
      options: ['compact', 'comfortable', 'standard'],
    },
  },
} as Meta

export const LoadingProgressBar = Template.bind({})

LoadingProgressBar.args = {
  pageSize: 10,
  hideFooterPagination: false,
  loading: false,
  autoHeight: true,
  autoPageSize: false,
  checkboxSelection: false,
  disableColumnFilter: false,
  disableColumnMenu: false,
  disableVirtualization: false,
  disableColumnSelector: false,
  disableSelectionOnClick: false,
  disableDensitySelector: false,
  disableExtendRowFullWidth: false,
  density: 'compact',
  // getRowClassName: (params) => {
  //   console.log(params)
  //   return params
  // },
  // editMode: 'cell',
}
