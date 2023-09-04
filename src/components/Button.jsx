import classes from "../styles/Button.module.css";
/* eslint-disable react/prop-types */
export default function Button({ children, className, ...rest }) {
  return (
    <button {...rest} className={`${classes.button} ${className}`}>
      {children}
    </button>
  );
}
