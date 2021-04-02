import { getAngledTextPosition } from '@lunit/insight-draw';
import React, { useEffect, useState } from 'react';

const size: number = 400;
const radius: number = 100;
const fontSize: number = 14;

export default () => {
  const [angle, setAngle] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAngle((prev) => (prev + 0.01) % (Math.PI * 2));
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sx = Math.floor(size / 2);
  const sy = Math.floor(size / 2);
  const ex = Math.floor(radius * Math.cos(angle) + sx);
  const ey = Math.floor(radius * Math.sin(angle) + sy);

  const position = getAngledTextPosition({
    start: [sx, sy],
    end: [ex, ey],
    fontSize,
  });

  return (
    <div style={{ display: 'flex' }}>
      {/* SVG */}
      <svg width={size} height={size}>
        <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="blue" strokeWidth={3} />
        <circle cx={sx} cy={sy} r={4} fill="red" />
        <circle cx={ex} cy={ey} r={4} fill="blue" />
        <text fontSize={fontSize} {...position}>
          {position['data-direction'].toUpperCase()}
        </text>
        <text x={10} y={20}>
          deg {Math.floor((angle * 180) / Math.PI)}
        </text>
        <text x={10} y={50}>
          rad {angle}
        </text>
      </svg>

      {/* HTML */}
      <div
        style={{
          width: size,
          height: size,
          position: 'relative',
          backgroundColor: '#eeeeee',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: sx,
            top: sy,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'red',
            transform: 'translate(-2px, -2px)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            left: ex,
            top: ey,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'blue',
            transform: 'translate(-2px, -2px)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            left: position.x - (position.textAnchor === 'start' ? 0 : position.textAnchor === 'end' ? 300 : 300 / 2),
            top:
              position.y -
              (position.dominantBaseline === 'text-after-edge'
                ? fontSize
                : position.dominantBaseline === 'middle'
                ? fontSize / 2
                : 0),
            width: 300,
            textAlign: position.textAnchor === 'start' ? 'left' : position.textAnchor === 'end' ? 'right' : 'center',
          }}
        >
          {position['data-direction'].toUpperCase()}
        </div>
      </div>
    </div>
  );
};
