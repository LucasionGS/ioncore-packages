import "./Button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "warning" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "medium",
    // color,
    fullWidth = false,
    icon,
    className,
    children,
    ...rest
  } = props;
  const classes = `ic-Button ic-Button--${variant} ic-Button--${size} ${fullWidth && 'ic-Button--fullWidth'} ${className}`;

  return (
    <button className={classes} {...rest}>
      {icon && <span className="ic-Button-icon">{icon}</span>}
      {children}
    </button>
  );
}
