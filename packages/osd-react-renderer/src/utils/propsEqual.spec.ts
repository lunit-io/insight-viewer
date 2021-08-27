import propsEqual from './propsEqual'

describe('propsEqual:', () => {
  it('return true if props is equal', () => {
    const a = { foo: 'bar' }
    const b = { foo: 'bar' }
    expect(propsEqual(a, b)).toEqual(true)
  })
})
