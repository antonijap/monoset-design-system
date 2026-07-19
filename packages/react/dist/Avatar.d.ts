import * as react from 'react';
import { HTMLAttributes } from 'react';

type AvatarSize = "sm" | "md" | "lg";
interface AvatarSharedProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    size?: AvatarSize;
    /** Optional fallback override. */
    initials?: string;
    /** Optional image URL. */
    src?: string;
    /** Alt text for the image. */
    alt?: string;
}
interface NamedAvatarProps extends AvatarSharedProps {
    /** Name used for the accessible label and fallback initials. */
    name: string;
    decorative?: false;
}
interface DecorativeAvatarProps extends AvatarSharedProps {
    /** Hides the avatar from accessibility APIs. */
    decorative: true;
    name?: string;
}
type AvatarProps = NamedAvatarProps | DecorativeAvatarProps;
declare const Avatar: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLSpanElement>>;

export { Avatar, type AvatarProps, type AvatarSize };
