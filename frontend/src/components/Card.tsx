

export function Card({  ...props }) {
  return (
    <div className="rounded-2xl shadow-xl p-6">
      {props.children}
    </div>
  );
}