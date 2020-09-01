import React, {
  cloneElement,
  ReactElement,
  SVGProps,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface StrokeTextProps {
  fontFamily?: string;
  fontSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  children: ReactElement<SVGProps<SVGTextElement>>;
}

export function StrokeText({
  fontFamily = 'proximanova,noto_sanslight,sans-serif',
  fontSize = 12,
  strokeWidth = 6,
  strokeColor = '#000000',
  children,
}: StrokeTextProps) {
  const [width, setWidth] = useState<number>(100);
  const height = useMemo<number>(() => fontSize + strokeWidth * 2, [
    fontSize,
    strokeWidth,
  ]);
  const textRef = useRef<SVGTextElement>(null);

  const text = useMemo(() => {
    return (
      <>
        {cloneElement(children, {
          ref: textRef,
          x: strokeWidth,
          y: strokeWidth,
          stroke: strokeColor,
          strokeWidth,
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
          dominantBaseline: 'mathematical',
          fontFamily,
        })}
        {cloneElement(children, {
          x: strokeWidth,
          y: strokeWidth,
          dominantBaseline: 'mathematical',
          fontFamily,
        })}
      </>
    );
  }, [children, fontFamily, strokeColor, strokeWidth]);

  useLayoutEffect(() => {
    const rect = textRef.current?.getBoundingClientRect();
    if (!rect) return;
    setWidth(rect.width + strokeWidth * 2);
  }, [strokeWidth, text]);

  return (
    <svg
      width={width}
      height={height}
      style={{ pointerEvents: 'none', userSelect: 'none', fontSize }}
    >
      {text}
    </svg>
  );
}
