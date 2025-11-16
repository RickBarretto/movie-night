

export function Button({ ...props }) {
  return (
    <button {...props} className="
      bg-purple-500 hover:bg-purple-600 
      text-white font-bold 
      py-2 px-4 rounded cursor-pointer
    "
    >
      {props.children}
    </button>
  );
}