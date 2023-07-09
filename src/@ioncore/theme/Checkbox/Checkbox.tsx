import React, { useState } from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  label?: string;
  /**
   * Show the tick even when a label has been provided
   */
  alwaysShowTick?: boolean;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, value: string | undefined) => void;
}

interface CheckboxContext {
  onChange?: (checked: boolean, value: string | undefined) => void;
  values: string[];
}
const CheckboxContext = React.createContext<CheckboxContext>({
  values: []
});

export function Checkbox({ label, alwaysShowTick = false, value, checked, defaultChecked = false, onChange }: CheckboxProps) {
  const context = React.useContext(CheckboxContext);
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const finalChecked = checked !== undefined ? checked : isChecked;

  function handleClick() {
    const newChecked = !finalChecked;
    if (onChange) {
      onChange(newChecked, value);
    }
    if (context.onChange) {
      context.onChange(newChecked, value);
    }
    if (checked === undefined) {
      setIsChecked(newChecked);
    }
  }

  const noLabel = label == undefined;
  const classes = [
    'ic-Checkbox',
    noLabel ? 'ic-Checkbox--noLabel' : '',
    finalChecked ? 'ic-Checkbox--checked' : ''
  ]
  return (
    <>
      <div className={classes.join(' ')} onClick={handleClick}>
        {!noLabel ? (
          <span className="ic-Checkbox-label">
            {alwaysShowTick ? (<span className="ic-Checkbox-alwaysShowTick">
              {finalChecked ? "✓" : "X"}
            </span>) : ""}
            {label}
          </span>
        ) : null}
      </div>
    </>
  );
}

export interface CheckboxGroupProps {
  children: (React.ReactNode | ((value: string | undefined) => JSX.Element))[];
  onChange?: (checked: boolean, value: string | undefined) => void;
}

export function CheckboxGroup({ children, onChange }: CheckboxGroupProps) {
  const [values, _setValues] = useState<string[]>([]);
  function setValue(checked: boolean, value: string | undefined) {
    if (checked) {
      _setValues([...values, value!]);
    } else {
      _setValues(values.filter(x => x !== value));
    }
    _setValues(values);
    onChange?.(checked, value);
  }
  return (
    <CheckboxContext.Provider value={{ onChange: setValue, values }}><div className="ic-CheckboxGroup">{
      children.map((child, index) => {
        if (typeof child === 'function') {
          return child(undefined);
        }
        return child;
      })
    }</div>
    </CheckboxContext.Provider>
  );
}