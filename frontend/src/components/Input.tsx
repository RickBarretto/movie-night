

export function TextInput({ id, placeholder, children, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {children}:
      </label>
      <input type="text" id={id} placeholder={placeholder}
        className="border-b-1 border-bottom border-black"
        {...props}
      />
    </div>
  );
}

