import { formatViewerViewport, formatCornerstoneViewport, DefaultViewport } from './formatViewport'
import { CORNERSTONE_VIEWPORT_MOCK } from '../../mocks/const'

describe('formatViewerViewport:', () => {
  it('cornerstone viewport should be formatted', () => {
    expect(formatViewerViewport(CORNERSTONE_VIEWPORT_MOCK)).toEqual({
      scale: CORNERSTONE_VIEWPORT_MOCK.scale,
      invert: CORNERSTONE_VIEWPORT_MOCK.invert,
      hflip: CORNERSTONE_VIEWPORT_MOCK.hflip,
      vflip: CORNERSTONE_VIEWPORT_MOCK.vflip,
      rotation: CORNERSTONE_VIEWPORT_MOCK.rotation,
      x: CORNERSTONE_VIEWPORT_MOCK.translation.x,
      y: CORNERSTONE_VIEWPORT_MOCK.translation.y,
      windowWidth: CORNERSTONE_VIEWPORT_MOCK.voi.windowWidth,
      windowCenter: CORNERSTONE_VIEWPORT_MOCK.voi.windowCenter,
      _viewportOptions: {
        fitScale: true,
      },
    })
  })

  it('undefined cornerstone viewport should be default viewport context value', () => {
    expect(formatViewerViewport(undefined)).toEqual(DefaultViewport)
  })
})

describe('formatCornerstoneViewport:', () => {
  const viewportData = {
    colormap: undefined,
    hflip: false,
    invert: false,
    labelmap: false,
    modalityLUT: undefined,
    pixelReplication: false,
    rotation: 0,
    scale: 0.9765625,
    translation: { x: 0, y: 0 },
    vflip: false,
    voi: { windowWidth: 90, windowCenter: 32 },
    voiLUT: undefined,
  }

  describe('single viewport property should be formatted', () => {
    describe('scale/invert/hflip/vflip viewport property', () => {
      it('scale', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            scale: 0,
          })
        ).toEqual({ ...viewportData, scale: 0 })
      })
      it('invert', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            invert: true,
          })
        ).toEqual({ ...viewportData, invert: true })
      })
      it('hflip', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            hflip: true,
          })
        ).toEqual({ ...viewportData, hflip: true })
      })
      it('vflip', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            vflip: false,
          })
        ).toEqual({ ...viewportData, vflip: false })
      })
      it('roration', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            rotation: 90,
          })
        ).toEqual({ ...viewportData, rotation: 90 })
      })
    })

    describe('translation/voi viewport property', () => {
      it('x', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            x: 10,
          })
        ).toEqual({
          ...viewportData,
          translation: { x: 10, y: viewportData.translation.y },
        })
      })
      it('y', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            y: 10,
          })
        ).toEqual({
          ...viewportData,
          translation: { x: viewportData.translation.x, y: 10 },
        })
      })
      it('windowWidth', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            windowWidth: 10,
          })
        ).toEqual({
          ...viewportData,
          // voi: { windowWidth: 90, windowCenter: 32 },
          voi: {
            windowWidth: 10,
            windowCenter: viewportData.voi.windowCenter,
          },
        })
      })
      it('windowCenter', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            windowCenter: 10,
          })
        ).toEqual({
          ...viewportData,
          voi: { windowWidth: viewportData.voi.windowWidth, windowCenter: 10 },
        })
      })
    })

    describe('multiple viewport properties', () => {
      it('scale + invert', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            scale: 20,
            invert: false,
          })
        ).toEqual({ ...viewportData, scale: 20, invert: false })
      })
      it('scale + invert + hflip + vflip', () => {
        expect(
          formatCornerstoneViewport(viewportData, {
            scale: 10,
            invert: false,
            hflip: true,
            vflip: true,
          })
        ).toEqual({
          ...viewportData,
          scale: 10,
          invert: false,
          hflip: true,
          vflip: true,
        })
      })
    })
    it('x + y', () => {
      expect(
        formatCornerstoneViewport(viewportData, {
          x: 10,
          y: 10,
        })
      ).toEqual({ ...viewportData, translation: { x: 10, y: 10 } })
    })
    it('windowWidth + windowCenter', () => {
      expect(
        formatCornerstoneViewport(viewportData, {
          windowWidth: 50,
          windowCenter: 50,
        })
      ).toEqual({
        ...viewportData,
        voi: { windowWidth: 50, windowCenter: 50 },
      })
    })
    it('x + windowWidth + windowCenter', () => {
      expect(
        formatCornerstoneViewport(viewportData, {
          x: 100,
          windowWidth: 80,
          windowCenter: 90,
        })
      ).toEqual({
        ...viewportData,
        translation: { x: 100, y: viewportData.translation.y },
        voi: { windowWidth: 80, windowCenter: 90 },
      })
    })
  })

  describe('invalid custom viewport should be ignored', () => {
    it('undefined viewport', () => {
      expect(formatCornerstoneViewport(viewportData, undefined)).toEqual({
        ...viewportData,
      })
    })
    it('empty object viewport', () => {
      expect(formatCornerstoneViewport(viewportData, {})).toEqual({
        ...viewportData,
      })
    })
  })
})
