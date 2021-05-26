import WithCookie from './WithCookie'
import WithJwt from './WithJwt'

function Basic(): JSX.Element {
  return (
    <>
      <WithCookie />
      <WithJwt />
    </>
  )
}

export default Basic
