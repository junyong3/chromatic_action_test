import ReactECharts from 'echarts-for-react'
import { ChartWarp } from '@components/Chart/StyleObj'
import { BaseLineChartProps } from '@components/Chart/Props'
import NoDataBoundary from '@components/NoDataBoundary/NoDataBoundary'
import { useEffect, useRef, useState } from 'react'

function BaseLineChart(props: BaseLineChartProps) {
  const { name, dataSet } = props
  const [options, setOptions] = useState<any>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  })
  useEffect(() => {
    setOptions({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    })
  }, [])

  // const [options, setOptions] = useState({
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [120, 200, 150, 80, 70, 110, 130],
  //       type: 'bar',
  //     },
  //   ],
  // })
  //
  // useEffect(() => {
  //   setOptions((prevState) => {
  //     prevState.series[0].data = dataSet || []
  //     return prevState
  //   })
  // }, [dataSet])

  return (
    <ChartWarp>
      <NoDataBoundary dataSet={dataSet || null} msgKey={'noMsg'}>
        <ReactECharts
          option={options}
          notMerge={true}
          lazyUpdate={false}
          style={{ height: '100%', width: '100%' }}
        />
      </NoDataBoundary>
    </ChartWarp>
  )
}

export default BaseLineChart
