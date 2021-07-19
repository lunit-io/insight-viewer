import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, INITIALIZED } from '../support/const'
import { INITIAL_VIEWPORT1 } from '../../src/containers/Viewport/const'

describe(
  'Viewport Viewer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/viewport')
    })

    it('shows initial viewport', () => {
      cy.get('.viewer1')
        .find(INITIALIZED)
        .then(() => {
          cy.get('.viewer1 .scale').should('have.text', INITIAL_VIEWPORT1.scale)
          cy.get('.viewer1 .x').should('have.text', (0).toFixed(2))
          cy.get('.viewer1 .y').should('have.text', (0).toFixed(2))
          cy.get('.viewer1 .windowWidth').should(
            'have.text',
            INITIAL_VIEWPORT1.windowWidth.toFixed(2)
          )
          cy.get('.viewer1 .windowCenter').should(
            'have.text',
            INITIAL_VIEWPORT1.windowCenter.toFixed(2)
          )
          cy.get('.viewer1 .invert').should('have.text', 'false')
          cy.get('.viewer1 .hflip').should('have.text', 'false')
          cy.get('.viewer1 .vflip').should('have.text', 'false')

          cy.percySnapshot()
        })
    })

    describe('viewport update', () => {
      beforeEach(() => {
        cy.get('.reset').click()
      })

      it('shows inverted viewport', () => {
        cy.get('.invert-control').click()
        cy.get('.viewer1 .invert').should('have.text', 'true')
        cy.percySnapshot()
      })

      it('shows hflipped viewport', () => {
        cy.get('.hflip-control').click()
        cy.get('.viewer1 .hflip').should('have.text', 'true')
        cy.percySnapshot()
      })

      it('shows vflipped viewport', () => {
        cy.get('.vflip-control').click()
        cy.get('.viewer1 .vflip').should('have.text', 'true')
        cy.percySnapshot()
      })

      it('shows x-transitioned viewport', () => {
        const value = 20
        cy.get('.x-control').controlledInputChange(value)
        cy.get('.viewer1 .x').should('have.text', value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows y-transitioned viewport', () => {
        const value = 50
        cy.get('.y-control').controlledInputChange(value)
        cy.get('.viewer1 .y').should('have.text', value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows zoomed viewport', () => {
        const value = 2
        cy.get('.scale-control').controlledInputChange(value)
        cy.get('.viewer1 .scale').should('have.text', value)
        cy.percySnapshot()
      })

      it('shows window-width viewport', () => {
        const value = 240
        cy.get('.window-width-control').controlledInputChange(value)
        cy.get('.viewer1 .windowWidth').should('have.text', value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows window-center viewport', () => {
        const value = 150
        cy.get('.window-center-control').controlledInputChange(value)
        cy.get('.viewer1 .windowCenter').should('have.text', value.toFixed(2))
        cy.percySnapshot()
      })

      it('changes multiple viewport properties', () => {
        const value = {
          invert: 'true',
          vflip: 'true',
          x: 60,
          scale: 0.7,
          windowWidth: 160,
          windowCenter: 50,
        }

        cy.get('.invert-control').click()
        cy.get('.vflip-control').click()
        cy.get('.x-control').controlledInputChange(value.x)
        cy.get('.scale-control').controlledInputChange(value.scale)
        cy.get('.window-width-control').controlledInputChange(value.windowWidth)
        cy.get('.window-center-control').controlledInputChange(
          value.windowCenter
        )

        cy.get('.viewer1 .invert').should('have.text', value.invert)
        cy.get('.viewer1 .vflip').should('have.text', value.vflip)
        cy.get('.viewer1 .x').should('have.text', value.x.toFixed(2))
        cy.get('.viewer1 .scale').should('have.text', value.scale)
        cy.get('.viewer1 .windowWidth').should(
          'have.text',
          value.windowWidth.toFixed(2)
        )
        cy.get('.viewer1 .windowCenter').should(
          'have.text',
          value.windowCenter.toFixed(2)
        )

        cy.percySnapshot()
      })

      it('changes viewport with keyboard', () => {
        cy.get(INITIALIZED).then(() => {
          cy.get('body').type('wwddd')
          cy.percySnapshot()
        })
      })

      it('changes multiple viewer viewport', () => {
        const value = {
          x: 30,
          y: 90,
          x2: 10,
          y2: 60,
        }

        cy.get('.x-control').controlledInputChange(value.x)
        cy.get('.y-control').controlledInputChange(value.y)
        cy.get('.x-control2').controlledInputChange(value.x2)
        cy.get('.y-control2').controlledInputChange(value.y2)

        cy.get('.viewer1 .x').should('have.text', value.x.toFixed(2))
        cy.get('.viewer1 .y').should('have.text', value.y.toFixed(2))
        cy.get('.viewer2 .x').should('have.text', value.x2.toFixed(2))
        cy.get('.viewer2 .y').should('have.text', value.y2.toFixed(2))
        cy.percySnapshot()
      })
    })
  }
)
