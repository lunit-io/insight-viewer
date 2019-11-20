import { canvasToPixel, pixelToCanvas } from 'cornerstone-core';
import React, { Component, MouseEvent } from 'react';
import styled from 'styled-components';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';
import { PointPin } from './PointPin';

export interface UserPointDrawerProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;
  contours: T[];
  focusedContour: T | null;
  interact?: boolean;
  onFocus?: (contour: T | null) => void;
  onAdd?: (polygon: Point[], event: MouseEvent) => void;
  onRemove?: (contour: T) => void;
  className?: string;
}

interface UserPointDrawerState {
}

function toLocal(element: HTMLElement, point: Point): {x: number, y: number} {
  return pixelToCanvas(element, {x: point[0], y: point[1]});
}

export class UserPointViewer<T extends Contour> extends Component<UserPointDrawerProps<T>, UserPointDrawerState> {
  render() {
    return (
      <Svg role="figure"
           width={this.props.width}
           height={this.props.height}
           className={this.props.className}
           style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: this.props.width,
             height: this.props.height,
             pointerEvents: this.props.interact === true ? 'auto' : 'none',
           }}
           onClick={this.onPointAdd}>
        {
          this.props.cornerstoneRenderData &&
          this.props.contours &&
          this.props.contours.length > 0 &&
          this.props.contours.map(contour => {
            const {id, polygon, dataAttrs = {}, label} = contour;
            
            const text: string = typeof label === 'function'
              ? label(contour)
              : typeof label === 'string'
                ? label
                : id.toString();
            
            return (
              <PointPin key={id}
                        {...toLocal(this.props.cornerstoneRenderData!.element, polygon[0])}
                        {...dataAttrs}
                        label={text}
                        aria-selected={contour === this.props.focusedContour}
                        onEnter={() => this.onPointEnter(contour)}
                        onLeave={() => this.onPointLeave()}
                        onRemove={() => this.onPointRemove(contour)}/>
            );
          })
        }
      </Svg>
    );
  }
  
  private onPointAdd = (event: MouseEvent<SVGSVGElement>) => {
    if (typeof this.props.onAdd === 'function' && this.props.cornerstoneRenderData && this.props.cornerstoneRenderData.element) {
      const element: HTMLElement = this.props.cornerstoneRenderData.element;
      const {left, top} = element.getBoundingClientRect();
      const {x, y} = canvasToPixel(element, {x: event.pageX - left, y: event.pageY - top});
      this.props.onAdd([[x, y]], event);
    }
  };
  
  private onPointEnter = (contour: T) => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(contour);
    }
  };
  
  private onPointLeave = () => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(null);
    }
  };
  
  private onPointRemove = (contour: T) => {
    if (typeof this.props.onRemove === 'function') {
      this.props.onRemove(contour);
    }
  };
}

const Svg = styled.svg`
  > g {
    cursor: pointer;
      
    circle {
      fill: #000000;
    }
    
    path {
      fill: rgb(255,224,0);
    }
    
    text {
      text-anchor: middle;
      fill: #ffffff;
      font-size: 12px;
    }
    
    &[aria-selected="true"] {
      path {
        fill: rgb(255,247,255);
      }
    }
  }
`;
