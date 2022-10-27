import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { INITIAL_VIEWPORT1 } from '../support/const'

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
      cy.get($LOADED).should('be.exist')
      cy.get('[data-cy-viewport=true]').should('be.exist')
      cy.get('.viewer1').find('[data-cy-scale]').contains(INITIAL_VIEWPORT1.scale)
      cy.get('.viewer1').find('[data-cy-x]').contains((0).toFixed(2))
      cy.get('.viewer1').find('[data-cy-y]').contains((0).toFixed(2))
      cy.get('.viewer1').find('[data-cy-window-width]').contains(INITIAL_VIEWPORT1.windowWidth.toFixed(2))
      cy.get('.viewer1').find('[data-cy-window-center]').contains(INITIAL_VIEWPORT1.windowCenter.toFixed(2))
      cy.get('.viewer1').find('[data-cy-invert]').contains('false')
      cy.get('.viewer1').find('[data-cy-hflip]').contains('false')
      cy.get('.viewer1').find('[data-cy-vflip]').contains('false')
      cy.get('.viewer1').find('[data-cy-rotation]').contains(INITIAL_VIEWPORT1.rotation.toFixed(0))
      cy.percySnapshot()
    })

    describe('viewport update', () => {
      beforeEach(() => {
        cy.get('.reset').click()
      })

      it('shows inverted viewport', () => {
        cy.get('.invert-control').click()
        cy.get('.viewer1').find('[data-cy-invert]').contains('true')
        cy.percySnapshot()
      })

      it('shows hflipped viewport', () => {
        cy.get('.hflip-control').click()
        cy.get('.viewer1').find('[data-cy-hflip]').contains('true')
        cy.percySnapshot()
      })

      it('shows vflipped viewport', () => {
        cy.get('.vflip-control').click()
        cy.get('.viewer1').find('[data-cy-vflip]').contains('true')
        cy.percySnapshot()
      })

      it('shows rotated viewport', () => {
        const value = 90
        cy.get('.rotation-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-rotation]').contains(value.toFixed(0))
        cy.percySnapshot()
      })

      it('shows x-transitioned viewport', () => {
        const value = 20
        cy.get('.x-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-x]').contains(value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows y-transitioned viewport', () => {
        const value = 50
        cy.get('.y-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-y]').contains(value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows zoomed viewport', () => {
        const value = 2
        cy.get('.scale-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-scale]').contains(value)
        cy.percySnapshot()
      })

      it('shows window-width viewport', () => {
        const value = 240
        cy.get('.window-width-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-window-width]').contains(value.toFixed(2))
        cy.percySnapshot()
      })

      it('shows window-center viewport', () => {
        const value = 150
        cy.get('.window-center-control').controlledInputChange(value)
        cy.get('.viewer1').find('[data-cy-window-center]').contains(value.toFixed(2))
        cy.percySnapshot()
      })

      it('changes multiple viewport properties', () => {
        const value = {
          invert: 'true',
          vflip: 'true',
          x: 60,
          scale: 0.7,
          rotation: 90,
          windowWidth: 160,
          windowCenter: 50,
        }

        cy.get('.invert-control').click()
        cy.get('.vflip-control').click()
        cy.get('.x-control').controlledInputChange(value.x)
        cy.get('.scale-control').controlledInputChange(value.scale)
        cy.get('.rotation-control').controlledInputChange(value.rotation)
        cy.get('.window-width-control').controlledInputChange(value.windowWidth)
        cy.get('.window-center-control').controlledInputChange(value.windowCenter)

        cy.get('.viewer1').find('[data-cy-invert]').contains(value.invert)
        cy.get('.viewer1').find('[data-cy-vflip]').contains(value.vflip)
        cy.get('.viewer1').find('[data-cy-x]').contains(value.x.toFixed(2))
        cy.get('.viewer1').find('[data-cy-scale]').contains(value.scale)
        cy.get('.viewer1').find('[data-cy-rotation]').contains(value.rotation.toFixed(0))
        cy.get('.viewer1').find('[data-cy-window-width]').contains(value.windowWidth.toFixed(2))
        cy.get('.viewer1').find('[data-cy-window-center]').contains(value.windowCenter.toFixed(2))
        cy.percySnapshot()
      })

      it('changes viewport with keyboard', () => {
        cy.get('body').type('wwddd')
        cy.percySnapshot()
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

        cy.get('.viewer1').find('[data-cy-x]').contains(value.x.toFixed(2))
        cy.get('.viewer1').find('[data-cy-y]').contains(value.y.toFixed(2))
        cy.get('.viewer2').find('[data-cy-x]').contains(value.x2.toFixed(2))
        cy.get('.viewer2').find('[data-cy-y]').contains(value.y2.toFixed(2))
        cy.percySnapshot()
      })
    })
  }
)
