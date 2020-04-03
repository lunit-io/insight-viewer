import React, { Component } from 'react';
import { Unsubscribable } from 'rxjs';
import { FrameConsumer } from '../context/frame';
import { InsightViewerHostProps } from '../hooks/useInsightViewerSync';
import { CornerstoneImage } from '../image/types';
import {
  CornerstoneRenderData,
  CornerstoneViewerLike,
  Interaction,
  ViewportTransform,
  ViewportTransformParams,
} from '../types';

type Interactions = (Interaction | false | null | undefined)[];

export interface CornerstoneViewerProps extends InsightViewerHostProps {
  width: number;
  height: number;

  image: CornerstoneImage;

  interactions: Interactions;

  /** Invert Color Image */
  invert: boolean;

  /** Flip Image */
  flip: boolean;

  /**
   * Date.now() 로 입력하면 된다.
   * 값이 변경되는 경우 Pan, Adjust, Zoom 으로 변경된 상태들이 초기화 된다.
   */
  resetTime: number;

  /**
   * Image가 최초 그려지는 순간 변경한다
   */
  defaultViewportTransforms?: ViewportTransform[];
}

const maxScale: number = 3;

export class CornerstoneViewer extends Component<CornerstoneViewerProps, {}> implements CornerstoneViewerLike {
  // ref={}에 의해서 componentDidMount() 이전에 반드시 들어온다
  private element!: HTMLDivElement;

  // imageLoaded 이후 지연되어 들어오게 된다
  // setViewport, updateViewport 에 의해서만 접근한다
  private currentViewport: cornerstone.Viewport | null = null;
  // props.image.subscribe()를 통해서 지연되어 들어오게 된다
  private currentImage: cornerstone.Image | null = null;

  // mouse interaction에서 사용한다
  private teardownInteraction: (() => void)[] | null = null;

  // rx subscriptions
  private imageSubscription: Unsubscribable | null = null;

  private needImageInitialize: boolean = true;

  private contentWindow: Window = window;

  render() {
    return (
      <>
        <FrameConsumer stateRef={({ contentWindow }) => (this.contentWindow = contentWindow)} />
        <div
          ref={this.elementRef}
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
        />
      </>
    );
  }

  // ---------------------------------------------
  // life cycle
  // ---------------------------------------------
  elementRef = (element: HTMLDivElement) => {
    this.element = element;

    if (!element) return;

    this.startInteraction(this.props.interactions);
  };

  componentDidMount() {
    // cornerstone의 imagernderered event를 받는다
    // image가 render 될때마다 context로 enabledElement를 배포해주기 위해 필요하다
    this.element.addEventListener(cornerstone.EVENTS.IMAGE_RENDERED, this.onImageRenderered);

    this.setCornerstoneImage(this.props.image);
  }

  initImage = (image: cornerstone.Image) => {
    cornerstone.disable(this.element);
    cornerstone.enable(this.element, { renderer: 'webgl' });

    let defaultViewport = this.getDefaultViewport(image, this.element);

    if (!defaultViewport) {
      throw new Error('defaultViewport는 null일 수 없다.');
    }

    if (Array.isArray(this.props.defaultViewportTransforms)) {
      const minScale: number = defaultViewport.scale;

      for (const transform of this.props.defaultViewportTransforms) {
        const patch = transform({
          element: this.element,
          currentViewport: defaultViewport,
          minScale,
          maxScale,
        });

        defaultViewport = {
          ...defaultViewport,
          ...patch,
        };
      }
    }

    defaultViewport = {
      ...defaultViewport,
      hflip: this.props.flip,
      invert: this.props.invert,
    };

    cornerstone.displayImage(this.element, image, defaultViewport);

    this.setImage(image);
    this.setViewport(defaultViewport);
    this.startInteraction(this.props.interactions);
  };

  componentWillUnmount() {
    this.element.removeEventListener(cornerstone.EVENTS.IMAGE_RENDERED, this.onImageRenderered);
    cornerstone.disable(this.element);

    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }

