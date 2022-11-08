import { faker } from '@faker-js/faker'
import { MSG } from '@constants/MessageCode/msg'

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

    cy.visit('/commerce/notice')
  })
})

afterEach(() => {
  cy.saveLocalStorage()
})

const title = faker.name.jobTitle()
const desc = faker.commerce.productDescription()
const updatedTitle = faker.name.jobTitle()
const updatedDesc = faker.commerce.productDescription()

describe('Testing the Permissions', () => {
  it('1. 공지를 생성, 확인, 삭제한다.', () => {
    cy.intercept({
      url: '/admin/contact/notices/*',
    }).as('noticeDetail')

    cy.dataCy('addButton')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href)

        // 공지 생성
        cy.dataCy('subTitle').should('have.text', '공지 생성')
        cy.dataCy('title').type(title)
        cy.get('.ql-editor > p').type(desc, { delay: 100 })

        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_NOTICE)

        // 공지 상세
        cy.wait('@noticeDetail').then(() => {
          cy.dataCy('title').find('input').should('have.value', title)
          cy.get('.ql-editor > p').should('have.text', desc)
        })

        // 공지 수정
        cy.dataCy('updateButton').click()

        cy.wait('@noticeDetail').then(() => {
          cy.dataCy('title')
            .find('input')
            .should('have.value', title)
            .clear()
            .type(updatedTitle)

          cy.get('.ql-editor > p')
            .should('have.text', desc)
            .clear()
            .type(updatedDesc, { delay: 100 })
        })

        // 공지 저장
        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        // 공지 상세
        cy.wait('@noticeDetail').then(() => {
          cy.dataCy('title').find('input').should('have.value', updatedTitle)
          cy.get('.ql-editor > p').should('have.text', updatedDesc)
        })

        // 공지 삭제
        cy.dataCy('deleteButton').click()
        cy.dataCy('dialogDeleteButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_NOTICE)
      })
  })
})
