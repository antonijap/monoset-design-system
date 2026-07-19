import * as react from 'react';
import * as RSeparator from '@radix-ui/react-separator';

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof RSeparator.Root> {
}
declare const Separator: react.ForwardRefExoticComponent<SeparatorProps & react.RefAttributes<HTMLDivElement>>;

export { Separator, type SeparatorProps };
