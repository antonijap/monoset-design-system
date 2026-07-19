import * as react from 'react';
import * as RAspectRatio from '@radix-ui/react-aspect-ratio';

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof RAspectRatio.Root> {
}
/** Holds a consistent width-to-height ratio for media. The default ratio is square. */
declare const AspectRatio: react.ForwardRefExoticComponent<AspectRatioProps & react.RefAttributes<HTMLDivElement>>;

export { AspectRatio, type AspectRatioProps };
