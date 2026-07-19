import { Button } from '@monoset/react';
import '@monoset/react/styles/button.css';

export default function ButtonDemo({ props }) {
  return <Button variant={props.variant} size={props.size} disabled={props.disabled}>{props.children}</Button>;
}
