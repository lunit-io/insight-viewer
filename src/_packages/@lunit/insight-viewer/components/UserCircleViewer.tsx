import { pixelToCanvas } from 'cornerstone-core';
import React, { Component, createRef, Fragment, RefObject } from 'react';
import styled from 'styled-components';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';

export interface UserCircleViewerProps extends InsightViewerGuestProps {
  width: number;
  height: number;
  contours: Contour[];
  focusedContour: Contour | null;
  className?: string;
}

function toLocal(element: HTMLElement, polygon: Point[]): {cx: number, cy: number, r: number} {
  const {x: x1, y: y1} = pixelToCanvas(element, {x: polygon[0][0], y: polygon[0][1]});
  const {x: x2, y: y2} = pixelToCanvas(element, {x: polygon[1][0], y: polygon[1][1]});
  const r: number = Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));
  
  return {
    cx: x1,
    cy: y1,
    r,
  };
}

export class UserCircleViewer extends Component<UserCircleViewerProps, {}> {
  private svgRef: RefObject<SVGSVGElement> = createRef();
  
  render() {
    const {cornerstoneRenderData, contours, focusedContour} = this.props;
    
    return (
      <Svg ref={this.svgRef}
           className={this.props.className}
           width={this.props.width}
           height={this.props.height}>
        {
          contours.length > 0 &&
          cornerstoneRenderData &&
          cornerstoneRenderData.element &&
          contours.map(contour => {
            const {cx, cy, r} = toLocal(cornerstoneRenderData.element, contour.polygon);
            const focused: boolean = contour === focusedContour;
            const dataAttrs: {[attr: string]: string} = contour.dataAttrs || {};
            
            return (
              <Fragment key={'circle' + contour.id}>
                <circle {...dataAttrs}
                        data-id={contour.id}
                        data-focused={focused || undefined}
                        cx={cx}
                        cy={cy}
                        r={r}/>
                <text {...dataAttrs}
                      data-id={contour.id}
                      data-focused={focused || undefined}
                      fontSize={14 * Math.max(1, cornerstoneRenderData.viewport.scale)}
                      x={cx}
                      y={cy}>
                  {
                    contour.label
                      ? typeof contour.label === 'function'
                      ? contour.label(contour)
                      : contour.label
                      : contour.id
                  }
                </text>
              </Fragment>
            );
          })
        }
      </Svg>
    );
  }
}

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  
  > circle {
    stroke-width: 3px;
    stroke: rgba(255,194,17,0.9);
    fill: rgba(0, 0, 0, 0.2);
    
    &[data-focused] {
      stroke-width: 6px;
      stroke: rgb(255,86,60);
      fill: rgba(0, 0, 0, 0.2);
    }
  }
  
  > text {
    fill: rgba(255,194,17,0.9);
    font-family: proximanova,noto_sans,sans-serif;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: central;
    
    &[data-focused] {
      fill: rgb(255,86,60);
    }
  }
`;