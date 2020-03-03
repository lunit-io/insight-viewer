import React, { Component, ComponentType, MouseEvent } from 'react';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';
import { PointPin, PointPinProps } from './PointPin';

export interface PointDrawerProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;
  contours: T[];
  focusedContour: T | null;
  interact?: boolean;
  onFocus?: (contour: T | null) => void;
  onAdd?: (polygon: Point[], event: MouseEvent) => void;
  onRemove?: (contour: T) => void;
  className?: string;
  pointPinComponent?: ComponentType<PointPinProps>;
  pointPinFunction?: (contour: T) => ComponentType<PointPinProps>;
}

function toLocal(element: HTMLElement, point: Point): { x: number; y: number } {
  return cornerstone.pixelToCanvas(element, { x: point[0], y: point[1] });
}

export class PointViewer<T extends Contour> extends Component<PointDrawerProps<T>, {}> {
  render() {
    return (
      <svg
        role="figure"
        width={this.props.width}
        height={this.props.height}
        className={this.props.className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: this.props.width,
          height: this.props.height,
          userSelect: 'none',
          pointerEvents: this.props.interact === true ? 'auto' : 'none',
        }}
        onClick={this.onPointAdd}
      >
        {this.props.cornerstoneRenderData &&
          this.props.contours &&
          this.props.contours.length > 0 &&
          this.props.contours.map(contour => {
            const { id, polygon, dataAttrs = {}, label } = contour;

            const Pin: ComponentType<PointPinProps> =
              typeof this.props.pointPinFunction === 'function'
                ? this.props.pointPinFunction(contour)
                : this.props.pointPinComponent || PointPin;

            const text: string =
              typeof label === 'function' ? label(contour) : typeof label === 'string' ? label : id.toString();

            return (
              <Pin
                key={id}
                {...toLocal(this.props.cornerstoneRenderData!.element, polygon[0])}
                {...dataAttrs}
                data-id={id}
                data-focused={contour === this.props.focusedContour || undefined}
                label={text}
                onEnter={() => this.onPointEnter(contour)}
                onLeave={() => this.onPointLeave()}
                onRemove={() => this.onPointRemove(contour)}
              />
            );
          })}
      </svg>
    );
  }

  private onPointAdd = (event: MouseEvent<SVGSVGElement>) => {
    if (
      typeof this.props.onAdd === 'function' &&
      this.props.cornerstoneRenderData &&
      this.props.cornerstoneRenderData.element
    ) {
      const element: HTMLElement = this.props.cornerstoneRenderData.element;
      const { x, y } = cornerstone.pageToPixel(element, event.pageX, event.pageY);
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

/**
 * @deprecated use PointViewer instead
 */
export const UserPointViewer = PointViewer;
