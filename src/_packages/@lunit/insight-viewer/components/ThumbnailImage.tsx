import React from 'react';
import styled from 'styled-components';

export interface ThumbnailImageProps {
  width: number;
  height: number;
  src: string;
}

export function ThumbnailImage({width, height, src}: ThumbnailImageProps) {
  return (
    <Thumbnail style={{
      width,
      height,
      backgroundImage: `url(${src})`,
    }}/>
  );
}

const Thumbnail = styled.div`
  display: inline-block;
  background-color: #000000;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;