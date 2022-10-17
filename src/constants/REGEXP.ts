export const REGEXP = {
  /**
   * * Minimum Length : 8
   * * Lowercase Characters(영소문자) : 1
   * * Digits(숫자) : 1
   * * Special Characters(특수문자) : 1
   */
  USER_PASSWORD: /^(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*\d)/,
  OTP: /[0-9]{6}/,
  PHONE: /^\d{11}$/,
  EMAIL:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
  COUPON_CODE: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/,
  COUPON_NAME_CUSTOMER: /^[ㄱ-ㅎ가-힣0-9\s]+$/,
}
