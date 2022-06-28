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

const Template: Story<DataGridProps> = (args: DataGridProps) => {
  const [dataSet, setDataSet] = useState<dummyDataTs[]>([])

  useEffect(() => {
    async function dataCall() {
      const data = await fetchList<dummyDataTs>(500)
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
    { field: 'krw', headerName: 'KRW', flex: 1 },
    {
      field: 'krw2',
      headerName: 'KRW2',
      flex: 1,
      type: 'number',
      valueGetter: (params) => {
        return params.row.krw
      },
    },
    { field: 'date', headerName: '날짜', flex: 1 },
    {
      field: 'formatDate',
      headerName: 'DateFormat',
      flex: 1,
      valueGetter: (params) => {
        return dateFormat(params, 'YYYY-MM-DD HH:mm:ss')
      },
    },
  ]

  return <DataGrid {...args} rows={dataSet} columns={columns} />
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

export const ValueFormatter = Template.bind({})

ValueFormatter.args = {
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
