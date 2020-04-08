import React, { Component, CSSProperties } from 'react';
import styled from 'styled-components';
import { FrameConsumer } from '../context/frame';
import { hitTestCircles } from '../geom/hitTestCircles';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';
import { dashStroke } from './animation/dashStroke';

export interface CircleDrawerProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;

  /** Contour 데이터를 상속받은 Annotation 데이터 */
  contours: T[];

  /**
   * 그리기 기능 활성화 여부
   *
   * <InsightViewer> 와 마찬가지로 HTMLElement로 입력할 경우 MouseEvent를 해당 HTMLElement를 사용해서 처리한다
   */
  draw: boolean | HTMLElement | null;

  /**
   * 특정 Contour에 Mouse Over 되었을 때
   * focusedContour를 결정하는데 필요하다
   */
  onFocus: (contour: T | null) => void;

  /** 그리기가 완료되어 새로운 Contour가 발생했을 때 */
  onAdd: (polygon: Point[], event: MouseEvent | TouchEvent) => void;

  /** 특정 Contour를 Click 해서 지울때 필요하다 */
  onRemove: (contour: T) => void;

  className?: string;
  style?: CSSProperties;

  /** 그리는 과정에서 Line에 표현되는 Animation을 비활성 시킬 수 있다 */
  animateStroke?: boolean;

  /**
   * 접근 Device 설정
   */
  device?: 'all' | 'mouse-only' | 'touch-only' | 'stylus-only' | 'mouse-and-stylus';
}

interface CircleDrawerState {
  p1: Point | null;
  p2: Point | null;
}

export class CircleDrawerBase<T extends Contour> extends Component<CircleDrawerProps<T>, CircleDrawerState> {
  static defaultProps: Partial<CircleDrawerProps<Contour>> = {
    device: 'all',
  };

  private svg: SVGSVGElement | null = null;
  private element: HTMLElement | null = null;
  private focused: T | null = null;
  private preventClickEvent: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  private contentWindow: Window = window;

