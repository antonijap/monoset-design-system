import * as RAspectRatio from "@radix-ui/react-aspect-ratio";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof RAspectRatio.Root> {}

/** Holds a consistent width-to-height ratio for media. `ratio={16/9}` is the default. */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ className, ...rest }, ref) {
    return <RAspectRatio.Root ref={ref} className={cx("ms-aspect-ratio", className)} {...rest} />;
  },
);
