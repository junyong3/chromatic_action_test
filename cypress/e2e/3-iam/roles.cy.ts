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

    cy.visit('/IAM/role')
  })
})

afterEach(() => {
  cy.saveLocalStorage()
})

const roleName = faker.name.jobTitle()
const memo = faker.name.jobArea()
const updatedRoleName = faker.name.jobTitle()
const updatedMemo = faker.name.jobArea()

describe('Testing the Roles', () => {
  it('1. 역할을 생성, 확인, 삭제한다.', () => {
    cy.intercept({
      url: '/iam/roles/*',
    }).as('roleDetail')

    cy.dataCy('addButton')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href)

        // 역할 생성
        cy.dataCy('roleName').type(roleName)
        cy.dataCy('memo').type(memo)

        cy.dataCy('user').click()
        cy.get('.MuiAutocomplete-option').first().click()

        cy.dataCy('permission').click()
        cy.get('.MuiAutocomplete-option').first().click()

        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.SAVE_ROLE)

        // 역할 상세
        cy.wait('@roleDetail').then(() => {
          cy.dataCy('roleName').find('input').should('have.value', roleName)
          cy.dataCy('memo').find('textarea').first().should('have.value', memo)
        })

        // 역할 수정
        cy.dataCy('updateButton').click()

        cy.wait('@roleDetail').then(() => {
          cy.dataCy('roleName')
            .find('input')
            .should('have.value', roleName)
            .clear()
            .type(updatedRoleName)

          cy.dataCy('memo')
            .find('textarea')
            .first()
            .should('have.value', memo)
            .clear()
            .type(updatedMemo)

          cy.get('.MuiDataGrid-cell .MuiButton-root').first().click()
        })

        // 역할 저장
        cy.dataCy('saveButton').click()
        cy.dataCy('dialogSaveButton').click()

        // 역할 상세
        cy.wait('@roleDetail').then(() => {
          cy.dataCy('roleName')
            .find('input')
            .should('have.value', updatedRoleName)
          cy.dataCy('memo')
            .find('textarea')
            .first()
            .should('have.value', updatedMemo)
        })

        // 역할 삭제
        cy.dataCy('deleteButton').click()
        cy.dataCy('dialogDeleteButton').click()

        cy.dataCy('snackbar').should('have.text', MSG.SUCCESS.DELETE_ROLE)
      })
  })
})
