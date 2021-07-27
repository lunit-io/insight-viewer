import { LOADING_STATUS } from './const'

export type LoadingStatus = typeof LOADING_STATUS[keyof typeof LOADING_STATUS]
