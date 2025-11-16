import { Button } from '@components/Button';

export function CopyButton({ text }) {  
  return <Button onClick={
    () => navigator.clipboard.writeText(text)
  }>
    Copy Code
  </Button>;
}
