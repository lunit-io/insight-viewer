import OpenSeadragon from 'openseadragon'
import ReactReconciler from 'react-reconciler'
import { HostConfig } from './HostConfig/type'

const rootHostContext = {}
const childHostContext = {}

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

  createInstance(type, props) {
    if (type === 'tiledImage') {
      return { type: 'TiledImage', url: props.url }
    }
    if (type === 'viewport') {
      return { type: 'Viewport', zoom: props.zoom, rotation: props.rotation }
    }
    return { type: 'Invalid' }
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

  appendChildToContainer(container, child) {
    if (child == null) {
      return
    }
    if (child.type === 'TiledImage') {
      container.open(child.url)
    } else if (child.type === 'Viewport') {
      // @todo
    }
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
    const container = reconciler.createContainer(viewer, 0, false, null)
    reconciler.updateContainer(reactElement, container, null, callback)
  },
}

export default ReactOSDDOM
