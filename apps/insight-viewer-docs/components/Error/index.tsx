export default function Error({ statusCode }: { statusCode: number }): JSX.Element {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
}
