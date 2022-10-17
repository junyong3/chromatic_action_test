import { rest } from 'msw'
import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { ORG_API_PATH as API } from '@api/path/MDM/orgPath'

const ORG_PATH = API_ROOT_PATH.MDM
const orgDataSet = [
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B001',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양갈비',
    address2: '서울시 가리봉동',
    departmentCode: 'B002',
    departmentName: '백오피스',
    manager: '강상현',
    memo: '메모하세요',
    useYN: false,
    zipcode: '503',
  },
  {
    address1: '꿔바로우',
    address2: '서울시 가리봉동',
    departmentCode: 'B003',
    departmentName: '백오피스',
    manager: '박정민',
    memo: '메모하세요',
    useYN: false,
    zipcode: '504',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B0012',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '505',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B004',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B005',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B006',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B007',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B008',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B009',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B010',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
  {
    address1: '양꼬치',
    address2: '서울시 가리봉동',
    departmentCode: 'B011',
    departmentName: '백오피스',
    manager: '박준용',
    memo: '메모하세요',
    useYN: false,
    zipcode: '502',
  },
]
export const OrgMock = {
  OrgList: rest.get(`${ORG_PATH}${API.ORG_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '', // 한글 Text
        data: {
          total: 2,
          page: 1,
          limit: 10,
          items: orgDataSet,
        },
      })
    )
  }),
  OrgDetail: rest.get(
    `${ORG_PATH}${API.ORG_DETAIL(':deptCode')}`,
    (req, res, ctx) => {
      // const params = req.body as any
      const { deptCode } = req.params
      const filterDataSet =
        orgDataSet.find((d) => d.departmentCode === deptCode) ?? null
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
  OrgCreate: rest.post(`${ORG_PATH}${API.ORG_CREATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    console.log(data, '###')
    orgDataSet.push(data)
    return res(
      ctx.status(200),
      ctx.json({
        code: 'Success',
        message: '성공',
        data: {},
      })
    )
  }),
  OrgUpdate: rest.post(`${ORG_PATH}${API.ORG_UPDATE}`, (req, res, ctx) => {
    const { data } = req.body as any
    const findIndexOrg = orgDataSet.findIndex(
      (d) => d.departmentCode === data.departmentCode
    )
    if (findIndexOrg !== -1) {
      orgDataSet[findIndexOrg] = data
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
  OrgDelete: rest.delete(`${ORG_PATH}${API.ORG_DELETE}`, (req, res, ctx) => {
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
