type InputProps = {
    error?: string;
}& React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
 error, ...rest
}: InputProps) => {
  return (
      <div className="flex flex-col gap-1">
        <input
          {...rest}
        className={`outline-0 h-11 p-4 text-left font-semibold text-(--font-body-md) rounded-xs ${error ? "bg-(--color-error-low)" : "bg-(--color-surface-high)"}`}
      />
         {error && (
        <span className="text-(--color-error) text-sm">
          {error}
        </span>
      )}
      </div>
  );
};

export default Input;
