import { Card } from './Card';

export function CardForm({ title, children }) {
  
  return <Card>
    <form className="prose flex flex-col gap-4">
      <h2 className="text-purple-600">{ title }</h2>
      { children }
    </form>
  </Card>
}