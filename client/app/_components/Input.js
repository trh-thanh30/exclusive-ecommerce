export default function Input({
  icon,
  placeholder,
  className,
  value,
  onChange,
  id,
  name,
  type = "text",
  disabled,
  isTextArea = false,
  fullWidth,
}) {
  const inputStyle =
    "text-sm outline-none w-full pr-12 px-3 py-2 transition-colors border rounded-lg border-primary-400 focus-within:border-primary-800 focus-within:shadow-lg focus-within:shadow-primary-200";
  return (
    <div
      className={`relative flex items-center ${
        fullWidth ? "w-full" : "w-[380px]"
      } ${isTextArea ? "w-full" : ""}`}
    >
      {isTextArea ? (
        <textarea
          disabled={disabled}
          className={` ${className} ${inputStyle}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
          rows={5}
        />
      ) : (
        <input
          disabled={disabled}
          type={type}
          className={`${inputStyle}  ${className} `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
        />
      )}
      {icon && !isTextArea && (
        <span className="absolute pl-2 border-l border-primary-400 right-3 text-primary-800">
          {icon}
        </span>
      )}
    </div>
  );
}
