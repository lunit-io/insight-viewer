import { from } from 'rxjs'
import { share } from 'rxjs/operators'
import { getCornerstone } from './utils'
import { handleError } from '../common'

export const wadoImageLoader$ = from(
  Promise.all([import('cornerstone-wado-image-loader'), import('dicom-parser')])
).pipe(share())

wadoImageLoader$.subscribe({
  next: ([cornerstoneWADOImageLoader, dicomParser]) => {
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.cornerstone = getCornerstone()
    // eslint-disable-next-line no-param-reassign
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  },
  error: err => {
    handleError(err)
  },
})
