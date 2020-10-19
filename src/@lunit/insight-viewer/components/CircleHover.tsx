import React, { Component } from 'react';
import styled from 'styled-components';
import { FrameConsumer } from '../context/frame';
import { hitTestCircles } from '../geom/hitTestCircles';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';

export interface CircleHoverProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;

  /** Contour 데이터를 상속받은 Annotation 데이터 */
  contours: T[];

  /**
   * Hover 기능 활성화 여부
   * HTMLElement로 입력할 경우 MouseEvent를 해당 HTMLElement를 사용해서 처리한다
   */
  hover: boolean | HTMLElement | null;

  /**
   * 특정 Contour에 Mouse Over 되었을 때
   * focusedContour를 결정하는데 필요하다
   */
  onFocus: (contour: T | null) => void;

  className?: string;
}

interface CircleHoverState {
  p1: Point | null;
  p2: Point | null;
}

export class CircleHoverBase<T extends Contour> extends Component<CircleHoverProps<T>, CircleHoverState> {
  private svg: SVGSVGElement | null = null;
  private element: HTMLElement | null = null;
  private focused: T | null = null;

  private contentWindow: Window = window;

  constructor(props: CircleHoverProps<T>) {
    super(props);

    this.state = {
      p1: null,
      p2: null,
    };
  }

  render() {
    return (
      <>
        <FrameConsumer stateRef={({ contentWindow }) => (this.contentWindow = contentWindow)} />
        <svg
          ref={this.svgRef}
          role="figure"
          width={this.props.width}
          height={this.props.height}
          className={this.props.className}
        ></svg>
      </>
    );
  }

  svgRef = (svg: SVGSVGElement) => {
    if (svg && this.svg && this.element) {
      this.deactivateInitialEvents();

      if (this.canActivate(this.props)) {
        this.svg = svg;
        this.element = this.getElement(this.props);
        this.activateInitialEvents();
      }
    }

    this.svg = svg;
  };

  componentDidMount() {
    if (!this.svg) throw new Error('<svg> is not initialized');

    if (this.canActivate(this.props)) {
      this.element = this.getElement(this.props);
      this.activateInitialEvents();
    }
  }

  componentDidUpdate(prevProps: Readonly<CircleHoverProps<T>>) {
    if (prevProps.hover !== this.props.hover) {
      if (this.element) this.deactivateInitialEvents();

      if (this.canActivate(this.props)) {
        this.element = this.getElement(this.props);
        this.activateInitialEvents();
      }
    }
  }

  componentWillUnmount() {
    if (this.element) this.deactivateInitialEvents();
  }

  getElement = ({ hover }: Readonly<CircleHoverProps<T>>): HTMLElement => {
    return hover instanceof this.contentWindow['HTMLElement']
      ? (hover as HTMLElement)
      : ((this.svg as unknown) as HTMLElement);
  };

  canActivate = ({ hover }: Readonly<CircleHoverProps<T>>) => {
    return hover instanceof this.contentWindow['HTMLElement'] || hover === true;
  };

  // ---------------------------------------------
  // initial events
  // ---------------------------------------------
  activateInitialEvents = () => {
    if (this.element) this.element.addEventListener('mousemove', this.onMouseMoveToFindFocus);
  };

  deactivateInitialEvents = () => {
    if (this.element) this.element.removeEventListener('mousemove', this.onMouseMoveToFindFocus);
  };

  onMouseMoveToFindFocus = (event: MouseEvent) => {
    this.findFocus(event.pageX, event.pageY);
  };

  findFocus = (pageX: number, pageY: number) => {
    if (!this.props.contours || this.props.contours.length === 0 || !this.props.cornerstoneRenderData) return;

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, pageX, pageY);

    this.focused = hitTestCircles(this.props.contours, [x, y]);

    this.props.onFocus(this.focused);
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CircleHover: new <T extends Contour>() => CircleHoverBase<T> = styled(CircleHoverBase)`
  position: absolute;
  top: 0;
  left: 0;
` as any;
