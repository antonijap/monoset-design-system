import * as react from 'react';

declare const MonosetPortalContext: react.Context<HTMLElement | null>;
declare function useMonosetPortalContainer(): HTMLElement | null;

export { MonosetPortalContext, useMonosetPortalContainer };
