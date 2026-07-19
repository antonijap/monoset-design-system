import { lazy } from 'react';
import { REACT_DOC_ROUTES } from './routes.js';

const groupModules = import.meta.glob('./groups/*.jsx');
const pageComponents = Object.fromEntries(
  Object.entries(REACT_DOC_ROUTES).map(([page, modulePath]) => [
    page,
    lazy(async () => {
      const loadGroup = groupModules[modulePath];
      if (!loadGroup) throw new Error(`Missing React docs group: ${modulePath}`);

      const module = await loadGroup();
      const Page = module.PAGES?.[page];
      if (!Page) throw new Error(`Missing React docs page owner: ${page}`);
      return { default: Page };
    }),
  ]),
);

export default function DocsContent({ page, setPage }) {
  const Page = pageComponents[page] ?? pageComponents.introduction;
  return <Page setPage={setPage}/>;
}
