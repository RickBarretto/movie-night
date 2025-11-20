

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

export function FakeButton({ ...props }) {
  return (
    <button {...props} className="
      bg-purple-300 
      text-purple-800 font-bold 
      py-2 px-4 rounded
    "
    >
      {props.children}
    </button>
  );
}