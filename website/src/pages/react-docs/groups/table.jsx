/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Table, TableHeader } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead } from '../../../ui/docs.jsx';
import '@monoset/react/styles/table.css';


function PageTable() {
  const [sortDirection, setSortDirection] = useState("asc");
  const rows = [
    { name:"Ada Turing",     email:"ada@monoset.dev",     role:"Admin",  status:"active",  mrr:"$240" },
    { name:"Grace Hopper",   email:"grace@monoset.dev",   role:"Member", status:"pending", mrr:"$120" },
    { name:"Linus Bell",     email:"linus@monoset.dev",   role:"Viewer", status:"paused",  mrr:"$0"   },
    { name:"Margaret Clarke",email:"margaret@monoset.dev",role:"Admin",  status:"active",  mrr:"$320" },
    { name:"Donald Keene",   email:"donald@monoset.dev",  role:"Member", status:"active",  mrr:"$180" },
    { name:"Rosa Park",      email:"rosa@monoset.dev",    role:"Viewer", status:"pending", mrr:"$0"   },
    { name:"Hedy Lamarr",    email:"hedy@monoset.dev",    role:"Admin",  status:"active",  mrr:"$420" },
    { name:"Alan Turing",    email:"alan@monoset.dev",    role:"Member", status:"paused",  mrr:"$0"   },
    { name:"Katherine Goble",email:"katherine@monoset.dev",role:"Member",status:"active",  mrr:"$160" },
  ];
  const palette = ["var(--mono-800)","var(--mono-600)","var(--mono-700)","var(--mono-900)","var(--mono-500)"];
  const statusColor = { active:"var(--status-success)", pending:"var(--status-warning)", paused:"var(--fg3)" };
  const renderRow = (r, i) => (
    <tr key={r.email}>
      <td>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ width:24, height:24, borderRadius:"50%", background:palette[i % palette.length], color:"#fff",
                         display:"inline-flex", alignItems:"center", justifyContent:"center",
                         fontSize:10, fontWeight:600, flexShrink:0 }}>{r.name.split(" ").map(s=>s[0]).join("")}</span>
          <div><div style={{ color:"var(--fg1)", fontWeight:500 }}>{r.name}</div>
               <div style={{ color:"var(--fg3)", fontSize:11 }}>{r.email}</div></div>
        </div>
      </td>
      <td style={{ color:"var(--fg2)" }}>{r.role}</td>
      <td>
        <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:999, background:"var(--bg-muted)",
                       color:statusColor[r.status]||"var(--fg2)", border:"1px solid var(--border-subtle)",
                       display:"inline-flex", alignItems:"center", gap:4 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:statusColor[r.status]||"var(--fg2)" }}/>
          {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
        </span>
      </td>
      <td style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg2)" }}>{r.mrr}</td>
    </tr>
  );
  const sortedRows = [...rows].sort((a, b) => (
    sortDirection === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  ));
  const header = (
    <thead><tr>
      <TableHeader
        sortable
        sortDirection={sortDirection}
        onSort={() => setSortDirection(current => current === "asc" ? "desc" : "asc")}
      >
        Name
      </TableHeader>
      {["Role","Status","MRR"].map(h => <TableHeader key={h}>{h}</TableHeader>)}
    </tr></thead>
  );
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Table</H1>
      <Lead>Dense rows with hairline separators. Pass `maxHeight` and the wrapper caps its height with the header pinned. Narrower viewports scroll sideways.</Lead>

      <H2 id="example-table">Example</H2>
      <div style={{ marginBottom:16 }}>
        <Table>
          {header}
          <tbody>{sortedRows.slice(0, 3).map(renderRow)}</tbody>
        </Table>
      </div>
      <Code language="jsx">{`<Table>
  <thead>
    <tr>
      <TableHeader sortable sortDirection={direction} onSort={toggleSort}>
        Name
      </TableHeader>
      <TableHeader>Role</TableHeader>
    </tr>
  </thead>
  <tbody>{rows.map(…)}</tbody>
</Table>`}</Code>

      <P>Sortable headers place the interaction on a real button and set <InlineCode>aria-sort</InlineCode> on the header cell. Your app owns the row ordering and passes the current direction back in.</P>

      <H2 id="scroll-table">Scrollable with sticky header</H2>
      <P>Pass <InlineCode>maxHeight</InlineCode> and the wrapper caps its height and scrolls. The <InlineCode>thead</InlineCode> stays pinned.</P>
      <div style={{ marginBottom:16 }}>
        <Table maxHeight={220}>
          {header}
          <tbody>{sortedRows.map(renderRow)}</tbody>
        </Table>
      </div>
      <Code language="jsx">{`<Table maxHeight={220}>
  <thead>…</thead>
  <tbody>{rows.map(…)}</tbody>
</Table>`}</Code>
    </div>
  );
}

export const PAGES = {
  table: PageTable,
};
