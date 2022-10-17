import { Dayjs } from 'dayjs'

export const NumberCommaFormat = (val: string | number) => {
  if (typeof val === 'number') {
    return val.toLocaleString('ko-KR')
  } else {
    return Number(val).toLocaleString('ko-KR')
  }
}

export const paymentStatusValueFormatter = (value: string) => {
  let cellTxt = ''
  switch (value) {
    case 'complete':
      cellTxt = '결제 완료'
      break
    case 'fail':
      cellTxt = '결제 실패'
      break
    case 'allCancel':
      cellTxt = '전체 취소'
      break

    case 'partialCancel':
      cellTxt = '부분 취소'
      break
    case 'completeRefunds':
      cellTxt = '환급 완료'
      break
    default:
      cellTxt = 'error'
  }
  return cellTxt
}
export const paymentMethodValueFormatter = (rowData: any) => {
  let cellTxt = ''
  switch (rowData.value) {
    case 'choshop':
      cellTxt = '초샵페이'
      break
    case 'naver':
      cellTxt = '네이버페이'
      break
    case 'kakao':
      cellTxt = '카카오페이'
      break
    case 'virtualAccount':
      cellTxt =
        '가상계좌' +
        `(${rowData.api.getRowParams(rowData.id).row.userInfo.userName})`
      break
    default:
      cellTxt = 'error'
  }
  return cellTxt
}

export const isStartDateExclude = (startDate: Dayjs, endDate: Dayjs) => {
  const diffDate = endDate.diff(startDate, 'd')
  return diffDate < 0
}
