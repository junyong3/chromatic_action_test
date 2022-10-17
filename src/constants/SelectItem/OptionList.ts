export const MemberCountOpt = (startIndex = 0, slice?: string) => {
  return Array.from({ length: slice ? Number(slice) : 21 }).map((d, i) => {
    return { value: i + startIndex + '', label: i + startIndex + '' }
  })
}

export const cancelReason = [
  {
    value: 'A',
    label: '제상품 품질 이상',
  },
  {
    value: 'B',
    label: '오배송 (잘못된 주소)',
  },
  {
    value: 'C',
    label: '주문한 상품과 다름',
  },
  {
    value: 'D',
    label: '배송 중 제상품 누락 또는 분실',
  },
  {
    value: 'E',
    label: '고객 변심 (재사용 가능 상품)',
  },
  {
    value: 'F',
    label: '기타',
  },
]

export const bankOptionCode = [
  { ko: '경남', en: 'KYONGNAMBANK', code: '39', bankName: '경남은행' },
  { ko: '광주', en: 'GWANGJUBANK', code: '34', bankName: '광주은행' },
  { ko: '국민', en: 'KOOKMIN', code: '06', bankName: 'KB국민은행' },
  { ko: '기업', en: 'IBK', code: '03', bankName: 'IBK기업은행' },
  { ko: '농협', en: 'NONGHYEOP', code: '11', bankName: 'NH농협은행' },
  { ko: '단위농협', en: 'LOCALNONGHYEOP', code: '12', bankName: '단위농협' },
  { ko: '대구', en: 'DAEGUBANK', code: '31', bankName: 'DGB대구은행' },
  { ko: '부산', en: 'BUSANBANK', code: '32', bankName: '부산은행' },
  { ko: '산업', en: 'KDBBANK', code: '02', bankName: 'KDB산업은행' },
  { ko: '새마을', en: 'SAEMAUL', code: '45', bankName: '새마을금고' },
  { ko: '산림', en: 'SANLIM', code: '64', bankName: '산림조합' },
  { ko: '수협', en: 'SUHYEOP', code: '07', bankName: 'Sh수협은행' },
  { ko: '신한', en: 'SHINHAN', code: '88', bankName: '신한은행' },
  { ko: '신협', en: 'SHINHYEOP', code: '48', bankName: '신협' },
  { ko: '씨티', en: 'CITI', code: '27', bankName: '씨티은행' },
  { ko: '우리', en: 'WOORI', code: '20', bankName: '우리은행' },
  { ko: '우체국', en: 'POST', code: '71', bankName: '우체국예금보험' },
  { ko: '저축', en: 'SAVINGBANK', code: '50', bankName: '저축은행중앙회' },
  { ko: '전북', en: 'JEONBUKBANK', code: '37', bankName: '전북은행' },
  { ko: '제주', en: 'JEJUBANK', code: '35', bankName: '제주은행' },
  { ko: '카카오', en: 'KAKAOBANK', code: '90', bankName: '카카오뱅크' },
  { ko: '케이', en: 'KBANK', code: '89', bankName: '케이뱅크' },
  { ko: '토스', en: 'TOSSBANK', code: '92', bankName: '토스뱅크' },
  { ko: '하나', en: 'HANA', code: '81', bankName: '하나은행' },
  { ko: 'SC제일', en: 'SC', code: '23', bankName: 'SC제일은행' },
  { ko: '-', en: 'HSBC', code: '54', bankName: '홍콩상하이은행' },
]
export const bankOptionCodeEx = [
  '경남',
  '광주',
  '국민',
  '기업',
  '농협',
  '단위농협',
  '대구',
  '부산',
  '산업',
  '새마을',
  '산림',
  '수협',
  '신한',
  '신협',
  '씨티',
  '우리',
  '우체국',
  '저축',
  '전북',
  '제주',
  '카카오',
  '케이',
  '토스',
  '하나',
  'SC제일',
  '홍콩상하이',
]
export const givePointReasonOptions = [
  { value: 'A', label: '보상적립금' },
  { value: 'B', label: '혜택 적립금' },
  { value: 'C', label: 'SNS리뷰' },
  { value: 'D', label: '친구 초대 적립금' },
  { value: 'E', label: '주문 취소' },
  { value: 'F', label: '무통장 환급' },
  { value: 'G', label: '리뷰 작성' },
  { value: 'H', label: '상품구매' },
  { value: 'I', label: '기타' },
]

export const orgUseYN = [
  { value: true, label: '사용' },
  { value: false, label: '사용중지' },
]
