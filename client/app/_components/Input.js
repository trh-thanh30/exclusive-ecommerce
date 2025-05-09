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
  defaultValue,
  isTextArea = false,
  fullWidth,
  onKeyDown,
  iconClassName,
  textSize = "text-sm", // Thêm prop textSize
}) {
  const inputStyle = `outline-none w-full pr-12 px-3 py-2 transition-colors border rounded-lg border-primary-400 focus-within:border-primary-800 focus-within:shadow-lg focus-within:shadow-primary-200 md:${textSize} text-xs`;

  return (
    <div
      className={`relative flex items-center ${
        fullWidth ? "w-full" : "xl:w-[340px] md:w-[340px] w-[300px]"
      } ${isTextArea ? "w-full" : ""}`}
    >
      {isTextArea ? (
        <textarea
          disabled={disabled}
          className={`${className} ${inputStyle}`}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          id={id}
          name={name}
          rows={5}
        />
      ) : (
        <input
          disabled={disabled}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          type={type}
          className={`${inputStyle} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          name={name}
        />
      )}
      {icon && !isTextArea && (
        <div className="absolute pl-2 border-l border-primary-400 right-3 text-primary-800">
          <span className={iconClassName}>{icon}</span>
        </div>
      )}
    </div>
  );
}
