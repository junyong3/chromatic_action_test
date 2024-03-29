export const COMMERCE_PAYMENT_API_PATH = {
  /**
   * * get: 결제 목록
   */
  PAYMENT_LIST: '/admin/payment/list',
  /**
   * * get: 결제 목록 for 주문 상세
   */
  PAYMENT_HISTORY_LIST: '/admin/payment/history/list',
  /**
   * * patch: 결제 수정
   * @param id 결제 아이디
   */
  PAYMENT_DETAIL: (id: string) => `/admin/payment/detail/${id}`,
  /**
   * 환급 계좌 저장
   */
  SAVE_REFUND_ACCOUNT: '/admin/payment/refund-account/save',
  /**
   * 환급 계좌 정보 조회
   */
  REFUND_ACCOUNT: '/admin/payment/refund-account',
  /**
   * 환급 계좌 정보 삭제
   */
  REMOVE_REFUND_ACCOUNT: '/admin/payment/refund-account/remove',
  /**
   * 환급 계좌 은행 목록
   */
  REFUND_ACCOUNT_BANK_LIST: '/admin/payment/refund-account/banks',
  /**
   * * get: 회원 신용카드 목록
   * * post: 회원 신용카드 등록
   * * delete: 회원 신용카드 삭제
   */
  MEMBER_CREDIT_CARD: '/admin/payment/cards',
  /**
   * 카드 수정
   */
  CARDS_UPDATE: '/admin/payment/cards',
}
