import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'

import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { dummyDataTs, fetchList } from '../FakerData/mockGridData'
import IconCell from '@components/DataGrid/renderCell/IconCell'
import { JIconType } from '@components/JIcon/JIcon'

const Template: Story<DataGridProps> = (args: DataGridProps) => {
  const [dataSet, setDataSet] = useState<dummyDataTs[]>([])

  useEffect(() => {
    async function dataCall() {
      const data = await fetchList<dummyDataTs>(1000)
      setDataSet(data)
    }
    dataCall()
  }, [])

  const onClick = useCallback((row: any) => {
    console.log(row)
  }, [])

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: 'id', headerName: 'Id', flex: 1 },
      {
        field: 'title',
        headerName: '알람 on/off',
        flex: 1,
        renderCell: (params) => {
          return (
            <IconCell
              iconName={'Alarm'}
              fill={'black'}
              cellInfo={params}
              onCellClick={onClick}
            />
          )
        },
      },
      { field: 'name', headerName: '이름', flex: 1 },
      { field: 'email', headerName: '메일', flex: 1 },
      { field: 'company', headerName: '회사', flex: 1 },
    ]
  }, [])

  return <DataGrid {...args} rows={dataSet} columns={columns} />
}
export default {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  title: 'components/MUI/DataGrid/CustomCell',
  component: DataGrid,
  argTypes: {
    density: {
      control: 'inline-radio',
      options: ['compact', 'comfortable', 'standard'],
    },
  },
} as Meta

export const CellIcon = Template.bind({})

CellIcon.args = {
  pageSize: 10,
  hideFooterPagination: false,
  density: 'compact',
  // getRowClassName: (params) => {
  //   console.log(params)
  //   return params
  // },
  // editMode: 'cell',
}
