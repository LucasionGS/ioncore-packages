import React, { useState } from 'react';
import './Select.css';

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface SelectProps<T = string> {
  options: (string | SelectOption<T>)[];
  direction?: "horizontal" | "vertical";
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function Select<T>(props: SelectProps<T>) {
  if (props.options.length === 0) {
    throw new Error("Select must have at least one option");
  }
  const _firstValue = props.options[0];
  const [selected, setSelected] = useState<T>(
    props.value
      ?? props.defaultValue
      ?? typeof _firstValue === 'string' ? _firstValue : _firstValue.value as any
  );
  const actualValue = props.value ?? selected;
  function renderOption(option: string | SelectOption<any>, index: number) {
    const value = typeof option === 'string' ? option : option.value;
    const label = typeof option === 'string' ? option : option.label;

    return (
      <button
        key={index}
        className={`ic-Select-option ${value === actualValue ? 'ic-Select-option--selected' : ''}`}
        onClick={() => {
          setSelected(value);
          props.onChange?.(value)
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <div className={`ic-Select ic-Select--${props.direction || 'horizontal'}`}>
      {props.options.map(renderOption)}
    </div>
  );
}
