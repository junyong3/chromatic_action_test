import { rest } from 'msw'
import { MDMMockPath } from '@mocks/mockPath'

const warehouseDataSet = [
  {
    warehouseCode: 'W0001',
    warehouseName: '창고-1',
    factoryCode: 'B001',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0002',
    warehouseName: '창고-2',
    factoryCode: 'B002',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',

    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0003',
    warehouseName: '창고-3',
    factoryCode: 'B003',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0004',
    warehouseName: '창고-4',
    factoryCode: 'B0012',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storageng',

    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0005',
    warehouseName: '창고-5',
    factoryCode: 'B004',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0006',
    warehouseName: '창고-6',
    factoryCode: 'B005',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storageng',

    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0007',
    warehouseName: '창고-7',
    factoryCode: 'B006',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0001',
    warehouseName: '창고-8',
    factoryCode: 'B007',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storageng',

    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0008',
    warehouseName: '창고-9',
    factoryCode: 'B008',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0009',
    warehouseName: '창고',
    factoryCode: 'B009',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0010',
    warehouseName: '창고-10',
    factoryCode: 'B010',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
  {
    warehouseCode: 'W0011',
    warehouseName: '창고-11',
    factoryCode: 'B011',
    factoryName: '백오피스',
    keepType: 'frozen',
    managementType: 'logistics',
    saveType: 'storage',
    memo: '메모하세요',
    useYN: false,
  },
]
export const WarehouseMock = {
  WarehouseList: rest.get(MDMMockPath.WarehouseList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '', // 한글 Text
        data: {
          total: 2,
          page: 1,
          limit: 10,
          items: warehouseDataSet,
        },
      })
    )
  }),
  WarehouseDetail: rest.get(MDMMockPath.WarehouseDetail, (req, res, ctx) => {
    // const params = req.body as any
    const { warehouseCode } = req.params
    const filterDataSet =
      warehouseDataSet.find((d) => d.warehouseCode === warehouseCode) ?? null
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
  CreateWarehouse: rest.post(MDMMockPath.CreateWarehouse, (req, res, ctx) => {
    const { data } = req.body as any
    console.log(data, '###')
    warehouseDataSet.push(data)
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
  UpdateWarehouse: rest.post(MDMMockPath.UpdateWarehouse, (req, res, ctx) => {
    const { data } = req.body as any
    const findIndexWarehouse = warehouseDataSet.findIndex(
      (d) => d.warehouseCode === data.warehouseCode
    )
    if (findIndexWarehouse !== -1) {
      warehouseDataSet[findIndexWarehouse] = data
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
  DeleteWarehouse: rest.delete(MDMMockPath.DeleteWarehouse, (req, res, ctx) => {
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
