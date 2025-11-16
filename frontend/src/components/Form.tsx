

export function Form({ title, children }) {
  
  return <form className="prose flex flex-col gap-4">
    <h2 className="text-purple-600">{ title }</h2>
    { children }
  </form>
  
}