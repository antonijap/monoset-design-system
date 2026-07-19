import * as react from 'react';
import * as RSlider from '@radix-ui/react-slider';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof RSlider.Root> {
    /** Accessible labels applied to thumbs by index. */
    thumbLabels?: readonly (string | undefined)[];
    /** IDs of elements that label thumbs, applied by index. */
    thumbLabelledBy?: readonly (string | undefined)[];
}
declare const Slider: react.ForwardRefExoticComponent<SliderProps & react.RefAttributes<HTMLSpanElement>>;

export { Slider, type SliderProps };
