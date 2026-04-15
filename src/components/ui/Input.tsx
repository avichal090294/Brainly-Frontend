interface InputProps {
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({ placeholder, ref }: InputProps) => {
  return (
    <div>
      <input
        ref={ref}
        className="border border-gray-300 rounded px-2 py-1 my-2 w-full"
        type={"text"}
        placeholder={placeholder}
      />
    </div>
  );
};
