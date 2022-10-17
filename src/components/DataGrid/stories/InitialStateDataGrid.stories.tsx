import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'

import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { DataGridWrap } from '@components/DataGrid/StyleObj'
import {
  dummyDataTs,
  fetchList,
} from '@components/DataGrid/FakerData/mockGridData'

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
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'email', headerName: '메일', flex: 1 },
    { field: 'company', headerName: '회사', flex: 1 },
    { field: 'title', headerName: '제목', flex: 1 },
  ]

  return (
    <DataGridWrap>
      <DataGrid {...args} rows={dataSet} columns={columns} />
    </DataGridWrap>
  )
}
export default {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  title: 'components/MUI/DataGrid',
  component: DataGrid,
  argTypes: {
    density: {
      control: 'inline-radio',
      options: ['compact', 'comfortable', 'standard'],
    },
  },
} as Meta

export const InitialState = Template.bind({})

InitialState.args = {
  initialState: {
    pagination: {
      pageSize: 5,
    },
    sorting: {
      sortModel: [{ field: 'name', sort: 'asc' }],
    },
  },
  hideFooterPagination: false,
  density: 'compact',
  loading: false,
  autoHeight: false,
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
