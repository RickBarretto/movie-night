

export function Card({  ...props }) {
  return (
    <div className="rounded-2xl bg-slate-50 shadow-xl p-6">
      {props.children}
    </div>
  );
}