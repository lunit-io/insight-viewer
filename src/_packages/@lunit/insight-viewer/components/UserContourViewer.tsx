import { pixelToCanvas } from 'cornerstone-core';
import polylabel from 'polylabel';
import React, { Component, createRef, Fragment, RefObject } from 'react';
import styled from 'styled-components';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';

export interface UserContourViewerProps extends InsightViewerGuestProps {
  width: number;
  height: number;
  contours: Contour[];
  focusedContour: Contour | null;
  className?: string;
}

function toLocal(element: HTMLElement, polygon: Point[]): Point[] {
  return polygon.map(([x, y]) => {
    const p = pixelToCanvas(element, {x, y});
    return [p.x, p.y];
  });
}

export class UserContourViewer extends Component<UserContourViewerProps, {}> {
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
            const polygon: number[][] = toLocal(cornerstoneRenderData.element, contour.polygon);
            const labelCenter: number[] = polylabel([polygon], 1);
            const focused: boolean = contour === focusedContour;
            
            return (
              <Fragment key={'polygon' + contour.id}>
                <polygon data-focused={focused || undefined}
                         points={polygon.map(([x, y]) => `${x},${y}`).join(' ')}/>
                <text data-focused={focused || undefined}
                      fontSize={14 * Math.max(1, cornerstoneRenderData.viewport.scale)}
                      x={labelCenter[0]}
                      y={labelCenter[1]}>
                  {contour.id}
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
  
  > polygon {
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