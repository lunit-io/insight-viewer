import { mockPixelToCanvas } from '../../mocks/utils'
import { getPolyViewerInfo, GetPolyViewerInfoProps } from './getPolyViewerInfo'

describe('getPolyViewerInfo: ', () => {
  it('should return correct poly viewer info', () => {
    const MOCK_PARAM_1: GetPolyViewerInfoProps = {
      annotation: {
        id: 2,
        labelPosition: [183.05142857142854, 171.4685714285714],
        lineWidth: 1.5,
        type: 'line',
        points: [
          [185.05142857142854, 176.4685714285714],
          [428.61714285714277, 102.5942857142857],
        ],
        hasArrowHead: false,
      },
      showOutline: true,
      hoveredAnnotation: {
        id: 3,
        labelPosition: [284.71999999999997, 34.69142857142857],
        lineWidth: 1.5,
        type: 'line',
        points: [
          [286.71999999999997, 39.69142857142857],
          [236.9828571428571, 274.47999999999996],
        ],
        hasArrowHead: true,
      },
      pixelToCanvas: mockPixelToCanvas,
    }
    const MOCK_PARAM_2: GetPolyViewerInfoProps = {
      annotation: {
        id: 4,
        labelPosition: [269.35999999999996, 29.57142857142857],
        lineWidth: 1.5,
        type: 'line',
        points: [
          [271.35999999999996, 34.57142857142857],
          [260.38857142857137, 446.3657142857142],
        ],
        hasArrowHead: true,
      },
      showOutline: true,
      hoveredAnnotation: null,
      pixelToCanvas: mockPixelToCanvas,
    }

    const MOCK_PARAM_3: GetPolyViewerInfoProps = {
      annotation: {
        id: 6,
        labelPosition: [222.9142857142857, 198.53142857142853],
        lineWidth: 1.5,
        type: 'line',
        points: [
          [404.47999999999996, 145.01714285714283],
          [45.34857142857142, 262.04571428571427],
        ],
        hasArrowHead: true,
      },
      showOutline: true,
      hoveredAnnotation: null,
      pixelToCanvas: mockPixelToCanvas,
    }

    expect(getPolyViewerInfo(MOCK_PARAM_1)).toStrictEqual({
      headPoints: null,
      isHoveredAnnotation: false,
      labelPosition: [183.05142857142854, 171.4685714285714],
      polygonLabel: 2,
      polygonPoints: '185.05142857142854,176.4685714285714 428.61714285714277,102.5942857142857',
    })
    expect(getPolyViewerInfo(MOCK_PARAM_2)).toStrictEqual({
      headPoints:
        '271.226832335984,39.569654894161516,273.72554340948165,39.53672860041551,271.35999999999996,34.57142857142857,268.7334194241301,39.40372352087683,271.226832335984,39.569654894161516',
      isHoveredAnnotation: false,
      labelPosition: [269.35999999999996, 29.57142857142857],
      polygonLabel: 4,
      polygonPoints: '271.35999999999996,34.57142857142857 260.38857142857137,446.3657142857142',
    })
    expect(getPolyViewerInfo(MOCK_PARAM_3)).toStrictEqual({
      headPoints:
        '399.72604070346966,146.56629456273313,400.5942405488648,148.90955515389575,404.47999999999996,145.01714285714283,399.04698020347945,144.16139996899463,399.72604070346966,146.56629456273313',
      isHoveredAnnotation: false,
      labelPosition: [222.9142857142857, 198.53142857142853],
      polygonLabel: 6,
      polygonPoints: '404.47999999999996,145.01714285714283 45.34857142857142,262.04571428571427',
    })
  })
})
