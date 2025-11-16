

export function Callout({ hint, ...props}) {
  return <section>
    <span><b>{ hint }:</b></span>
    &nbsp;
    { props.children }
  </section>
}