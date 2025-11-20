import { Button } from '@components/Button';

export function CopyButton({ text, children }) {  
  return <Button onClick={
    () => navigator.clipboard.writeText(text)
  }>
    {children}
  </Button>;
}
