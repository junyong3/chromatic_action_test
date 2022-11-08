import { rest } from 'msw'
import { MDMMockPath } from '@mocks/mockPath'

export const PartnersMock = {
  VenderList: rest.get(MDMMockPath.VenderList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: [
          {
            venderCode: 'vender1',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender2',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '',
              address1: '',
              address2: '',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender3',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender4',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender5',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender6',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender7',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender8',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender9',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender10',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender11',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender12',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender13',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender14',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            venderCode: 'vender15',
            venderName: '매입사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
        ],
      })
    )
  }),
  CreateVender: rest.post(MDMMockPath.CreateVender, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          venderId: 1,
        },
      })
    )
  }),
  VenderDetail: rest.get(MDMMockPath.VenderDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        code: 'SUCCESS',
        message: '성공',
        data: {
          id: '1',
          venderCode: 'coooodd',
          venderName: 'company lalala',
          address: {
            postcode: '06543',
            address1: '서울시 강남구 구구구구우우',
            address2: '12345호',
          },
          businessNumber: '101987245',
          manager: '권영기',
          phone: '01044445555',
          account: {
            bank: '우리',
            accountNumber: '9987754252',
          },
          handlingCategory: [],
          productList: [],
          contractFile: '',
        },
      })
    )
  }),
  UpdateVender: rest.patch(MDMMockPath.VenderDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          id: '1',
          venderCode: 'coooodd',
          venderName: '수정된 company lalala',
          address: {
            postcode: '06543',
            address1: '서울시 강남구 구구구구우우',
            address2: '12345호',
          },
          businessNumber: '101987245',
          manager: '권영기',
          phone: '01044445555',
          account: {
            bank: '우리',
            accountNumber: '9987754252',
          },
          handlingCategory: [],
          productList: [],
          contractFile: '',
        },
      })
    )
  }),
  DeleteVender: rest.delete(MDMMockPath.VenderDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '삭제 성공',
        data: {
          result: true,
        },
      })
    )
  }),
  ClientList: rest.get(MDMMockPath.ClientList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: [
          {
            clientCode: 'client1',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client2',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client3',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '',
              address1: '',
              address2: '',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client4',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client5',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client6',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client7',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client8',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client9',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client10',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client11',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client12',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client13',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client14',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client15',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client16',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client17',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client18',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
          {
            clientCode: 'client19',
            clientName: '매출사ㅏㅏㅏ',
            address: {
              postcode: '59596',
              address1: '서울시 강남구 하하동',
              address2: '101호',
            },
            businessNumber: '1987363',
            manager: '권영기',
            phone: '01011112222',
            handlingCategory: [],
          },
        ],
      })
    )
  }),
  CreateClient: rest.post(MDMMockPath.CreateClient, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          clientId: 1,
        },
      })
    )
  }),
  ClientDetail: rest.get(MDMMockPath.ClientDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        statusCode: 200,
        code: 'SUCCESS',
        message: '성공',
        data: {
          id: '2',
          clientCode: 'cooode',
          clientName: 'company hahaha',
          clientType: '초샵 오프라인',
          address: {
            postcode: '03562',
            address1: '경기도 수원시 히히히',
            address2: '상세주소오우워우오',
          },
          businessNumber: '101987245',
          manager: '권영기',
          phone: '01044445555',
          account: {
            bank: '우리',
            accountNumber: '9987754252',
          },
          receivingAddress: {
            postcode: '06543',
            address1: '서울시 강남구 구구구구우우',
            address2: '12345호',
          },
          handlingCategory: [],
          productList: [],
          contractFile: '',
        },
      })
    )
  }),
  UpdateClient: rest.patch(MDMMockPath.ClientDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          id: '2',
          clientCode: 'cooode',
          clientName: 'company hahaha',
          clientType: '수정된 초샵 오프라인',
          address: {
            postcode: '03562',
            address1: '경기도 수원시 히히히',
            address2: '상세주소오우워우오',
          },
          businessNumber: '101987245',
          manager: '권영기',
          phone: '01044445555',
          account: {
            bank: '우리',
            accountNumber: '9987754252',
          },
          receivingAddress: {
            postcode: '06543',
            address1: '서울시 강남구 구구구구우우',
            address2: '12345호',
          },
          handlingCategory: [],
          productList: [],
          contractFile: '',
        },
      })
    )
  }),
  DeleteClient: rest.delete(MDMMockPath.ClientDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '삭제 성공',
        data: {
          result: true,
        },
      })
    )
  }),
  KeyGoodsList: rest.get(MDMMockPath.KeyGoodsList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '조회 성공',
        data: [
          { code: 'code1', name: '상품 1' },
          { code: 'code2', name: '상품 2' },
          { code: 'code3', name: '상품 3' },
          { code: 'code4', name: '상품 4' },
          { code: 'code5', name: '상품 5' },
          { code: 'code6', name: '상품 6' },
          { code: 'code7', name: '상품 7' },
        ],
      })
    )
  }),
}
