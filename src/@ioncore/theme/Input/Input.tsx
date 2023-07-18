import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => void;
  /**
   * Label displayed before the input
   */
  label?: string;
  labelAlign?: "left" | "center" | "right";
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export function Input({
  className,
  value,
  onChange,
  label,
  labelAlign = "left",
  containerStyle = {},
  containerClassName,
  ...rest
}: InputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event, event.target.value);
  }

  const classes = [
    'ic-Input',
    className || ''
  ];

  const labelClasses = [
    'ic-Input-label',
    "ic-Input-label--" + labelAlign
  ]

  return (
    <div className={"ic-Input-wrapper " + (containerClassName || "")} style={containerStyle}>
      {label && <label className={labelClasses.join(" ")}>{label}</label>}
      <input className={classes.join(" ")} value={value} onChange={handleChange} {...rest} />
    </div>
  );
}
