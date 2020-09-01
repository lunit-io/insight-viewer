import { drawArrow } from '@lunit/insight-draw';
import React, { useRef, useEffect } from 'react';

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const [start, ...polygon] = drawArrow({
      start: [20, 300],
      end: [300, 50],
      lineWidth: 20,
      arrowWidth: 60,
      arrowDepth: 40,
    });

    const context: CanvasRenderingContext2D | null = canvasRef.current.getContext(
      '2d',
    );

    if (!context) return;

    context.beginPath();
    context.moveTo(start[0], start[1]);
    polygon.forEach(([x, y]) => context.lineTo(x, y));
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};
