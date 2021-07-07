import '@percy/cypress'
import { setup } from '../support/utils'

describe('Basic Viewer', () => {
  before(() => {
    cy.visit('/')
    setup()
  })

  it('shows initial image', () => {
    cy.percySnapshot()
  })

  it('shows second image', () => {
    cy.get('.button2').click()
    cy.percySnapshot()
  })

  it('shows third image', () => {
    cy.get('.button3').click()
    cy.percySnapshot()
  })
})
