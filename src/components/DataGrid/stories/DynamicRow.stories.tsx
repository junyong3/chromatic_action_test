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
    { field: 'id', headerName: 'Id', flex: 1, hide: true },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'content', headerName: 'json', flex: 1 },
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
  title: 'components/MUI/DataGrid/Row',
  component: DataGrid,
  argTypes: {},
} as Meta

export const DynamicRowHeight = Template.bind({})

DynamicRowHeight.args = {
  pageSize: 10,
  hideFooterPagination: false,
  // getEstimatedRowHeight: () => 200,
  getRowHeight: () => 'auto',
  sx: {
    '& .MuiDataGrid-cell': {
      py: '8px',
    },
  },
  // ,getRowHeight: ({ id, densityFactor }: GridRowHeightParams) => {
  //   if ((id as number) % 2 === 0) {
  //     return 100 * densityFactor
  //   }
  //
  //   return null
  // },
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
