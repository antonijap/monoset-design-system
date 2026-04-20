import * as RAvatar from "@radix-ui/react-avatar";
import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  /** Initials shown when no image, or if image fails. */
  initials?: string;
  /** Optional image URL. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = "md", initials, src, alt = "", className, ...rest }, ref
) {
  return (
    <RAvatar.Root ref={ref} className={cx("ms-avatar", `ms-avatar--${size}`, className)} {...rest}>
      {src && <RAvatar.Image src={src} alt={alt} className="ms-avatar__img" />}
      <RAvatar.Fallback delayMs={200}>{initials?.slice(0, 2).toUpperCase()}</RAvatar.Fallback>
    </RAvatar.Root>
  );
});
