import * as RAvatar from "@radix-ui/react-avatar";
import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "./cx";

export type AvatarSize = "sm" | "md" | "lg";

interface AvatarSharedProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
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

export type AvatarProps = NamedAvatarProps | DecorativeAvatarProps;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = "md", name, initials, src, alt, decorative = false, className, ...rest }, ref
) {
  const normalizedName = typeof name === "string" ? name.trim() : "";
  if (!decorative && !normalizedName) {
    throw new Error("Avatar requires a non-empty name unless decorative.");
  }

  const fallback = (initials?.trim() || getInitials(normalizedName)).slice(0, 2).toUpperCase();

  return (
    <RAvatar.Root
      {...rest}
      ref={ref}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : (alt?.trim() || normalizedName)}
      aria-hidden={decorative || undefined}
      className={cx("ms-avatar", `ms-avatar--${size}`, className)}
    >
      {src && <RAvatar.Image src={src} alt="" aria-hidden className="ms-avatar__img" />}
      <RAvatar.Fallback delayMs={src ? 200 : undefined} aria-hidden>
        {fallback}
      </RAvatar.Fallback>
    </RAvatar.Root>
  );
});
