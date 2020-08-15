import React, { Component, ComponentType, MouseEvent } from 'react';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';
import { PointPin, PointPinProps } from './PointPin';

export interface PointDrawerProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;

  /** Contour 데이터를 상속받은 Annotation 데이터 */
  contours: T[];

  /** Mouse Over 등 User Interaction에 의해서 Focus 된 Contour */
  focusedContour: T | null;

  /** Draw / Focus / Remove 와 같은 User Interaction을 활성 / 비활성 한다 */
  interact?: boolean;

  /**
   * 특정 Contour에 Mouse Over 되었을 때
   * focusedContour를 결정하는데 필요하다
   */
  onFocus?: (contour: T | null) => void;

  /** 그리기가 완료되어 새로운 Contour가 발생했을 때 */
  onAdd?: (polygon: Point[], event: MouseEvent) => void;

  /** 특정 Contour를 Click 해서 지울때 필요하다 */
  onRemove?: (contour: T) => void;

  className?: string;

  /** Pin의 모양을 변경하는데 사용할 수 있다 */
  pointPinComponent?: ComponentType<PointPinProps>;

  /** Contour 데이터에 따라 Pin을 다르게 하고 싶은 경우 사용할 수 있다 */
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
          this.props.contours.map((contour) => {
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
