import { posMapToImageData } from '@lunit/heatmap';
import React, { Component, createRef, RefObject } from 'react';
import styled from 'styled-components';
import { InsightViewerGuestProps } from '../hooks/useInsightViewerSync';
import { cleanCanvas } from './draw/cleanCanvas';

export interface HeatmapViewerProps extends InsightViewerGuestProps {
  width: number;
  height: number;
  posMap: number[][];
  threshold: number;
}

export class HeatmapViewer extends Component<HeatmapViewerProps, {}> {
  private canvasRef: RefObject<HTMLCanvasElement> = createRef();
  private ctx: CanvasRenderingContext2D | null = null;
  private imageData: ImageData | null = null;
  private imageResourceCanvas: HTMLCanvasElement | null = null;

  render() {
    return (
      <Canvas
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
      />
    );
  }

  componentDidMount() {
    this.imageResourceCanvas = document.createElement('canvas');

    if (!this.canvasRef.current) throw new Error('<canvas> is not initialized');

    this.ctx = this.canvasRef.current.getContext('2d');

    if (!this.ctx) throw new Error('<canvas> context 2d is not initialized');

    this.imageData = posMapToImageData(this.props.posMap, this.props.threshold);

    this.drawHeatmap(this.props);
  }

  componentDidUpdate(prevProps: Readonly<HeatmapViewerProps>) {
    const { width, height, posMap, threshold, cornerstoneRenderData } = this.props;

    if (prevProps.posMap !== posMap || prevProps.threshold !== threshold) {
      this.imageData = posMapToImageData(posMap, threshold);
    }

    if (
      prevProps.posMap !== posMap ||
      prevProps.threshold !== threshold ||
      prevProps.cornerstoneRenderData !== cornerstoneRenderData
    ) {
      cleanCanvas(this.ctx!, width, height);

      this.drawHeatmap(this.props);
    }
  }

  drawHeatmap = ({ cornerstoneRenderData }: Readonly<HeatmapViewerProps>) => {
    if (!this.imageData || !this.imageResourceCanvas || !this.ctx || !cornerstoneRenderData) {
      return;
    }

    try {
      this.ctx.save();

      this.imageResourceCanvas.width = this.imageData.width;
      this.imageResourceCanvas.height = this.imageData.height;
      this.imageResourceCanvas.getContext('2d')!.putImageData(this.imageData, 0, 0);

      cornerstone.setToPixelCoordinateSystem(cornerstoneRenderData.enabledElement, this.ctx);

      const imageWidth: number = cornerstoneRenderData.image.width;
      const imageHeight: number = cornerstoneRenderData.image.height;

      this.ctx.drawImage(
        this.imageResourceCanvas,
        0,
        0,
        this.imageResourceCanvas.width,
        this.imageResourceCanvas.height,
        0,
        0,
        imageWidth,
        imageHeight,
      );

      this.ctx.restore();
    } catch (error) {
      console.error(error);
    }
  };
}

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

/**
 * @deprecated use HeatmapViewer instead
 */
export const MachineHeatmapViewer = HeatmapViewer;
