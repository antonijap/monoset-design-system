import { Input } from '@monoset/react';
import '@monoset/react/styles/input.css';

export default function InputDemo({ props }) {
  return <Input placeholder={props.placeholder} disabled={props.disabled} style={{ width:'100%', maxWidth:320 }}/>;
}
