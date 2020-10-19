import { isTouchDevice } from '@lunit/is-touch-device';
import React, { Component, createRef, CSSProperties, DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface ScrollContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sessionId?: string;
}

interface ScrollContainerState {}

const divStyle: CSSProperties = { overflow: 'hidden' };

export class ScrollContainer extends Component<ScrollContainerProps, ScrollContainerState> {
  private resizeObserver: ResizeObserver;
  private containerRef: RefObject<HTMLDivElement> = createRef();
  private startPageY: number = -1;

  constructor(props: ScrollContainerProps) {
    super(props);

    this.resizeObserver = new ResizeObserver(this.resizeHandler);
  }

  render() {
    const { sessionId, ...divProps } = this.props;
    return <div {...divProps} ref={this.containerRef} style={divStyle} />;
  }

  componentDidMount() {
    const div: HTMLDivElement = this.containerRef.current!;
    this.resizeObserver.observe(div);
    div.addEventListener('wheel', this.wheelHandler);

    if (isTouchDevice()) {
      div.addEventListener('touchstart', this.touchStartHandler);
    }
  }

  componentDidUpdate(prevProps: Readonly<ScrollContainerProps>) {
    if (prevProps.sessionId !== this.props.sessionId) {
      this.scrollTo(0);
    }
  }

  scrollTo = (top: number) => {
    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;
    div.scrollTop = top;
  };

  // ---------------------------------------------
  // wheel scroll
  // ---------------------------------------------
  private wheelHandler = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;
    div.scrollTop = Math.min(Math.max(0, div.scrollTop + event.deltaY), div.scrollHeight - div.offsetHeight);
  };

  // ---------------------------------------------
  // touch scroll
  // ---------------------------------------------
  private touchStartHandler = (event: TouchEvent) => {
    if (event.touches.length !== 2) return;

    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.startPageY = event.targetTouches[0].pageY;

    div.removeEventListener('touchstart', this.touchStartHandler);

    div.addEventListener('touchmove', this.touchMoveHandler);
    div.addEventListener('touchend', this.touchEndHandler);
    div.addEventListener('touchcancel', this.touchEndHandler);
  };

  private touchMoveHandler = (event: TouchEvent) => {
    if (event.touches.length !== 2 || this.startPageY === -1) return;

    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;

    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    const dy: number = event.targetTouches[0].pageY - this.startPageY;

    div.scrollTop = Math.min(Math.max(0, div.scrollTop + dy), div.scrollHeight - div.offsetHeight);
  };

  private touchEndHandler = (event: TouchEvent) => {
    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;

    this.startPageY = -1;

    div.removeEventListener('touchmove', this.touchMoveHandler);
    div.removeEventListener('touchend', this.touchEndHandler);
    div.removeEventListener('touchcancel', this.touchEndHandler);

    div.addEventListener('touchstart', this.touchStartHandler);
  };

  // ---------------------------------------------
  // resize handler
  // ---------------------------------------------
  private resizeHandler = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.target === this.containerRef.current) {
        const div: HTMLDivElement | null = this.containerRef.current;
        if (!div) return;
        div.scrollTop = Math.min(Math.max(0, div.scrollTop), div.scrollHeight - div.offsetHeight);
      }
    }
  };
}
