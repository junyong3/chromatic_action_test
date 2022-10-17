import { MSG } from '@constants/MessageCode/msg'
import { COMMERCE_PAYMENT_API_PATH } from '@api/path/Commerce/paymentPath'
import { API_ROOT_PATH } from '@src/api/path/ROOTPath'
import { COMMERCE_MEMBER_API_PATH } from '@src/api/path/Commerce/memberPath'
import { ContentPasteSearchOutlined } from '@mui/icons-material'

const RootMemberPath = API_ROOT_PATH.COMMERCE_MEMBER
const RootPaymentPath = API_ROOT_PATH.COMMERCE_PAYMENT
const email = Cypress.env('CY_TEST_ID')
const pwd = Cypress.env('CY_TEST_PWD')
const secret = Cypress.env('CY_OTP_SECRET')

beforeEach(() => {
  cy.restoreLocalStorage()

  cy.getLocalStorage('REFRESH_TOKEN').then((token) => {
    if (!token) {
      cy.login({ email, pwd, secret })
      cy.get('h1').should('have.text', 'HomePage')
    }

    cy.visit('/commerce/member')
  })
})

afterEach(() => {
  cy.saveLocalStorage()
})

const memberUID = '01GB6J6J1YZJAB4YGFRF91VSCM'
const memberName = 'cy-test용'
const maskingMemberName = 'c******용'
const memberPhone = '01000000003'
const maskingMemberPhone = '010****0003'
const updateMemberName = 'edit name'
const updateMemberPhone = '01711110003'
const accountNumber = '110393205045'
const accountNumber2 = '3022101247211'
const customerName = '박준용'
const cardNumber = '5531844005543481'

