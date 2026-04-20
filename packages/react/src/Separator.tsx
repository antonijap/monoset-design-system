import * as RSeparator from "@radix-ui/react-separator";
import { cx } from "./cx";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RSeparator.Root> {}

export function Separator({ className, ...rest }: SeparatorProps) {
  return <RSeparator.Root className={cx("ms-separator", className)} {...rest} />;
}
