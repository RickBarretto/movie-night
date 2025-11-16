
export function RoomStatus({ open }) {
  const status = open ? 'Open' : 'Closed';
  return <div>{status}</div>;
}