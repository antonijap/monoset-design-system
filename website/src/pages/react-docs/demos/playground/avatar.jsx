import { Avatar } from '@monoset/react';
import { getAvatarNameError } from '../../../../playground/avatar.js';
import '@monoset/react/styles/avatar.css';

export default function AvatarDemo({ props }) {
  const error = getAvatarNameError(props.name);
  if (error) {
    return <div role="alert" style={{ fontSize:12, color:'var(--status-danger)' }}>{error}</div>;
  }
  return <Avatar name={props.name} size={props.size} initials={props.initials || undefined} src={props.src || undefined}/>;
}
