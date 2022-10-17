import { rest } from 'msw'
import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { FACTORY_API_PATH as API } from '@api/path/MDM/factoryPath'

const FACTORY_PATH = API_ROOT_PATH.MDM
const factoryDataSet = [
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B001',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양갈비',
    address2: '서울시 가리봉동',
    factoryCode: 'B002',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'manufacturing',
    manager: '강상현',
    memo: '메모하세요',
    useYN: false,
    zipcode: '503',
  },
  {
    address1: '꿔바로우',
    address2: '서울시 가리봉동',
    factoryCode: 'B003',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박정민',
    memo: '메모하세요',
    useYN: false,
    zipcode: '504',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B0012',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'manufacturing',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '505',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B004',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B005',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'manufacturing',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B006',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B007',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'manufacturing',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B008',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B009',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B010',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    factoryCode: 'B011',
    factoryName: '백오피스',
    companyNumber: 1188495019,
    phoneNumber: '01021012472',
    centerType: 'logistics',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
]
export const FactoryMock = {
  FactoryList: rest.get(
    `${FACTORY_PATH}${API.FACTORY_LIST}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'Success',
          message: '', // 한글 Text
          data: {
            total: 2,
            page: 1,
            limit: 10,
            items: factoryDataSet,
          },
        })
      )
    }
  ),
  FactoryDetail: rest.get(
    `${FACTORY_PATH}${API.FACTORY_DETAIL(':factoryCode')}`,
    (req, res, ctx) => {
      // const params = req.body as any
      const { factoryCode } = req.params
      const filterDataSet =
        factoryDataSet.find((d) => d.factoryCode === factoryCode) ?? null
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
  FactoryCreate: rest.post(
    `${FACTORY_PATH}${API.FACTORY_CREATE}`,
    (req, res, ctx) => {
      const { data } = req.body as any
      console.log(data, '###')
      factoryDataSet.push(data)
      return res(
        ctx.status(200),
        ctx.json({
          code: 'Success',
          message: '성공',
          data: {},
        })
      )
    }
  ),
  FactoryUpdate: rest.post(
    `${FACTORY_PATH}${API.FACTORY_UPDATE}`,
    (req, res, ctx) => {
      const { data } = req.body as any
      const findIndexFactory = factoryDataSet.findIndex(
        (d) => d.factoryCode === data.factoryCode
      )
      if (findIndexFactory !== -1) {
        factoryDataSet[findIndexFactory] = data
      }

      return res(
        ctx.status(200),
        ctx.json({
          code: 'Success',
          message: '성공',
          data: {},
        })
      )
    }
  ),
  FactoryDelete: rest.delete(
    `${FACTORY_PATH}${API.FACTORY_DELETE}`,
    (req, res, ctx) => {
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
    }
  ),
}
