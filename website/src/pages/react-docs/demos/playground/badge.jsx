import { Badge } from '@monoset/react';
import '@monoset/react/styles/badge.css';

export default function BadgeDemo({ props }) {
  return <Badge variant={props.variant}>{props.children}</Badge>;
}
