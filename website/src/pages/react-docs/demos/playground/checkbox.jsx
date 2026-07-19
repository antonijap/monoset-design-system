import { Checkbox } from '@monoset/react';
import '@monoset/react/styles/choice-controls.css';

export default function CheckboxDemo({ props }) {
  return <Checkbox checked={props.checked} label={props.label}/>;
}
