import '@percy/cypress'
import { setup } from '../support/utils'

describe('Basic Viewer', () => {
  before(() => {
    setup()
  })

  it('is working', () => {
    cy.visit('/')
    cy.percySnapshot()
    // TODO: 이미지 변경 테스트
  })
})