  constructor(props: CircleDrawerProps<T>) {
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
          style={this.props.style}
        >
          {this.props.cornerstoneRenderData &&
            this.state.p1 &&
            this.state.p2 &&
            (() => {
              const { x: x1, y: y1 } = cornerstone.pixelToCanvas(this.props.cornerstoneRenderData.element, {
                x: this.state.p1[0],
                y: this.state.p1[1],
              });
              const { x: x2, y: y2 } = cornerstone.pixelToCanvas(this.props.cornerstoneRenderData.element, {
                x: this.state.p2[0],
                y: this.state.p2[1],
              });
              const r: number = Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));

              return (
                <>
                  <circle cx={x1} cy={y1} r={r} />
                  {this.props.animateStroke !== false && <circle cx={x1} cy={y1} r={r} data-highlight="highlight" />}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} />
                </>
              );
            })()}
        </svg>
      </>
    );
  }

  svgRef = (svg: SVGSVGElement) => {
    if (svg && this.svg && this.element) {
      this.deactivateInitialEvents();
      this.deactivateMouseDrawEvents();

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

  componentDidUpdate(prevProps: Readonly<CircleDrawerProps<T>>) {
    if (prevProps.draw !== this.props.draw) {
      if (this.element) {
        this.deactivateInitialEvents();
        this.deactivateMouseDrawEvents();
      }

      if (this.canActivate(this.props)) {
        this.element = this.getElement(this.props);
        this.activateInitialEvents();
      }
    }
  }

  componentWillUnmount() {
    if (this.element) {
      this.deactivateInitialEvents();
      this.deactivateMouseDrawEvents();
    }
  }

  getElement = ({ draw }: Readonly<CircleDrawerProps<T>>): HTMLElement => {
    //@ts-ignore
    return draw instanceof this.contentWindow['HTMLElement'] ? (draw as HTMLElement) : (this.svg as HTMLElement);
  };

  canActivate = ({ draw }: Readonly<CircleDrawerProps<T>>) => {
    return draw instanceof this.contentWindow['HTMLElement'] || draw === true;
  };

  // ---------------------------------------------
  // initial events
  // ---------------------------------------------
  activateInitialEvents = () => {
    if (!this.element) return;
    if (this.props.device !== 'touch-only' && this.props.device !== 'stylus-only') {
      this.element.addEventListener('mousemove', this.onMouseMoveToFindFocus);
      this.element.addEventListener('mousedown', this.onMouseDownToStartDraw);
    }
    if (this.props.device !== 'mouse-only') {
      this.element.addEventListener('touchstart', this.onTouchStartToStartDraw);
    }
    this.element.addEventListener('click', this.onMouseClickToRemove);
  };

  deactivateInitialEvents = () => {
    if (!this.element) return;
    this.element.removeEventListener('mousemove', this.onMouseMoveToFindFocus);
    this.element.removeEventListener('mousedown', this.onMouseDownToStartDraw);
    this.element.removeEventListener('touchstart', this.onTouchStartToStartDraw);
    this.element.removeEventListener('click', this.onMouseClickToRemove);
  };

  onMouseMoveToFindFocus = (event: MouseEvent) => {
    event.stopPropagation();

    this.findFocus(event.pageX, event.pageY);
  };

  findFocus = (pageX: number, pageY: number) => {
    if (!this.props.contours || this.props.contours.length === 0 || !this.props.cornerstoneRenderData) return;

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, pageX, pageY);

    this.focused = hitTestCircles(this.props.contours, [x, y]);

    this.props.onFocus(this.focused);
  };

  onMouseClickToRemove = (event: MouseEvent) => {
    event.stopPropagation();

    if (!this.focused || this.preventClickEvent) return;

    this.props.onRemove(this.focused);
  };

  // ---------------------------------------------
  // touch draw events
  // ---------------------------------------------
  onTouchStartToStartDraw = (event: TouchEvent) => {
    if (
      (this.props.device === 'stylus-only' || this.props.device === 'mouse-and-stylus') &&
      event.targetTouches[0].touchType !== 'stylus'
    ) {
      return;
    } else if (event.targetTouches.length > 1) {
      this.deactivateTouchDrawEvents();
      this.activateInitialEvents();
      this.setState((prevState) => ({
        ...prevState,
        p1: null,
        p2: null,
      }));
      return;
    } else if (event.targetTouches.length !== 1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }

    this.preventClickEvent = false;
    this.startX = event.targetTouches[0].pageX;
    this.startY = event.targetTouches[0].pageY;

    this.deactivateInitialEvents();
    this.activateTouchDrawEvents();

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, event.targetTouches[0].pageX, event.targetTouches[0].pageY);

    this.setState((prevState) => ({
      ...prevState,
      p1: [x, y],
    }));
  };

  activateTouchDrawEvents = () => {
    if (!this.element) return;
    this.element.addEventListener('touchmove', this.onTouchMoveToDraw);
    this.element.addEventListener('touchend', this.onTouchEndToEndDraw);
    this.element.addEventListener('touchcancel', this.onTouchEndToEndDraw);
    window.addEventListener('keydown', this.onKeyDownToCancelTouchDraw);
  };

  deactivateTouchDrawEvents = () => {
    if (!this.element) return;
    this.element.removeEventListener('touchmove', this.onTouchMoveToDraw);
    this.element.removeEventListener('touchend', this.onTouchEndToEndDraw);
    this.element.removeEventListener('touchcancel', this.onTouchEndToEndDraw);
    window.removeEventListener('keydown', this.onKeyDownToCancelTouchDraw);
  };

  onTouchMoveToDraw = (event: TouchEvent) => {
    if (event.targetTouches.length !== 1 || event.changedTouches.length !== 1) {
      this.deactivateTouchDrawEvents();
      this.activateInitialEvents();
      this.setState((prevState) => ({
        ...prevState,
        p1: null,
        p2: null,
      }));
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }

    if (
      !this.preventClickEvent &&
      Math.max(
        Math.abs(event.targetTouches[0].pageX - this.startX),
        Math.abs(event.targetTouches[0].pageY - this.startY),
      ) > 20
    ) {
      this.preventClickEvent = true;
    }

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, event.targetTouches[0].pageX, event.targetTouches[0].pageY);

    this.setState((prevState) => ({
      ...prevState,
      p2: [x, y],
    }));
  };

  onTouchEndToEndDraw = (event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.deactivateTouchDrawEvents();
    this.activateInitialEvents();

    if (this.state.p1 && this.state.p2) {
      this.props.onAdd([this.state.p1, this.state.p2], event);
    }

    this.setState((prevState) => ({
      ...prevState,
      p1: null,
      p2: null,
    }));
  };

  onKeyDownToCancelTouchDraw = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'escape') {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      this.cancelTouchDraw();
    }
  };

  cancelTouchDraw = () => {
    this.deactivateTouchDrawEvents();
    this.activateInitialEvents();

    this.setState((prevState) => ({
      ...prevState,
      p1: null,
      p2: null,
    }));
  };

  // ---------------------------------------------
  // mouse draw events
  // ---------------------------------------------
  onMouseDownToStartDraw = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }

    this.preventClickEvent = false;
    this.startX = event.pageX;
    this.startY = event.pageY;

    this.deactivateInitialEvents();
    this.activateMouseDrawEvents();

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, event.pageX, event.pageY);

    this.setState((prevState) => ({
      ...prevState,
      p1: [x, y],
    }));
  };

  activateMouseDrawEvents = () => {
    if (!this.element) return;
    this.element.addEventListener('mousemove', this.onMouseMoveToDraw);
    this.element.addEventListener('mouseup', this.onMouseUpToEndDraw);
    this.element.addEventListener('mouseleave', this.onMouseLeaveToCancelDraw);
    window.addEventListener('keydown', this.onKeyDownToCancelMouseDraw);
  };

  deactivateMouseDrawEvents = () => {
    if (!this.element) return;
    this.element.removeEventListener('mousemove', this.onMouseMoveToDraw);
    this.element.removeEventListener('mouseup', this.onMouseUpToEndDraw);
    this.element.removeEventListener('mouseleave', this.onMouseLeaveToCancelDraw);
    window.removeEventListener('keydown', this.onKeyDownToCancelMouseDraw);
  };

  onMouseMoveToDraw = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }

    if (
      !this.preventClickEvent &&
      Math.max(Math.abs(event.pageX - this.startX), Math.abs(event.pageY - this.startY)) > 20
    ) {
      this.preventClickEvent = true;
    }

    const element: HTMLElement = this.props.cornerstoneRenderData.element;

    const { x, y } = cornerstone.pageToPixel(element, event.pageX, event.pageY);

    this.setState((prevState) => ({
      ...prevState,
      p2: [x, y],
    }));
  };

  onMouseUpToEndDraw = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.deactivateMouseDrawEvents();
    this.activateInitialEvents();

    if (this.state.p1 && this.state.p2) {
      this.props.onAdd([this.state.p1, this.state.p2], event);
    }

    this.setState((prevState) => ({
      ...prevState,
      p1: null,
      p2: null,
    }));
  };

  onMouseLeaveToCancelDraw = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.cancelMouseDraw();
  };

  onKeyDownToCancelMouseDraw = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'escape') {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      this.cancelMouseDraw();
    }
  };

  cancelMouseDraw = () => {
    this.deactivateMouseDrawEvents();
    this.activateInitialEvents();

    this.setState((prevState) => ({
      ...prevState,
      p1: null,
      p2: null,
    }));
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CircleDrawer: new <T extends Contour>() => CircleDrawerBase<T> = styled(CircleDrawerBase)`
  position: absolute;
  top: 0;
  left: 0;

  --color: rgb(255, 224, 0);
  --stroke-width: 4px;
  --fill-color: rgba(255, 224, 0, 0.2);

  > circle:first-child {
    stroke: var(--contour-drawer-color, var(--color));
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: var(--contour-drawer-fill-color, var(--fill-color));
  }

  > circle[data-highlight] {
    stroke: #ffffff;
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: transparent;
    ${dashStroke}
  }

  > line {
    stroke: var(--contour-drawer-color, var(--color));
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
  }
` as any;

/**
 * @deprecated use CircleDrawer instead
 */
export const UserCircleDrawer = CircleDrawer;
