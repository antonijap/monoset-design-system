import { Card } from '@monoset/react';
import '@monoset/react/styles/card.css';

export default function CardDemo({ props }) {
  return (
    <Card style={{
      width:'100%', maxWidth:320, padding:16,
      ...(props.variant === 'elevated' ? { boxShadow:'0 1px 3px rgb(0 0 0 / 0.08)' } : {}),
      ...(props.variant === 'inset' ? { background:'var(--bg-subtle)', border:'none' } : {}),
    }}>
      <div style={{ fontSize:13 }}>{props.children}</div>
    </Card>
  );
}
