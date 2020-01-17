import React, { DetailedHTMLProps, HTMLAttributes, ReactElement, SourceHTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';

export interface VideoBackgroundContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  source: ReactElement<DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>>;
}

function VideoBackgroundContainerBase({
                                        source,
                                        children,
                                        ...divProps
                                      }: VideoBackgroundContainerProps) {
  return (
    <div {...divProps}>
      <video autoPlay loop muted>
        {source}
      </video>
      
      {children}
    </div>
  );
}

const enter = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const VideoBackgroundContainer = styled(VideoBackgroundContainerBase)`
  position: relative;
  overflow: hidden;
  
  > * {
    position: relative;
  }
  
  > video {
    top: 50%;
    left: 50%;
    position: absolute;
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    transform: translate3d(-50%, -50%, 0);
    
    animation: ${enter} 1s ease-out;
  }
`;