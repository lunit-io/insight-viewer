/* eslint-disable no-param-reassign */
import OpenSeadragon from 'openseadragon'

class Base {
  viewer: OpenSeadragon.Viewer

  children: Base[]

  _parent: Base | null = null

  get parent(): Base | null {
    return this._parent
  }

  set parent(p: Base | null) {
    this._parent = p
  }

  constructor(viewer: OpenSeadragon.Viewer) {
    this.viewer = viewer
    this.children = []
  }

  appendChild(child: Base): void {
    if (child) {
      child.parent = this
      this.children.push(child)
    }
  }

  removeChild(child: Base): void {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      child.parent = null
      this.children.splice(index, 1)
    }
  }
}

export default Base
