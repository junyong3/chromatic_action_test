import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'
import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import { DataGridWrap } from '@components/DataGrid/StyleObj'

const Template: Story<DataGridProps> = (args: DataGridProps) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1, hide: true },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'email', headerName: '메일', flex: 1 },
    { field: 'company', headerName: '회사', flex: 1, sortable: false },
    { field: 'title', headerName: '제목', flex: 1 },
  ]

  return (
    <DataGridWrap>
      <DataGrid {...args} rows={[]} columns={columns} />
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

export const NoData = Template.bind({})

NoData.args = {
  pageSize: 10,
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
