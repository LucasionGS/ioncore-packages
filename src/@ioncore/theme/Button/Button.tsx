import "./Button.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {

}

export function Button(props: ButtonProps) {
  const { className, ...rest } = props;
  return (
    <button {...rest} />
  )
}