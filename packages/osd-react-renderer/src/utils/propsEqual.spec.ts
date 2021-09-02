import propsEqual from './propsEqual'

describe('propsEqual:', () => {
  it('returns true if props is equal', () => {
    const a = { foo: 'bar' }
    const b = { foo: 'bar' }
    expect(propsEqual(a, b)).toEqual(true)
  })
  it('returns false if props is not equal', () => {
    const a = { foo: 'bar' }
    const b = { foo: 'baz' }
    expect(propsEqual(a, b)).toEqual(false)
  })
  it('returns false when deep comparison fails', () => {
    const a = { foo: { bar: 'baz' } }
    const b = { foo: { bar: 'buzz' } }
    expect(propsEqual(a, b)).toEqual(false)
  })
  it('does not recurse on null prop', () => {
    const a = { foo: null }
    const b = { foo: { bar: 'buzz' } }
    expect(propsEqual(a, b)).toEqual(false)
  })
})
