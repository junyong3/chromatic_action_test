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

    cy.visit('/IAM/permission')
  })
})

afterEach(() => {
  cy.saveLocalStorage()
})

const name = faker.name.jobTitle()
const desc = faker.name.jobArea()
const updatedName = faker.name.jobTitle()
const updatedDesc = faker.name.jobArea()

describe('Testing the Permissions', () => {
  it('1. 권한을 생성, 확인, 삭제한다.', () => {
    cy.intercept({
      url: '/iam/permissions/*',
    }).as('permissionDetail')

    cy.dataCy('addButton')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href)

        // 권한 생성
        cy.dataCy('subTitle').should('have.text', '권한 생성')
        cy.dataCy('name').type(name)
        cy.dataCy('desc').type(desc)

        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_PERMISSION)

        // 권한 상세
        cy.wait('@permissionDetail').then(() => {
          cy.dataCy('name').find('input').should('have.value', name)
          cy.dataCy('desc').find('textarea').first().should('have.value', desc)
        })

        // 권한 수정
        cy.dataCy('updateButton').click()

        cy.dataCy('name')
          .find('input')
          .should('have.value', name)
          .clear()
          .type(updatedName)

        cy.dataCy('desc')
          .find('textarea')
          .first()
          .should('have.value', desc)
          .clear()
          .type(updatedDesc)

        // 권한 저장
        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        // 권한 상세
        cy.wait('@permissionDetail').then(() => {
          cy.dataCy('name').find('input').should('have.value', updatedName)
          cy.dataCy('desc')
            .find('textarea')
            .first()
            .should('have.value', updatedDesc)
        })

        // 권한 삭제
        cy.dataCy('deleteButton').click()
        cy.dataCy('dialogDeleteButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_PERMISSION)
      })
  })
})
