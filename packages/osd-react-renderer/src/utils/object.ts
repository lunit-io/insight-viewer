export function hasOwnProperty<O extends Record<PropertyKey, unknown>>(
  object: O,
  key: PropertyKey
): key is keyof O {
  return Object.prototype.hasOwnProperty.call(object, key)
}
