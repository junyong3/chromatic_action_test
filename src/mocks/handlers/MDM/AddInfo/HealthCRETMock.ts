import { rest } from 'msw'
import { MDMMockPath } from '@mocks/mockPath'

const healthCRETDataSet = [
  {
    healthCRETCreateDate: '2022-02-16',
    healthCRETExpiryDate: '2022-11-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health001',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-06-15',
    healthCertificateExpired: true,
    healthCRETCode: 'health002',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '강상현',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2022-06-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health003',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박정민',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2022-12-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health0012',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-01-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health004',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health005',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-02-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health006',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health007',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health008',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health009',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health010',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
  {
    healthCRETCreateDate: '2021-06-15',
    healthCRETExpiryDate: '2023-03-15',
    healthCertificateExpired: false,
    healthCRETCode: 'health011',
    phoneNumber: '01021012472',
    healthCertificateFile: null,
    name: '박준용',
    department: '성남공장부서-1',
  },
]
export const HealthCRETMock = {
  HealthCRETList: rest.get(
    MDMMockPath.HealthCertificateList,
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
            items: healthCRETDataSet,
          },
        })
      )
    }
  ),
  HealthCRETDetail: rest.get(
    MDMMockPath.HealthCertificateDetail,
    (req, res, ctx) => {
      // const params = req.body as any
      const { healthCertificateCode } = req.params
      const filterDataSet =
        healthCRETDataSet.find(
          (d) => d.healthCRETCode === healthCertificateCode
        ) ?? null
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
  CreateHealthCRET: rest.post(
    MDMMockPath.CreateHealthCertificate,
    (req, res, ctx) => {
      const { data } = req.body as any
      console.log(data, '###')
      console.log(req, '###2')
      healthCRETDataSet.push(data)
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
  UpdateHealthCRET: rest.post(
    MDMMockPath.UpdateHealthCertificate,
    (req, res, ctx) => {
      const { data } = req.body as any
      const findIndexHealthCRET = healthCRETDataSet.findIndex(
        (d) => d.healthCRETCode === data.healthCRETCode
      )
      if (findIndexHealthCRET !== -1) {
        healthCRETDataSet[findIndexHealthCRET] = data
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
  DeleteHealthCRET: rest.delete(
    MDMMockPath.DeleteHealthCertificate,
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
