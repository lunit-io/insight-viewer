import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../support/const'
import { IMAGES } from '../../../insight-viewer-docs/const'

describe(
  'Basic Viewer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT + 500, // page is vertical long
    scrollBehavior: false,
  },
  () => {
    before(() => {
      cy.visit('/')
      setup()
    })

    it('shows initial image', () => {
      cy.get('[data-cy-loaded=success]').should('be.exist') // image is loaded successfully
      cy.get('[data-cy-image').contains(IMAGES[0]) // check loaded image url
      cy.percySnapshot()
    })

    it('shows second image', () => {
      cy.get('.button2').click()
      cy.get('[data-cy-loaded=success]').should('be.exist')
      cy.get('[data-cy-image]').contains(IMAGES[5])
      cy.percySnapshot()
    })

    it('shows third image', () => {
      cy.get('.button3').click()
      cy.get('[data-cy-loaded=success]').should('be.exist')
      cy.get('[data-cy-image]').contains(IMAGES[10])
      cy.percySnapshot()
    })
  }
)
