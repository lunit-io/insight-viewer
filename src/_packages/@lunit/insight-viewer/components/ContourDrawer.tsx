import { pageToPixel, pixelToCanvas } from 'cornerstone-core';
import React, { Component, CSSProperties } from 'react';
import styled from 'styled-components';
import { hitTestContours } from '../geom/hitTestContours';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour, Point } from '../types';
import { dashStroke } from './animation/dashStroke';

export interface ContourDrawerProps<T extends Contour> extends InsightViewerGuestProps {
  width: number;
  height: number;
  contours: T[];
  draw: boolean | HTMLElement | null;
  onFocus: (contour: T | null) => void;
  onAdd: (polygon: Point[], event: MouseEvent) => void;
  onRemove: (contour: T) => void;
  className?: string;
  style?: CSSProperties;
  animateStroke?: boolean;
}

interface ContourDrawerState {
  polygon: Point[];
}

function toLocal(element: HTMLElement, polygon: Point[]): string {
  return polygon.map(([x, y]) => {
      const p = pixelToCanvas(element, {x, y});
      return p.x + ',' + p.y;
    })
    .join(' ');
}

export class ContourDrawerBase<T extends Contour> extends Component<ContourDrawerProps<T>, ContourDrawerState> {
  private svg: SVGSVGElement | null = null;
  private element: HTMLElement | null = null;
  private focused: T | null = null;
  private preventClickEvent: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  
  constructor(props: ContourDrawerProps<T>) {
    super(props);
    
    this.state = {
      polygon: [],
    };
  }
  
  render() {
    return (
      <svg ref={this.svgRef}
           role="figure"
           width={this.props.width}
           height={this.props.height}
           className={this.props.className}
           style={this.props.style}>
        {
          this.props.cornerstoneRenderData &&
          this.state.polygon &&
          this.state.polygon.length > 0 &&
          <>
            <polyline points={toLocal(this.props.cornerstoneRenderData.element, this.state.polygon)}/>
            {
              this.props.animateStroke !== false &&
              <polyline points={toLocal(this.props.cornerstoneRenderData.element, this.state.polygon)}
                        data-highlight="highlight"/>
            }
          </>
        }
      </svg>
    );
  }
  
