// eslint-disable-next-line react/prop-types
export default function CheckBox({ className, type, text, ...rest }) {
  return (
    <label className={className}>
      <input type={type} {...rest} />
      <span> {text}</span>
    </label>
  );
}
