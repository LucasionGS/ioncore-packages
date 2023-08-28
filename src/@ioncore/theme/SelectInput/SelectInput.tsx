import React, { useState } from 'react';
import './SelectInput.css';
import { SelectOption } from '../Select/Select';

export interface SelectInputProps<T = string> {
  options: (string | SelectOption<T>)[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, index: number) => void;
}

export function SelectInput<const T>(props: SelectInputProps<T>) {
  const { options, defaultValue } = props;
  const [selected, setSelected] = useState<number>(
    (props.value != null ? options.indexOf(props.value as string | SelectOption<T>) : null)
      ?? (defaultValue ? options.indexOf(defaultValue as string | SelectOption<T>) : null)
      ?? 0
  );
  const actualValue = props.value ?? options[selected];
  function renderOption(option: string | SelectOption<T>, index: number) {
    const value = typeof option === 'string' ? option : option.value;
    const label = typeof option === 'string' ? option : option.label;

    return (
      <option
        key={index}
        className={`${value === actualValue ? 'ic-SelectInput-option--selected' : ''}`}
        value={index}
      >
        {label}
      </option>
    );
  }

  return (
    <select className={`ic-SelectInput`} onChange={e => {
      const index = +e.target.value;
      const option = options[index];
      const value = typeof option === "string" ? option : option.value;
      setSelected(index);
      props.onChange?.(value as T, index);
    }} value={selected}>
      {options.map(renderOption)}
    </select>
  );
}
