import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { dummyDataTs, fetchList } from '../FakerData/mockGridData'
import ButtonCell from '../renderCell/ButtonCell'

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

  const columns: GridColDef<dummyDataTs>[] = useMemo(() => {
    return [
      { field: 'id', headerName: 'Id', flex: 1 },
      {
        field: 'title',
        headerName: '수정 버튼',
        headerAlign: 'center',
        flex: 1,
        align: 'center',
        renderCell: (params: GridRenderCellParams<dummyDataTs>) => {
          return (
            <ButtonCell text={'수정'} cellInfo={params} onCellClick={onClick} />
          )
        },
      },
      { field: 'name', headerName: '이름', flex: 1 },
      { field: 'email', headerName: '메일', flex: 1 },
      { field: 'company', headerName: '회사', flex: 1 },
    ]
  }, [onClick])

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

export const CellButton = Template.bind({})

CellButton.args = {
  pageSize: 10,
  hideFooterPagination: false,
  density: 'compact',
  // getRowClassName: (params) => {
  //   console.log(params)
  //   return params
  // },
  // editMode: 'cell',
}
