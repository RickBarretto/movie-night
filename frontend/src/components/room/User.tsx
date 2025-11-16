
export function User({ name, host }) {
  const role = host? 'Host' : 'Guest';
  return <div>
    <span>{ name }</span>
    <span>{ role }</span>
  </div>
}