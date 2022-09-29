import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../support/const'
import { IMAGES } from '@insight-viewer-library/fixtures'

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

    it('shows initial(CT) image', () => {
      cy.get('[data-cy-loaded=success]').should('be.exist') // image is loaded successfully
      cy.get('[data-cy-image').contains(IMAGES[0]) // check loaded image url
      cy.percySnapshot()
    })

    it('shows second(CR) image', () => {
      cy.get('.button2').click()
      cy.get('[data-cy-loaded=success]').should('be.exist')
      cy.get('[data-cy-image]').contains(IMAGES[12])
      cy.percySnapshot()
    })

    it('shows third(MG) image', () => {
      cy.get('.button3').click()
      cy.get('[data-cy-loaded=success]').should('be.exist')
      cy.get('[data-cy-image]').contains(IMAGES[13])
      cy.percySnapshot()
    })
  }
)
