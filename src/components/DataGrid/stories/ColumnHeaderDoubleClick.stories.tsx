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
import { action } from '@storybook/addon-actions'

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

  /*
   function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void
   * */
  return (
    <DataGridWrap>
      <DataGrid
        {...args}
        onColumnHeaderDoubleClick={action('onColumnHeaderDoubleClick')}
        rows={dataSet}
        columns={columns}
      />
    </DataGridWrap>
  )
}
export default {
  title: 'components/MUI/DataGrid/Event/ColumnHeaderDoubleClick',
  component: DataGrid,

  argTypes: {
    density: {
      control: 'inline-radio',
      options: ['compact', 'comfortable', 'standard'],
    },
  },
} as Meta

export const ColumnHeaderDoubleClick = Template.bind({})

ColumnHeaderDoubleClick.args = {
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