  svgRef = (svg: SVGSVGElement) => {
    if (svg && this.svg && this.element) {
      this.deactivateInitialEvents();
      this.deactivateDrawEvents();
      
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
  
  componentDidUpdate(prevProps: Readonly<ContourDrawerProps<T>>) {
    if (prevProps.draw !== this.props.draw) {
      if (this.element) {
        this.deactivateInitialEvents();
        this.deactivateDrawEvents();
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
      this.deactivateDrawEvents();
    }
  }
  
  getElement = ({draw}: Readonly<ContourDrawerProps<T>>): HTMLElement => {
    //@ts-ignore
    return draw instanceof HTMLElement ? draw : this.svg as HTMLElement;
  };
  
  canActivate = ({draw}: Readonly<ContourDrawerProps<T>>) => {
    return draw instanceof HTMLElement || draw === true;
  };
  
  // ---------------------------------------------
  // initial events
  // ---------------------------------------------
  activateInitialEvents = () => {
    if (!this.element) return;
    this.element.addEventListener('mousemove', this.onMouseMoveToFindFocus);
    this.element.addEventListener('mousedown', this.onMouseDownToStartDraw);
    this.element.addEventListener('click', this.onMouseClickToRemove);
  };
  
  deactivateInitialEvents = () => {
    if (!this.element) return;
    this.element.removeEventListener('mousemove', this.onMouseMoveToFindFocus);
    this.element.removeEventListener('mousedown', this.onMouseDownToStartDraw);
    this.element.removeEventListener('click', this.onMouseClickToRemove);
  };
  
  onMouseMoveToFindFocus = (event: MouseEvent) => {
    event.stopPropagation();
    
    this.findFocus(event.pageX, event.pageY);
  };
  
  findFocus = (pageX: number, pageY: number) => {
    if (!this.props.contours || this.props.contours.length === 0 || !this.props.cornerstoneRenderData) return;
    
    const element: HTMLElement = this.props.cornerstoneRenderData.element;
    
    const {x, y} = pageToPixel(element, pageX, pageY);
    
    this.focused = hitTestContours<T>(this.props.contours, [x, y]);
    
    this.props.onFocus(this.focused);
  };
  
  onMouseClickToRemove = (event: MouseEvent) => {
    event.stopPropagation();
    
    if (!this.focused || this.preventClickEvent) return;
    
    this.props.onRemove(this.focused);
  };
  
  // ---------------------------------------------
  // draw events
  // ---------------------------------------------
  onMouseDownToStartDraw = (event: MouseEvent) => {
    event.stopPropagation();
    
    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }
    
    this.preventClickEvent = false;
    this.startX = event.pageX;
    this.startY = event.pageY;
    
    this.deactivateInitialEvents();
    this.activateDrawEvents();
    
    const element: HTMLElement = this.props.cornerstoneRenderData.element;
    
    const {x, y} = pageToPixel(element, event.pageX, event.pageY);
    
    this.setState(prevState => ({
      ...prevState,
      polygon: [[x, y]],
    }));
  };
  
  activateDrawEvents = () => {
    if (!this.element) return;
    this.element.addEventListener('mousemove', this.onMouseMoveToDraw);
    this.element.addEventListener('mouseup', this.onMouseUpToEndDraw);
    this.element.addEventListener('mouseleave', this.onMouseLeaveToCancelDraw);
    window.addEventListener('keydown', this.onKeyDownToCancelDraw);
  };
  
  deactivateDrawEvents = () => {
    if (!this.element) return;
    this.element.removeEventListener('mousemove', this.onMouseMoveToDraw);
    this.element.removeEventListener('mouseup', this.onMouseUpToEndDraw);
    this.element.removeEventListener('mouseleave', this.onMouseLeaveToCancelDraw);
    window.removeEventListener('keydown', this.onKeyDownToCancelDraw);
  };
  
  onMouseMoveToDraw = (event: MouseEvent) => {
    event.stopPropagation();
    
    if (!this.props.cornerstoneRenderData) {
      throw new Error('cornerstoneRenderEventData를 찾을 수 없다!');
    }
    
    if (!this.preventClickEvent && Math.max(Math.abs(event.pageX - this.startX), Math.abs(event.pageY - this.startY)) > 20) {
      this.preventClickEvent = true;
    }
    
    const element: HTMLElement = this.props.cornerstoneRenderData.element;
    
    const {x, y} = pageToPixel(element, event.pageX, event.pageY);
    
    this.setState(prevState => ({
      ...prevState,
      polygon: [...prevState.polygon, [x, y]],
    }));
  };
  
  onMouseUpToEndDraw = (event: MouseEvent) => {
    event.stopPropagation();
    
    this.deactivateDrawEvents();
    this.activateInitialEvents();
    
    this.props.onAdd(this.state.polygon, event);
    
    this.setState(prevState => ({
      ...prevState,
      polygon: [],
    }));
  };
  
  onMouseLeaveToCancelDraw = (event: MouseEvent) => {
    event.stopPropagation();
    
    this.cancelDraw();
  };
  
  onKeyDownToCancelDraw = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'escape') {
      event.stopPropagation();
      
      this.cancelDraw();
    }
  };
  
  cancelDraw = () => {
    this.deactivateDrawEvents();
    this.activateInitialEvents();
    
    this.setState(prevState => ({
      ...prevState,
      polygon: [],
    }));
  };
}

// tslint:disable:no-any
export const ContourDrawer: new <T extends Contour>() => ContourDrawerBase<T> = styled(ContourDrawerBase)`
  position: absolute;
  top: 0;
  left: 0;
  
  --color: rgb(255,224,0);
  --stroke-width: 4px;
  --fill-color: rgba(255,224,0, 0.2);

  > polyline:first-child {
    stroke: var(--contour-drawer-color, var(--color));
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: var(--contour-drawer-fill-color, var(--fill-color));
  }
  
  > polyline[data-highlight] {
    stroke: #ffffff;
    stroke-width: var(--contour-drawer-stroke-width, var(--stroke-width));
    fill: transparent;
    ${dashStroke}
  }
` as any;

/**
 * @deprecated use ContourDrawer instead
 */
export const UserContourDrawer = ContourDrawer;