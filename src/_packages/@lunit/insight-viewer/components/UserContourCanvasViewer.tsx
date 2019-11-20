import React, { Component, createRef, RefObject } from 'react';
import styled from 'styled-components';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { Contour } from '../types';
import { cleanCanvas } from './draw/cleanCanvas';
import { drawContour } from './draw/drawContour';

export interface UserContourCanvasViewerStyleProps {
  canvasStrokeLineWidth: number;
  canvasStrokeStyle: string;
  canvasFillStyle: string;
  canvasFontStyle: string;
  canvasFocusedStrokeLineWidth: number;
  canvasFocusedStrokeStyle: string;
  canvasFocusedFillStyle: string;
  canvasFocusedFontStyle: string;
}

export interface UserContourCanvasViewerProps<T extends Contour> extends InsightViewerGuestProps, Partial<UserContourCanvasViewerStyleProps> {
  width: number;
  height: number;
  contours: T[];
  focusedContour: T | null;
}

export class UserContourCanvasViewer<T extends Contour> extends Component<UserContourCanvasViewerProps<T>, {}> {
  static defaultProps: UserContourCanvasViewerStyleProps = {
    canvasFocusedStrokeLineWidth: 6,
    canvasFocusedStrokeStyle: 'rgb(255,86,60)',
    canvasFocusedFillStyle: 'rgba(0, 0, 0, 0.2)',
    canvasFocusedFontStyle: 'normal normal 600 20px proximanova',
    canvasStrokeLineWidth: 3,
    canvasStrokeStyle: 'rgba(255,194,17,0.9)',
    canvasFillStyle: 'rgba(0, 0, 0, 0.2)',
    canvasFontStyle: 'normal normal 600 20px proximanova',
  };
  
  private canvasRef: RefObject<HTMLCanvasElement> = createRef();
  private ctx: CanvasRenderingContext2D | null = null;
  
  render() {
    return (
      <Canvas ref={this.canvasRef}
              width={this.props.width}
              height={this.props.height}
              style={{
                width: this.props.width,
                height: this.props.height,
              }}/>
    );
  }
  
  componentDidMount() {
    if (!this.canvasRef.current) throw new Error('<canvas> is not initialized');
    
    this.ctx = this.canvasRef.current.getContext('2d');
    
    if (!this.ctx) throw new Error('<canvas> context 2d is not initialized');
    
    this.drawContours(this.props);
  }
  
  componentDidUpdate(prevProps: Readonly<UserContourCanvasViewerProps<T>>) {
    const {width, height, contours, cornerstoneRenderData, focusedContour} = this.props;
    
    if (prevProps.contours !== contours
      || prevProps.cornerstoneRenderData !== cornerstoneRenderData
      || prevProps.focusedContour !== focusedContour
    ) {
      cleanCanvas(this.ctx!, width, height);
      this.drawContours(this.props);
    }
  }
  
  drawContours = ({contours, cornerstoneRenderData, focusedContour, canvasStrokeLineWidth, canvasFocusedStrokeLineWidth, canvasFocusedStrokeStyle, canvasFocusedFillStyle, canvasFocusedFontStyle, canvasFillStyle, canvasFontStyle, canvasStrokeStyle}: Readonly<UserContourCanvasViewerProps<T>>) => {
    if (contours.length > 0) {
      for (const contour of contours) {
        // FIXME https://github.com/babel/babel/issues/9530
        if (focusedContour && focusedContour === contour) {
          drawContour(cornerstoneRenderData!, this.ctx!, contour, canvasFocusedStrokeLineWidth, canvasFocusedStrokeStyle, canvasFocusedFillStyle, canvasFocusedFontStyle);
        } else {
          drawContour(cornerstoneRenderData!, this.ctx!, contour, canvasStrokeLineWidth, canvasStrokeStyle, canvasFillStyle, canvasFontStyle);
        }
        //const style: Style = this.props.focusedContour && this.props.focusedContour === contour
        //  ? focusStyle
        //  : normalStyle;
        //drawContour(cornerstoneRenderData!, this.ctx!, contour, ...style);
      }
    }
  };
}

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

//type Style = [number, string, string, string];
//const normalStyle: Style = [3, 'rgba(255,194,17,0.9)', 'rgba(0, 0, 0, 0.2)', 'normal normal 600 20px proximanova'];
//const focusStyle: Style = [6, 'rgb(255,86,60)', 'rgba(0, 0, 0, 0.2)', 'normal normal 600 20px proximanova'];