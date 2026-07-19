import { Textarea } from '@monoset/react';
import '@monoset/react/styles/input.css';

export default function TextareaDemo({ props }) {
  return <Textarea placeholder={props.placeholder} rows={props.rows} disabled={props.disabled} style={{ width:'100%', maxWidth:320 }}/>;
}
