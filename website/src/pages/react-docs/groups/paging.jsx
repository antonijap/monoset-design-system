/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Pagination } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/pagination.css';


function PagePagination() {
  const [page, setPage] = useState(3);
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Pagination</H1>
      <Lead>Page-by-page navigation for tables and long lists. If you don't know the total upfront, prefer infinite scroll or load-more. Pagination needs a known total.</Lead>

      <H2 id="basic">Basic pagination</H2>
      <Preview bg="var(--bg)">
        <Pagination page={page} pageCount={10} onPageChange={setPage}/>
      </Preview>
      <Code language="jsx">{`import { Pagination } from "@monoset/react";

const [page, setPage] = useState(1);
<Pagination page={page} pageCount={10} onPageChange={setPage}/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"page",         type:"number",                  default:"—", desc:"Current page (1-indexed)." },
        { name:"pageCount",    type:"number",                  default:"—", desc:"Total number of pages." },
        { name:"onPageChange", type:"(page: number) => void",  default:"—", desc:"Called when the user picks a different page." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  paging: PagePagination,
};