    if (this.teardownInteraction) {
      this.teardownInteraction.forEach((teardown) => teardown());
    }
  }

  componentDidUpdate(prevProps: Readonly<CornerstoneViewerProps>) {
    const { width, height, flip, invert, interactions, resetTime, image } = this.props;

    const defaultViewport: cornerstone.Viewport | null = this.getDefaultViewport(this.currentImage, this.element);

    // 선택된 control 상태에 따라 event를 해제/등록 해준다
    if (prevProps.interactions !== interactions) {
      this.startInteraction(interactions);
    }

    if (defaultViewport) {
      if (prevProps.resetTime !== resetTime) {
        // resetTime이 새로 갱신되면 viewport를 defaultViewport를 사용해서 초기화 해준다
        this.updateCurrentViewport({
          ...defaultViewport,
          //...this.defaultViewport,
          hflip: flip,
          invert: defaultViewport.invert ? !invert : invert,
        });
      } else {
        // flip, invert는 resetTime의 부분 집합이기 때문에
        // resetTime에 의한 갱신이 없는 경우에만 적용한다
        if (prevProps.flip !== flip || prevProps.invert !== invert) {
          this.updateCurrentViewport({
            hflip: flip,
            invert: defaultViewport.invert ? !invert : invert,
          });
        }
      }
    }

    if (prevProps.width !== width || prevProps.height !== height) {
      if (this.currentImage) {
        // container size가 변경되는 경우 cornerstone resize() 처리를 해준다
        cornerstone.resize(this.element);

        const viewport = cornerstone.getViewport(this.element);

        if (viewport) {
          this.setViewport(viewport);
        } else {
          throw new Error('getViewport() is returns not a Viewport');
        }
      }
    }

    if (prevProps.image !== image) {
      this.setCornerstoneImage(image);
    }
  }

  subscribeImage = (image: cornerstone.Image | null) => {
    if (!image) return;

    image.voiLUT = undefined; // remove VOI LUT for 'adjust' functionality

    // props.image의 변경 또는 초기화로 인한 완전한 초기화가 필요할때
    if (this.needImageInitialize) {
      this.needImageInitialize = false;
      this.initImage(image);
    }
    // 단순 series image의 변경일 경우에는 화면 표시만 바꿔준다
    else if (this.currentViewport) {
      cornerstone.displayImage(this.element, image, this.currentViewport);
    }
    // 이건 실행되면 안됨
    else {
      throw new Error('어떤 상황인지 확인 필요!!!');
    }
  };

  onImageRenderered = (event: cornerstone.CornerstoneEvent) => {
    const eventData: cornerstone.CornerstoneEventData | undefined = event.detail;
    if (
      eventData &&
      eventData.canvasContext &&
      eventData.element &&
      eventData.enabledElement &&
      eventData.image &&
      typeof eventData.renderTimeInMs === 'number' &&
      eventData.viewport
    ) {
      this.currentViewport = eventData.viewport;
      this.props.updateCornerstoneRenderData(eventData as CornerstoneRenderData);
    } else {
      console.error('CornerstoneEventData에 없는 정보가 있다???', eventData);
    }
  };

  // ---------------------------------------------
  // event handlers
  // ---------------------------------------------
  startInteraction = (interactions: Interactions) => {
    if (this.teardownInteraction) {
      this.teardownInteraction.forEach((teardown) => teardown());
    }

    this.teardownInteraction = interactions
      .filter((interaction): interaction is Interaction => typeof interaction === 'function')
      .map((interaction) => interaction(this));
  };

  // ---------------------------------------------
  // getters
  // ---------------------------------------------
  getElement = () => this.element;

  getContentWindow = () => this.contentWindow;

  getCurrentViewport = () => this.currentViewport!;

  getDefaultViewport = (image: cornerstone.Image | null, element: HTMLElement | null): cornerstone.Viewport | null => {
    if (!image || !element) return null;
    return cornerstone.getDefaultViewportForImage(element, image);
  };

  getMinScale = () => {
    const viewport = this.getDefaultViewport(this.currentImage, this.element);

    if (!viewport) {
      throw new Error('viewport가 정상적으로 와야만 한다');
    }

    return viewport.scale;
  };

  getMaxScale = () => {
    return maxScale;
  };

  // ---------------------------------------------
  // setters
  // ---------------------------------------------
  updateViewport = (patch: Partial<cornerstone.Viewport>) => {
    if (this.currentViewport) {
      this.updateCurrentViewport(patch);
    }
  };

  getViewportTransformParams = (): ViewportTransformParams => {
    return {
      element: this.element,
      minScale: this.getMinScale(),
      maxScale: this.getMaxScale(),
      currentViewport: this.currentViewport,
    };
  };

  private setCornerstoneImage = (image: CornerstoneImage) => {
    this.needImageInitialize = true;

    this.setImage(null);

    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
      this.imageSubscription = null;
    }

    this.imageSubscription = image.image.subscribe(this.subscribeImage);
  };

  private setImage = (image: cornerstone.Image | null) => {
    this.currentImage = image;
  };

  private setViewport = (viewport: cornerstone.Viewport) => {
    this.currentViewport = viewport;
    cornerstone.setViewport(this.element, this.currentViewport);
  };

  private updateCurrentViewport = (
    update: Partial<cornerstone.Viewport> | ((viewport: cornerstone.Viewport) => Partial<cornerstone.Viewport>),
  ) => {
    if (!this.currentViewport) {
      throw new Error('viewport가 없는 상태에서 실행되면 안된다');
    }

    const patch: Partial<cornerstone.Viewport> = typeof update === 'function' ? update(this.currentViewport) : update;

    this.currentViewport = {
      ...this.currentViewport,
      ...patch,
    };

    cornerstone.setViewport(this.element, this.currentViewport);
  };
}
