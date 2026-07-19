import * as RAspectRatio from "@radix-ui/react-aspect-ratio";
import { forwardRef } from "react";
import { cx } from "./cx";

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof RAspectRatio.Root> {}

/** Holds a consistent width-to-height ratio for media. The default ratio is square. */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = 1, className, ...rest }, ref) {
    const normalizedRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
    return <RAspectRatio.Root ref={ref} ratio={normalizedRatio} className={cx("ms-aspect-ratio", className)} {...rest} />;
  },
);
