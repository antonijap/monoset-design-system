import { Switch } from '@monoset/react';
import '@monoset/react/styles/choice-controls.css';

export default function SwitchDemo({ props }) {
  return <Switch checked={props.checked} label={props.label}/>;
}
