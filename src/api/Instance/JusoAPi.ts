import axios from 'axios'

export const jusoApi = axios.create({
  baseURL: 'https://business.juso.go.kr',
})
export type params = {
  confmKey: string
  addInfoYn: string
  currentPage: number
  countPerPage: number
  keyword: string
  resultType: 'json'
}
export const getAddress = async (params: params) => {
  const { data } = await jusoApi.get('/addrlink/addrLinkApiJsonp.do', {
    headers: { 'Content-Type': `application/json` },
    params: params,
  })

  const parserData = JSON.parse(data.slice(1, data.length).slice(0, -1))
  if (parserData.results.common.errorMessage !== '정상') {
    console.error(
      `CODE: ${parserData.results.common.errorCode} \n `,
      `MSG: ${parserData.results.common.errorMessage}`
    )
    return parserData
  } else {
    parserData.results.juso = parserData.results.juso.map(
      (d: jusoDto & { No: number }, ix: number) => {
        d.No = ix + 1
        return d
      }
    )
    return parserData
  }
}

// https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do?
// callback=jQuery1124021064536352351548_1667263428936&
// confmKey=&
// addInfoYn=Y
// &currentPage=1&countPerPage=5&keyword=%EC%9E%A5%EA%B3%A1%EB%82%A8%EB%A1%9C35&resultType=json&_=1667263428942
export type jusoDto = {
  roadAddr: string // 전체 도로명 주소
  roadAddrPart1: string // 도로명주소 1
  roadAddrPart2: string // 도로명주소 2
  engAddr: string // 도로명 주소 (영문)
  jibunAddr: string // 지번 주소
  zipNo: string // 우편번호
  admCd: string // 행정구역코드
  rnMgtSn: string // 도로명 코드
  bdMgtSn: string // 건물관리번호
  detBdNmList: string // 상세건물명
  bdNm: string // 건물명
  bdKdcd: string //공동주택여부 (1: 공동주택, 0: 비공동주택)
  siNm: string // 시도명
  sggNm: string // 시군구명
  emdNm: string // 읍면동명
  liNm: string // 법정리명
  rn: string // 도로명
  udrtYn: string // 지하여부( 0:지상, 1: 지하)
  buldMnnm: string // 건물본번
  buldSlno: string // 건물부번
  mtYn: string // 산 여부 ( 0: 대지, 1:산)
  lnbrMnnm: string // 지번본번(번지)
  lnbrSlno: string // 지번부번(호)
  emdNo: string // 읍면동일련번호
  hstryYn: string // * 2020년12월8일 추가된 항목
  //변동이력여부(0: 현행 주소정보, 1: 요청변수의 keyword(검색어)가 변동된 주소정보에서 검색된 정보)
  relJibun: string // 관련지번
  hemdNm: string //관할주민센터 (참고정보 실제랑 다를 수 있다).
  // "roadAddr": "서울특별시 강남구 강남대로 328(역삼동)",
  // "roadAddrPart1": "서울특별시 강남구 강남대로 328",
  // "roadAddrPart2": "(역삼동)",
  // "engAddr": "328 Gangnam-daero, Gangnam-gu, Seoul",
  // "jibunAddr": "서울특별시 강남구 역삼동 832-3 강남역 쉐르빌",
  // "zipNo": "06252",
  // "admCd": "1168010100",
  // "rnMgtSn": "116802102001",
  // "bdMgtSn": "1168010100108320003025902",
  // "detBdNmList": "",
  // "bdNm": "강남역 쉐르빌",
  // "bdKdcd": "0",
  // "siNm": "서울특별시",
  // "sggNm": "강남구",
  // "emdNm": "역삼동",
  // "liNm": "",
  // "rn": "강남대로",
  // "udrtYn": "0",
  // "buldMnnm": "328",
  // "buldSlno": "0",
  // "mtYn": "0",
  // "lnbrMnnm": "832",
  // "lnbrSlno": "3",
  // "emdNo": "01",
  // "hstryYn": "0",
  // "relJibun": "서울특별시 강남구 역삼동 832-4,832-14",
  // "hemdNm": "서울특별시 강남구 역삼1동"
}

export interface jusoRes {
  results: {
    common: {
      totalCount: number // 총 건수
      currentPage: number // 페이지 번호
      countPerPage: number // row 수
      errorCode: string // 에러 코드
      errorMessage: string // 에러메시지
    }
    // "common": {
    //   "totalCount": "34756",
    //   "currentPage": "1",
    //   "countPerPage": "5",
    //   "errorCode": "0",
    //   "errorMessage": "정상"
    // },
    juso: jusoDto[]
  }
}
