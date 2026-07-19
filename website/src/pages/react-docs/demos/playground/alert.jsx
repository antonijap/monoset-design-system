import { Alert } from '@monoset/react';
import '@monoset/react/styles/alert.css';

export default function AlertDemo({ props }) {
  return <Alert title={props.title} style={{ width:'100%', maxWidth:400 }}>{props.children}</Alert>;
}
