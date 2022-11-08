import { rest } from 'msw'
import { LOCATION_API_PATH as API } from '@api/path/MDM/Config/locationPath'

const locationDataSet = [
  {
    locationCode: 'L0001',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0001',
    areaName: '수산',
    warehouseCode: 'W0001',
    warehouseName: '창고-1',
    factoryCode: 'B001',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0002',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0002',
    areaName: '수산',
    warehouseCode: 'W0002',
    warehouseName: '창고-2',
    factoryCode: 'B002',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0003',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0003',
    areaName: '수산',
    warehouseCode: 'W0003',
    warehouseName: '창고-3',
    factoryCode: 'B003',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0004',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0004',
    areaName: '수산',
    warehouseCode: 'W0004',
    warehouseName: '창고-4',
    factoryCode: 'B0012',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0005',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0005',
    areaName: '수산',
    warehouseCode: 'W0005',
    warehouseName: '창고-5',
    factoryCode: 'B004',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0006',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0006',
    areaName: '수산',
    warehouseCode: 'W0006',
    warehouseName: '창고-6',
    factoryCode: 'B005',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0007',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0007',
    areaName: '수산',
    warehouseCode: 'W0007',
    warehouseName: '창고-7',
    factoryCode: 'B006',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0008',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A008',
    areaName: '수산',
    warehouseCode: 'W0001',
    warehouseName: '창고-8',
    factoryCode: 'B007',
    factoryName: '백오피스',
    keepType: 'frozen',
    memo: '메모하세요',
    useYN: false,
  },
  {
    locationCode: 'L0009',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A009',
    areaName: '수산',
    warehouseCode: 'W0008',
    warehouseName: '창고-9',
    factoryCode: 'B008',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0010',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0010',
    areaName: '수산',
    warehouseCode: 'W0009',
    warehouseName: '창고',
    factoryCode: 'B009',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0011',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0011',
    areaName: '수산',
    warehouseCode: 'W0010',
    warehouseName: '창고-10',
    factoryCode: 'B010',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
  {
    locationCode: 'L0012',
    locationName: 'A-1',
    cellCol: '3',
    cellStage: '2',
    cellAlign: 'left',
    locationType: 'return',
    areaCode: 'A0012',
    areaName: '수산',
    warehouseCode: 'W0011',
    warehouseName: '창고-11',
    factoryCode: 'B011',
    factoryName: '백오피스',
    keepType: 'frozen',
    useYN: false,
  },
]
export const LocationMock = {
  LocationList: rest.get(`${API.LOCATION_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '', // 한글 Text
        data: {
          total: 2,
          page: 1,
          limit: 10,
          items: locationDataSet,
        },
      })
    )
  }),
  LocationDetail: rest.get(
    `${API.LOCATION_DETAIL(':locationCode')}`,
    (req, res, ctx) => {
      // const params = req.body as any
      const { locationCode } = req.params
      const filterDataSet =
        locationDataSet.find((d) => d.locationCode === locationCode) ?? null
      console.log(filterDataSet)
      return res(
        ctx.status(200),
        ctx.json({
          code: 'Success',
          message: '', // 한글 Text
          data: filterDataSet,
        })
      )
    }
  ),
  LocationCreate: rest.post(`${API.LOCATION_CREATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    console.log(data, '###')
    locationDataSet.push(data)
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
  LocationUpdate: rest.post(`${API.LOCATION_UPDATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    const findIndexLocation = locationDataSet.findIndex(
      (d) => d.locationCode === data.locationCode
    )
    if (findIndexLocation !== -1) {
      locationDataSet[findIndexLocation] = data
    }

    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
  LocationDelete: rest.delete(`${API.LOCATION_DELETE}`, (req, res, ctx) => {
    const { data } = req.body as any
    console.log(data, '####')
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
}
