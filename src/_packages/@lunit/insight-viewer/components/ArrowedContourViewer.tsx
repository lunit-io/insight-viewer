import { drawArrow, getAngledTextPosition } from '@lunit/insight-draw';
import { ArrowedContour, InsightViewerGuestProps, Point } from '@lunit/insight-viewer';
import React, { Component, createRef, CSSProperties, Fragment, RefObject } from 'react';
import styled from 'styled-components';

export interface ArrowedContourViewerProps<T extends ArrowedContour> extends InsightViewerGuestProps {
  width: number;
  height: number;

  /** Contour 데이터를 상속받은 Annotation 데이터 */
  contours: T[];

  /** Mouse Over 등 User Interaction에 의해서 Focus 된 Contour */
  focusedContour: T | null;

  /** <svg className={}> */
  className?: string;

  /** <svg style={}> */
  style?: CSSProperties;

  /**
   * Line에 외곽을 그려준다
   * Line을 두 개 그려서 border를 표현하기 때문에,성능에 민감한 상황인 경우 비활성 시킬 수 있다.
   */
  border?: boolean;

  /**
   * Arrow Styles
   */
  arrowWidth?: number;
  arrowDepth?: number;
  lineWidth?: number;

  baseFontSize?: number;
}

function toLocal(element: HTMLElement, polygon: Point[]): Point[] {
  return polygon.map(([x, y]) => {
    const p = cornerstone.pixelToCanvas(element, { x, y });
    return [p.x, p.y];
  });
}

export class ArrowedContourViewerBase<T extends ArrowedContour> extends Component<ArrowedContourViewerProps<T>, {}> {
  static defaultProps: Partial<ArrowedContourViewerProps<ArrowedContour>> = {
    border: true,
    arrowDepth: 7,
    arrowWidth: 10,
    lineWidth: 3,
    baseFontSize: 18,
  };

  private svgRef: RefObject<SVGSVGElement> = createRef();

  render() {
    const { cornerstoneRenderData, contours, focusedContour } = this.props;

    return (
      <svg
        ref={this.svgRef}
        className={this.props.className}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      >
        {contours.length > 0 &&
          cornerstoneRenderData &&
          cornerstoneRenderData.element &&
          contours.map((contour) => {
            const polygon: number[][] = toLocal(cornerstoneRenderData.element, contour.polygon);
            const arrowPolygon: number[][] = toLocal(
              cornerstoneRenderData.element,
              drawArrow({
                start: contour.arrowStart,
                end: contour.arrowEnd,
                lineWidth: this.props.lineWidth!,
                arrowDepth: this.props.arrowDepth!,
                arrowWidth: this.props.arrowWidth!,
              }),
            );
            const focused: boolean = contour === focusedContour;
            const dataAttrs: { [attr: string]: string } = contour.dataAttrs || {};

            const fontSize: number = Math.floor(
              this.props.baseFontSize! * Math.max(1, cornerstoneRenderData.viewport.scale),
            );

            const [start, end] = toLocal(cornerstoneRenderData.element, [contour.arrowStart, contour.arrowEnd]);

            const labelPosition = getAngledTextPosition({
              start,
              end,
              fontSize,
            });

            return (
              <Fragment key={'polygon' + contour.id}>
                {this.props.border === true && (
                  <polygon
                    {...dataAttrs}
                    data-polygon="contour"
                    data-border="border"
                    data-id={contour.id}
                    data-focused={focused || undefined}
                    points={polygon.map(([x, y]) => `${x},${y}`).join(' ')}
                  />
                )}
                <polygon
                  {...dataAttrs}
                  data-polygon="contour"
                  data-id={contour.id}
                  data-focused={focused || undefined}
                  points={polygon.map(([x, y]) => `${x},${y}`).join(' ')}
                />
                {this.props.border === true && (
                  <polygon
                    {...dataAttrs}
                    data-polygon="arrow"
                    data-border="border"
                    data-id={contour.id}
                    data-focused={focused || undefined}
                    points={arrowPolygon.map(([x, y]) => `${x},${y}`).join(' ')}
                  />
                )}
                <polygon
                  {...dataAttrs}
                  data-polygon="arrow"
                  data-id={contour.id}
                  data-focused={focused || undefined}
                  points={arrowPolygon.map(([x, y]) => `${x},${y}`).join(' ')}
                />
                {this.props.border === true && (
                  <text
                    {...dataAttrs}
                    data-border="border"
                    data-id={contour.id}
                    data-focused={focused || undefined}
                    fontSize={fontSize}
                    {...labelPosition}
                  >
                    {contour.label
                      ? typeof contour.label === 'function'
                        ? contour.label(contour)
                        : contour.label
                      : contour.id}
                  </text>
                )}
                <text
                  {...dataAttrs}
                  data-id={contour.id}
                  data-focused={focused || undefined}
                  fontSize={fontSize}
                  {...labelPosition}
                >
                  {contour.label
                    ? typeof contour.label === 'function'
                      ? contour.label(contour)
                      : contour.label
                    : contour.id}
                </text>
              </Fragment>
            );
          })}
      </svg>
    );
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ArrowedContourViewer: new <T extends ArrowedContour>() => ArrowedContourViewerBase<T> = styled(
  ArrowedContourViewerBase,
)`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;

  --color: #ffffff;
  --focused-color: rgb(255, 194, 17);
  --stroke-width: 3px;
  --focused-stroke-width: 6px;
  --fill-color: rgba(0, 0, 0, 0.2);
  --focused-fill-color: rgba(0, 0, 0, 0.4);

  > polygon[data-polygon='contour'] {
    stroke-width: var(--contour-viewer-stroke-width, var(--stroke-width));
    stroke: var(--contour-viewer-color, var(--color));
    fill: var(--contour-viewer-fill-color, var(--fill-color));
    transition: stroke 120ms ease-out, stroke-width 120ms ease-out;

    &[data-focused] {
      stroke-width: var(--contour-viewer-focused-stroke-width, var(--focused-stroke-width));
      stroke: var(--contour-viewer-focused-color, var(--focused-color));
      fill: var(--contour-viewer-focused-fill-color, var(--focused-fill-color));
    }

    &[data-border] {
      stroke-width: calc(var(--contour-viewer-stroke-width, var(--stroke-width)) + 2px);
      stroke: #000000;
      fill: transparent;

      &[data-focused] {
        stroke-width: calc(var(--contour-viewer-focused-stroke-width, var(--focused-stroke-width)) + 2px);
        stroke: #000000;
      }
    }
  }

  > polygon[data-polygon='arrow'] {
    fill: var(--contour-viewer-color, var(--color));
    transition: fill 120ms ease-out;

    &[data-focused] {
      fill: var(--contour-viewer-focused-color, var(--focused-color));
    }

    &[data-border] {
      stroke-width: calc(var(--contour-viewer-stroke-width, var(--stroke-width)));
      stroke: #000000;
      fill: transparent;
    }
  }

  > text {
    fill: var(--contour-viewer-color, var(--color));
    font-family: proximanova, noto_sans, sans-serif;
    font-weight: 600;
    transition: fill 120ms ease-out, stroke-width 120ms ease-out;

    &[data-focused] {
      fill: var(--contour-viewer-focused-color, var(--focused-color));
    }

    &[data-border] {
      stroke-width: 4px;
      stroke: #000000;
      fill: transparent;
    }
  }
` as any;