describe('Testing the Commerce Member Page', () => {
  it('1. 회원 목록 조회 및 회원 상세 조회, 수정한다.', () => {
    // ============= 회원 목록 테스트 시작 ===============
    cy.intercept({
      method: 'get',
      url: `${RootMemberPath}${COMMERCE_MEMBER_API_PATH.MEMBER_LIST}?*`,
    }).as('memberList')

    // 회원 UID 검색
    cy.dataCy('keywordInput').type(memberUID)
    cy.dataCy('searchButton').click()

    cy.wait('@memberList').then(() => {
      cy.get('.MemberDataGrid-UID').first().should('have.text', memberUID)
    })

    // 회원 이름 검색
    cy.dataCy('keywordInput').clear().type(memberName)
    cy.dataCy('searchButton').click()

    cy.wait('@memberList').then(() => {
      cy.get('.MemberDataGrid-name')
        .first()
        .should('have.text', maskingMemberName)
    })

    // 회원 휴대폰번호 검색
    cy.dataCy('keywordInput').clear().type(memberPhone)
    cy.dataCy('searchButton').click()

    cy.wait('@memberList').then(() => {
      cy.get('.MemberDataGrid-phone')
        .first()
        .should('have.text', maskingMemberPhone)
    })
    // ============= 회원 목록 테스트 종료 ===============

    // ============= 회원 상세 조회 테스트 시작 ===============
    cy.intercept({
      method: 'get',
      url: `${RootMemberPath}${COMMERCE_MEMBER_API_PATH.MEMBER_DETAIL('')}*`,
    }).as('memberDetail')
    //
    cy.intercept({
      method: 'post',
      url: `${RootMemberPath}${COMMERCE_MEMBER_API_PATH.VALIDATE_PHONE}`,
    }).as('VerifyPhone')

    cy.visit(`/commerce/member/${memberUID}`)

    // 회원 상세 조회
    cy.wait('@memberDetail').then(() => {
      cy.dataCy('id').find('input').should('have.value', memberUID)
      cy.dataCy('name').find('input').should('have.value', memberName)
      cy.dataCy('phone').find('input').should('have.value', memberPhone)
    })

    // 회원 수정 화면 이동
    cy.dataCy('updateButton').click()

    // 회원 이름 변경
    cy.dataCy('name').find('input').clear().type(updateMemberName)

    // 회원 폰번호 변경 및 중복확인
    cy.dataCy('phone').find('input').clear().type(updateMemberPhone)
    cy.dataCy('validatePhoneButton').click()
    cy.wait('@VerifyPhone').then(() => {
      cy.dataCy('validatePhoneButton').should('have.text', '사용가능')
    })

    // 수정 정보 저장
    cy.dataCy('saveButton').click()
    cy.dataCy('dialogSaveButton').click()

    cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_MEMBER)

    cy.dataCy('name').find('input').should('have.value', updateMemberName)
    cy.dataCy('phone').find('input').should('have.value', updateMemberPhone)

    // 회원 수정 화면 이동
    cy.dataCy('updateButton').click()

    // 원복 REFUND_ACCOUNT_BANKLIST
    cy.wait('@memberDetail').then(() => {
      cy.dataCy('name').find('input').clear().type(memberName)
      cy.dataCy('phone').find('input').clear().type(memberPhone)
      cy.dataCy('validatePhoneButton').click()
      cy.dataCy('saveButton').click()
      cy.dataCy('dialogSaveButton').click()
    })
    // ============= 회원 상세 조회 테스트 종료 ===============

    // ============= 카드 Tab 테스트 시작 ===============
    cy.intercept({
      method: 'get',
      url: RootPaymentPath + COMMERCE_PAYMENT_API_PATH.MEMBER_CREDIT_CARD + '*',
    }).as('cards')
    cy.visit(`/commerce/member/${memberUID}`)

    // card List
    cy.wait('@cards').its('response.statusCode').should('eq', 304)

    // 카드 추가
    cy.dataCy('card').click()
    cy.dataCy('cardAddDialog').click()

    cy.dataCy('cardNumber').find('input').type('5531844005599999')
    cy.dataCy('ExpirationPeriod').find('input').type('0000')
    cy.dataCy('cardPassword').find('input').type('12')
    cy.dataCy('CompanyRegistrationNumber').find('input').type('890903')
    cy.dataCy('cardName').find('input').type('cypress-card')
    cy.dataCy('IsIdentityComplete').find('[type="checkbox"]').check()

    cy.dataCy('cardAdd').click()
    cy.dataCy('dialogTitle').should('have.text', '잘못된 유효기간')
    cy.dataCy('alert-close').click()

    cy.dataCy('ExpirationPeriod').find('input').clear().type('0327')
    cy.dataCy('cardAdd').click()
    cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_CARD)

    // 카드 삭제
    cy.wait('@cards').then(() => {
      cy.dataCy('cardDelete').first().click()
      cy.dataCy('dialogDeleteButton').click()
      cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_CARD)
    })
    // ============= 카드 Tab 테스트 종료 ===============

    // ============= 환급 계좌 Tab 테스트 시작 ===============
    cy.intercept({
      url: RootPaymentPath + COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT_BANK_LIST,
    }).as('bankList')

    cy.intercept({
      url: RootPaymentPath + COMMERCE_PAYMENT_API_PATH.REFUND_ACCOUNT + '*',
    }).as('refundAccountInfo')
    cy.visit(`/commerce/member/${memberUID}`)
    // 환급 계좌 tab 수정 or 삭제
    // 환급 계좌 tab 선택
    cy.dataCy('refund-account').click()

    cy.get('@refundAccountInfo').should((res: any) => {
      cy.dataCy('accountNumber').find('input').clear()
      cy.dataCy('customerName').find('input').clear()
    })
    cy.wait('@bankList').then(() => {
      // 환급계좌 선택
      cy.dataCy('bank')
        .click()
        .get('#menu- > .MuiPopover-paper  > ul')
        .find('[data-value="신한"]')
        .click()

      cy.dataCy('accountNumber').find('input').type(accountNumber)
      cy.dataCy('customerName')
        .find('input')
        .type(customerName + 'test')
        .blur()

      cy.dataCy('save').click()

      // 예금주 불일치
      cy.dataCy('dialogTitle').should('have.text', '예금주 불일치')
      cy.dataCy('alert-close').click()

      // 유효하지 않은 계좌
      cy.dataCy('accountNumber').find('input').clear().type('3333333333333')
      cy.dataCy('customerName').find('input').clear().type(customerName)

      cy.dataCy('save').click()
      cy.dataCy('dialogTitle').should('have.text', '유효하지 않은 계좌')
      cy.dataCy('alert-close').click()

      // 계좌 등록
      cy.dataCy('accountNumber').find('input').clear().type(accountNumber)
      cy.dataCy('customerName').find('input').clear().type(customerName).blur()
      cy.dataCy('save').click()

      cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_REFUNDS)
    })

    cy.get('@refundAccountInfo').should((res: any) => {
      cy.dataCy('accountNumber')
        .find('input')
        .should('have.value', accountNumber)
      cy.dataCy('customerName').find('input').should('have.value', customerName)
    })

    cy.wait('@refundAccountInfo').then((res: any) => {
      // cy.log(res, '#####')
      cy.wait(200).then(() => {
        cy.dataCy('customerName')
          .find('input')
          .clear()
          .type(customerName, { force: true })
        cy.dataCy('accountNumber')
          .find('input')
          .clear()
          .type(accountNumber2, { force: true })

        cy.dataCy('bank')
          .click()
          .get('#menu- > .MuiPopover-paper  > ul')
          .find('[data-value="농협"]')
          .contains('농협')
          .click()

        cy.dataCy('save').click()
        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_REFUNDS)

        // 환급 계좌 삭제
        cy.dataCy('cancel').click()
        cy.dataCy('dialogDeleteButton').click()
        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_REFUNDS)
      })
    })
    // ============= 환급 계좌 Tab 테스트 종료 ===============
  })

  it('3. 카드 Tab 조회, 추가, 삭제 처리', () => {
    // ============= 카드 Tab 테스트 시작 ===============
    cy.intercept({
      method: 'get',
      url: RootPaymentPath + COMMERCE_PAYMENT_API_PATH.MEMBER_CREDIT_CARD + '*',
    }).as('cards')
    cy.visit(`/commerce/member/${memberUID}`)

    // card List
    // cy.wait('@cards').then((res) => {
    //   console.log(res)
    //   cy.debug()
    // })

    // 카드 추가
    cy.dataCy('card').click()
    cy.dataCy('cardAddDialog').click()

    cy.dataCy('cardNumber').find('input').type('3213123123123123')
    cy.dataCy('ExpirationPeriod').find('input').type('0327')
    cy.dataCy('cardPassword').find('input').type('12')
    cy.dataCy('CompanyRegistrationNumber').find('input').type('890903')
    cy.dataCy('cardName').find('input').type('cypress-card')
    cy.dataCy('IsIdentityComplete').find('[type="checkbox"]').check()

    cy.dataCy('cardAdd').click()
    cy.dataCy('dialogTitle').should('have.text', '유효하지 않은 카드')
    cy.dataCy('alert-close').click()

    cy.dataCy('cardNumber').find('input').clear().type(cardNumber)
    // cy.dataCy('cardAdd').click()

    // cy.dataCy('dialogTitle').should('have.text', '잘못된 유효기간')
    // cy.dataCy('alert-close').click()

    cy.dataCy('ExpirationPeriod').find('input').clear().type('0327')
    cy.dataCy('cardAdd').click()
    cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_CARD)

    // 카드 삭제
    cy.wait('@cards').then(() => {
      cy.dataCy('cardDelete').first().click()
      cy.dataCy('dialogDeleteButton').click()
      cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_CARD)
    })
    // ============= 카드 Tab 테스트 종료 ===============
  })
})
