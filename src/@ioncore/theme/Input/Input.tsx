import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => void;
  /**
   * Label displayed before the input
   */
  label?: string;
}

export function Input({
  className,
  value,
  onChange,
  label,
  ...rest
}: InputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event, event.target.value);
  }

  const classes = [
    'ic-Input',
    className || ''
  ];

  return (
    <div className="ic-Input-wrapper">
      {label && <label className="ic-Input-label">{label}</label>}
      <input className={classes.join(" ")} value={value} onChange={handleChange} {...rest} />
    </div>
  );
}
