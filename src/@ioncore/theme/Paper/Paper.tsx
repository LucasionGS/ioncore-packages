import React from "react";
import "./Paper.css";

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  square?: boolean;
}

export function Paper(props: PaperProps) {
  const { children, square = false, className = "", ...rest } = props;
  const classes = [
    "ic-Paper",
    square ? "ic-Paper--square" : "",
    className,
  ]
  return (
    <div className={classes.join(" ")} {...rest}>
      {children}
    </div>
  );
};
