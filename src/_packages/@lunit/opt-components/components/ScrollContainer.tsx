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

  private wheelHandler = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const div: HTMLDivElement | null = this.containerRef.current;
    if (!div) return;
    div.scrollTop = Math.min(Math.max(0, div.scrollTop + event.deltaY), div.scrollHeight - div.offsetHeight);
  };

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
