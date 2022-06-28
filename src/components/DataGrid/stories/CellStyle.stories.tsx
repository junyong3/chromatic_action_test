import { Meta, Story } from '@storybook/react'
import DataGrid from '@components/DataGrid/DataGrid'
import { GridCellParams } from '@mui/x-data-grid'
import { DataGridProps } from '@components/DataGrid/Props'
import { GridColDef } from '@mui/x-data-grid'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { dummyDataTs, fetchList } from '../FakerData/mockGridData'
import LinkCell from '@components/DataGrid/renderCell/LinkCell'
import { Box } from '@mui/material'

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
        headerAlign: 'center',
        headerName: '제목',
        flex: 1,
        renderCell: (params) => {
          return <LinkCell cellInfo={params} onCellClick={onClick} />
        },
      },
      {
        field: 'name',
        headerName: '이름',
        flex: 1,
        cellClassName: (params: GridCellParams<number>) => {
          const id = params.id
          if (id > 5) {
            return 'five-high'
          } else {
            return 'five-down'
          }
        },
      },
      {
        field: 'email',
        headerName: '메일',
        flex: 1,
        cellClassName: 'email',
      },
      { field: 'company', headerName: '회사', flex: 1 },
    ]
  }, [])

  return (
    <Box
      sx={{
        height: 300,
        width: '100%',
        '& .email': {
          backgroundColor: '#b9d5ff91',
          color: '#1a3e72',
        },
        '& .five-high': {
          backgroundColor: 'rgb(120,95,0)',
          color: '#ff8b00',
        },
        '& .five-down': {
          backgroundColor: 'rgb(186,24,24)',
          color: '#f7f9ff',
        },
      }}
    >
      <DataGrid {...args} rows={dataSet} columns={columns} />
    </Box>
  )
}
export default {
  title: 'components/MUI/DataGrid/CustomCell',
  component: DataGrid,
  argTypes: {
    density: {
      control: 'inline-radio',
      options: ['compact', 'comfortable', 'standard'],
    },
  },
} as Meta

export const CellStyle = Template.bind({})

CellStyle.args = {
  pageSize: 10,
  hideFooterPagination: false,
  density: 'compact',
  // getRowClassName: (params) => {
  //   console.log(params)
  //   return params
  // },
  // editMode: 'cell',
}
