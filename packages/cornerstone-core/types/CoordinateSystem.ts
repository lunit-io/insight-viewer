interface CoordinateSystem {
  x: number
  y: number
}
export interface CanvasCoordinate extends CoordinateSystem {
  _canvasCoordinateBrand: string
}
export interface PixelCoordinate extends CoordinateSystem {
  _pixelCoordinateBrand: string
}
