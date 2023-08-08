import React from 'react';
import './Textarea.css';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>, newValue: string) => void;
  /**
   * Label displayed before the textarea
   */
  label?: string;
  labelAlign?: "left" | "center" | "right";
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export function Textarea({
  className,
  value,
  onChange,
  label,
  labelAlign = "left",
  containerStyle = {},
  containerClassName,
  ...rest
}: TextareaProps) {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event, event.target.value);
  }

  const classes = [
    'ic-Textarea',
    className || ''
  ];

  const labelClasses = [
    'ic-Textarea-label',
    "ic-Textarea-label--" + labelAlign
  ]

  return (
    <div className={"ic-Textarea-wrapper " + (containerClassName || "")} style={containerStyle}>
      {label && <label className={labelClasses.join(" ")}>{label}</label>}
      <textarea className={classes.join(" ")} value={value} onChange={handleChange} {...rest} />
    </div>
  );
}
