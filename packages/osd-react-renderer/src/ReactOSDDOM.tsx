import OpenSeadragon from 'openseadragon'
import ReactReconciler from 'react-reconciler'
import { HostConfig } from './HostConfig/type'
import { createInstance } from './elements'
import Root from './elements/Root'
import Base from './elements/Base'

const rootHostContext = {}
const childHostContext = {}

const shouldReplaceLink = (type: string, props: HostConfig.Props) =>
  type === 'LINK' &&
  (typeof props.children === 'string' ||
    typeof props.children === 'number' ||
    Array.isArray(props.children) ||
    props.render)

const reconciler = ReactReconciler<
  HostConfig.Type,
  HostConfig.Props,
  HostConfig.Container,
  HostConfig.Instance,
  HostConfig.TextInstance,
  HostConfig.SuspenseInstance,
  HostConfig.HydratableInstance,
  HostConfig.PublicInstance,
  HostConfig.HostContext,
  HostConfig.UpdatePayload,
  HostConfig.ChildSet,
  HostConfig.TimeoutHandle,
  HostConfig.NoTimeout
>({
  /* configuration for how to talk to the host env */
  /* or aka "host config" */

  supportsMutation: true,

  supportsPersistence: false,

  createInstance(type, props, internalInstanceHandle) {
    const instanceType = shouldReplaceLink(type, props) ? 'TEXT' : type
    return createInstance({ type: instanceType, props }, internalInstanceHandle)
  },

  createTextInstance() {
    return { type: 'Invalid' }
  },

  appendInitialChild() {
    throw new Error('appendInitialChild method is called')
  },

  finalizeInitialChildren() {
    return false
  },

  prepareUpdate() {
    throw new Error('appendInitialChild method is called')
  },

  shouldSetTextContent() {
    return false
  },

  getRootHostContext() {
    return rootHostContext
  },

  getChildHostContext() {
    return childHostContext
  },

  getPublicInstance() {
    throw new Error('appendInitialChild method is called')
  },

  prepareForCommit() {
    return null
  },

  resetAfterCommit() {},

  preparePortalMount() {
    throw new Error('preparePortalMount method is called')
  },

  now() {
    throw new Error('now method is called')
  },

  scheduleTimeout() {
    throw new Error('scheduleTimeout method is called')
  },

  cancelTimeout() {
    throw new Error('scheduleTimeout method is called')
  },

  noTimeout: -1,

  isPrimaryRenderer: false,

  supportsHydration: false,

  appendChildToContainer(container, child: Base) {
    container.appendChild(child)
  },

  clearContainer() {
    return null
  },
})

const ReactOSDDOM = {
  render(
    reactElement: React.ReactNode,
    domContainer: HTMLElement,
    options: OpenSeadragon.Options,
    callback?: () => void | null
  ): void {
    const viewer = new OpenSeadragon.Viewer({
      ...options,
      element: domContainer,
    })
    const root = new Root(viewer)
    const container = reconciler.createContainer(root, 0, false, null)
    reconciler.updateContainer(reactElement, container, null, callback)
  },
}

export default ReactOSDDOM
