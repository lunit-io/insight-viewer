import { CornerstoneEventData } from 'cornerstone-core';

export type CornerstoneRenderData = Required<Pick<CornerstoneEventData, 'canvasContext' | 'element' | 'enabledElement' | 'image' | 'renderTimeInMs' | 'viewport'>>;

export type Point = [number, number];

export interface ContourInfo {
  confidenceLevel: number; // 0-1
}

// UserContoureViewer와 같은 곳에서 사용된다
export interface Contour extends ContourInfo {
  // 일종의 label 역할을 한다
  id: number;
  polygon: Point[];
}