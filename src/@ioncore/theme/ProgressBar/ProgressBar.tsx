import React from 'react'

export interface ProgressProps {
  value: number;
  max?: number;
  backgroundColor?: string;
  color?: string;
  width?: number;
  size?: number;
  fontSize?: number;
  text?: string | ((value: number, max: number) => string);
  lineCap?: "inherit" | "round" | "butt" | "square";
  indeterminate?: boolean;
}

export interface ProgressBarProps extends ProgressProps {
  textCenter?: boolean;
}

/**
 * Progress bar in the shape of a bar.
 */
export function ProgressBar(props: ProgressBarProps) {
  const { value,
    max = 100,
    backgroundColor = "#343a40",
    color = "#4ea4ff",
    width = 20,
    size = 200,
    fontSize = 52,
    text,
    lineCap = "round",
    textCenter = false,
    indeterminate = false
  } = props;
  const displayPx = Math.min(size, size / max * value);

  const getText = React.useCallback(() => {
    if (typeof text === "function") {
      return text(value, max);
    }
    return text ?? value;
  }, [text, value, max]);

  const data = getText();
  const x = (size / 2 - (data.toString().length) * (fontSize * 0.30));
  const y = textCenter ?
    (size / 2) + (fontSize / 4)
    : (size / 2) - (fontSize / 2);
  // const y = (size / 2 + 10);
  const viewBox = `-${0.125 * size} -${0.125 * size} ${size * 1.25} ${size * 1.25}`;

  return (
    <svg width={size} height={size} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{
      transform: "rotate(-90deg)"
    }}>
      <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={backgroundColor} strokeWidth={width} strokeLinecap={lineCap} />
      {/* <line x1={size / 2} y1={0} x2={size / 2} y2={displayPx} stroke={color} strokeWidth={width} strokeLinecap={lineCap} /> */}
      {
        indeterminate ? (
          <line x1={size / 2} y1={displayPx - size / 10} x2={size / 2} y2={displayPx} stroke={color} strokeWidth={width} strokeLinecap={lineCap} />
        ) : (
          <line x1={size / 2} y1={0} x2={size / 2} y2={displayPx} stroke={color} strokeWidth={width} strokeLinecap={lineCap} />
        )
      }
      {/* Text need to have a shadow of the inactive color */}
      <text x={`${x}px`} y={`${y}px`} fill={color} fontSize={`${fontSize}px`} fontWeight="bold" style={{
        transform: `rotate(90deg) translate(0px, -${size - 6}px)`
      }}
        stroke={backgroundColor} strokeWidth={fontSize * 0.03} strokeLinecap="round" strokeLinejoin="round"
      >{data}</text>

    </svg>
  );
}

/**
 * Progress bar in the shape of a circle.
 */
export function ProgressCircle(props: ProgressProps) {
  const { value,
    max = 100,
    backgroundColor = "#343a40",
    color = "#4ea4ff",
    width = 20,
    size = 200,
    fontSize = 52,
    text,
    lineCap = "round",
    indeterminate = false
  } = props;
  // const processBarCap = 524.38;
  const processBarCap = size * Math.PI;
  const displayPx = Math.min(processBarCap, processBarCap / max * value);

  const getText = React.useCallback(() => {
    if (typeof text === "function") {
      return text(value, max);
    }
    return text ?? value;
  }, [text, value, max]);

  const data = getText();

  const x = (size / 2 - (data.toString().length) * (fontSize * 0.30));
  const y = (size / 2) + (fontSize / 4);
  // const y = (size / 2 + 10);
  const viewBox = `-${0.125 * size} -${0.125 * size} ${size * 1.25} ${size * 1.25}`;


  return (
    <svg width={size} height={size} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg" style={{
      transform: "rotate(-90deg)"
    }}>
      <circle r={(size / 2)} cx={(size / 2)} cy={(size / 2)} fill="transparent" stroke={backgroundColor} strokeWidth={width} strokeDasharray={`${processBarCap}px`} strokeDashoffset="0" />
      <circle r={(size / 2)} cx={(size / 2)} cy={(size / 2)} stroke={color} strokeWidth={width} strokeLinecap={lineCap} strokeDashoffset={`${processBarCap - displayPx}px`} fill="transparent" strokeDasharray={
        `${indeterminate ? (processBarCap / 8): processBarCap}px`
      } />
      <text x={`${x}px`} y={`${y}px`} fill={color} fontSize={`${fontSize}px`} fontWeight="bold" style={{
        transform: `rotate(90deg) translate(0px, -${size - 6}px)`
      }}
        stroke={backgroundColor} strokeWidth={fontSize * 0.03} strokeLinecap="round" strokeLinejoin="round"
      >{data}</text>
    </svg>
  );
}
