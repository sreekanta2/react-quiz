import classes from "../styles/Form.module.css";
// eslint-disable-next-line react/prop-types
export default function Form({ children, className, ...rest }) {
  return (
    <form {...rest} className={`${className}  ${classes.form} `} action="#">
      {children}
    </form>
  );
}
