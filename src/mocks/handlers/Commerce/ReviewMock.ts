import { rest } from 'msw'
import { CommerceMockPath } from '@mocks/mockPath'
import { reviewDto } from '@api/model/Commerce/review'

const ReviewDetailList: reviewDto[] = [
  {
    id: '161',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '23m(보통)',
    isExposure: 'exposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'imageReview',
    userName: '박*용',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '153',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜9',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '154',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜8',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '155',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'exposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'imageReview',
    userName: '송*혜7',
    imageList: [],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '152',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜6',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '156',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'exposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜5',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '157',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'imageReview',
    userName: '송*혜4',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '158',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'exposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜3',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '159',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜2',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
  {
    id: '160',
    createDate: '2022-11-03 13:23:33',
    updateDate: '2022-11-03 21:23:33',
    productName: '초초초초초초신선 삼겹이',
    productOption: '11m(앏게)',
    isExposure: 'unexposure',
    reviewContent:
      '정말 신선해요 근데 너무 비싸요 고기가 녹아요 근데 기름이 많아요',
    reviewType: 'textReview',
    userName: '송*혜1',
    imageList: [
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221026_202635fGDxpbJs2E5vtmf2jmbMWEIMG_7798.JPG?alt=media&token=95069d74-dd00-4f18-b3c2-82d062f55d77',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221102_013025_f5rhE2_OxKU_018e9071-bcec-4c96-b18e-76a0ce9e7e35.jpg?alt=media&token=340e80e3-97ef-4ab6-a157-3cc9c31a8445',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F20221104_025444_e_jfFY1xSKyVltj8altRDv_4131cb6c-ba56-429d-96c2-66ae1ee250a5.jpg?alt=media&token=abd293e1-f2f1-42a6-9efc-4ddaffadba30',
      'https://jeongyookgak-commerce.s3.ap-northeast-2.amazonaws.com/jyg-custom-seoul-app/frontend/thumbnails/transparent_background/porkcutlet-sirloin-detail.png',
      'https://firebasestorage.googleapis.com/v0/b/jyg-custom.appspot.com/o/reviews%2F1667223295766_4C93830E-D3F4-44F4-9F8F-911A10528B3E.jpeg?alt=media&token=aa4c6466-0ad7-4f26-a1b3-43d9b43296c8',
    ],
    uid: 'DJKSL3123DJsSLD',
  },
]
export const ReviewMock = {
  ReviewList: rest.get(CommerceMockPath.ReviewList, (req, res, ctx) => {
    // const params = req.url.searchParams.getAll('limit')
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 119,
          page: 1,
          items: ReviewDetailList,
          limit: 10,
        },
      })
    )
  }),
  ReportList: rest.get(CommerceMockPath.ReportList, (req, res, ctx) => {
    // const params = req.url.searchParams.getAll('limit')
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 119,
          page: 1,
          items: [
            {
              id: '1',
              reportDate: '2022-11-03 11:44:32',
              reportUID: '01GB6J675QXV5CV0TTE45QZ62D',
              reportReason: '비속어를 사용했습니다.',
            },
            {
              id: '2',
              reportDate: '2022-11-03 11:44:32',
              reportUID: '01GB6J6BMDMBBG1RESTZ28JK3D',
              reportReason: '기부니가 안 좋아요',
            },
            {
              id: '3',
              reportDate: '2022-11-03 11:44:32',
              reportUID: '01GB6J6CX4RBV5M9P89MS9EWDC',
              reportReason: '비하 발언 했습니다.',
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  ReviewDetail: rest.get(
    `${CommerceMockPath.ReviewDetail}`,
    (req, res, ctx) => {
      // const params = req.body as any
      const { id } = req.params
      const filterDataSet = ReviewDetailList.find((d) => d.id === id) ?? null
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
}
