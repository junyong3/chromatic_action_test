import { rest } from 'msw'
import { AREA_API_PATH as API } from '@api/path/MDM/Config/areaPath'

const areaDataSet = [
  {
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
export const AreaMock = {
  AreaList: rest.get(`${API.AREA_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '', // 한글 Text
        data: {
          total: 2,
          page: 1,
          limit: 10,
          items: areaDataSet,
        },
      })
    )
  }),
  AreaDetail: rest.get(`${API.AREA_DETAIL(':areaCode')}`, (req, res, ctx) => {
    // const params = req.body as any
    const { areaCode } = req.params
    const filterDataSet =
      areaDataSet.find((d) => d.areaCode === areaCode) ?? null
    console.log(filterDataSet)
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '', // 한글 Text
        data: filterDataSet,
      })
    )
  }),
  AreaCreate: rest.post(`${API.AREA_CREATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    console.log(data, '###')
    areaDataSet.push(data)
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
  AreaUpdate: rest.post(`${API.AREA_UPDATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    const findIndexArea = areaDataSet.findIndex(
      (d) => d.areaCode === data.areaCode
    )
    if (findIndexArea !== -1) {
      areaDataSet[findIndexArea] = data
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
  AreaDelete: rest.delete(`${API.AREA_DELETE}`, (req, res, ctx) => {
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
