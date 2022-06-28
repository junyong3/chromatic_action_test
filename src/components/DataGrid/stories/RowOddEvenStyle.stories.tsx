import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'

import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'
import { Box } from '@mui/material'

const Template: Story<DataGridProps> = (args: DataGridProps) => {
  const [dataSet, setDataSet] = useState<dummyDataTs[]>([])

  useEffect(() => {
    async function dataCall() {
      const data = await fetchList<dummyDataTs>(50)
      setDataSet(data)
    }
    dataCall()
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, hide: true },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'email', headerName: '메일', flex: 1 },
    { field: 'company', headerName: '회사', flex: 1 },
    { field: 'title', headerName: '제목', flex: 1 },
    { field: 'gender', headerName: '성별', width: 100 },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        '& .odd': {
          bgcolor: (theme) => '#e2e3e1',
        },
        '& .even': {
          bgcolor: (theme) => '#808080',
        },
      }}
    >
      <DataGrid {...args} rows={dataSet} columns={columns} />
    </Box>
  )
}
export default {
  title: 'components/MUI/DataGrid/Row',
  component: DataGrid,
  argTypes: {},
} as Meta

export const RowOddEvenStyle = Template.bind({})

RowOddEvenStyle.args = {
  pageSize: 10,
  hideFooterPagination: false,
  getRowClassName: (params) => {
    console.log(params)
    return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
  },
  rowHeight: 30,
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
  hideFooter: false,
  hideFooterSelectedRowCount: false,

  // getRowClassName: (params) => {
  //   console.log(params)
  //   return params
  // },
  // editMode: 'cell',
}
