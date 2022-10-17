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
        '& .custom-row-Male': {
          bgcolor: (theme) => '#45d081',
        },
      }}
    >
      <DataGrid {...args} rows={dataSet} columns={columns} />
    </Box>
  )
}
export default {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  title: 'components/MUI/DataGrid/Row',
  component: DataGrid,
  argTypes: {},
} as Meta

export const RowStyle = Template.bind({})

RowStyle.args = {
  pageSize: 10,
  hideFooterPagination: false,
  getRowClassName: (params) => `custom-row-${params.row.gender}`,
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
