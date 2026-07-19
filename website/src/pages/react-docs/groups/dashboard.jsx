/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead } from '../../../ui/docs.jsx';

function PageDashboardGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Building a dashboard</H1>
      <Lead>A sidebar, a header, stat cards, and a data table. This is the layout you end up building for every SaaS admin panel. Here's how it comes together with Monoset.</Lead>

      <H2 id="shell">The shell</H2>
      <P>The outer frame is a CSS grid: a fixed sidebar on the left, the main content area on the right. The header sits inside the content area, not spanning the full width.</P>
      <Code language="jsx">{`function DashboardShell({ children }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"240px 1fr",
                  height:"100vh" }}>
      <Sidebar/>
      <div style={{ display:"flex", flexDirection:"column",
                    overflow:"hidden" }}>
        <Header/>
        <main style={{ flex:1, overflowY:"auto", padding:24 }}>
          <Container size="xl">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}`}</Code>

      <H2 id="sidebar">Sidebar</H2>
      <P>A vertical nav with grouped links. The active item gets a muted background.</P>
      <Code language="jsx">{`function Sidebar() {
  const [active, setActive] = useState("overview");
  const groups = [
    { label:"General", items:[
      { id:"overview", label:"Overview", icon:"layout" },
      { id:"analytics", label:"Analytics", icon:"barChart" },
      { id:"reports", label:"Reports", icon:"file" },
    ]},
    { label:"Management", items:[
      { id:"users", label:"Users", icon:"users" },
      { id:"billing", label:"Billing", icon:"creditCard" },
      { id:"settings", label:"Settings", icon:"settings" },
    ]},
  ];

  return (
    <aside style={{ borderRight:"1px solid var(--border-subtle)",
                    padding:"20px 12px", background:"var(--bg-subtle)" }}>
      <Stack gap={6}>
        {groups.map(g => (
          <Stack key={g.label} gap={1}>
            <div className="meta" style={{ padding:"0 8px" }}>
              {g.label}
            </div>
            {g.items.map(item => (
              <button key={item.id} type="button" onClick={() => setActive(item.id)}
                style={{
                  background: active===item.id
                    ? "var(--bg-muted)" : "transparent",
                  borderRadius:6, padding:"7px 10px",
                  fontSize:13, display:"flex", gap:8,
                }}>
                <Icon name={item.icon} size={15}/>
                {item.label}
              </button>
            ))}
          </Stack>
        ))}
      </Stack>
    </aside>
  );
}`}</Code>

      <H2 id="stat-cards">Stat cards</H2>
      <P>A responsive grid of summary metrics. The Grid component handles the responsive layout; each card is just a Card with a title, value, and optional trend indicator.</P>
      <Code language="jsx">{`const stats = [
  { title:"Total users",  value:"12,847", change:"+12%" },
  { title:"Revenue",      value:"$48.2k", change:"+8.3%" },
  { title:"Active now",   value:"342",    change:null },
  { title:"Conversion",   value:"3.2%",   change:"-0.4%" },
];

<Grid minWidth={200} gap={4}>
  {stats.map(s => (
    <Card key={s.title} pad={16}>
      <div className="meta">{s.title}</div>
      <div style={{ fontSize:24, fontWeight:600, marginTop:4 }}>
        {s.value}
      </div>
      {s.change && (
        <div style={{ fontSize:12, marginTop:4,
          color: s.change.startsWith("+")
            ? "var(--status-success)" : "var(--status-danger)" }}>
          {s.change} from last month
        </div>
      )}
    </Card>
  ))}
</Grid>`}</Code>

      <H2 id="data-table">Data table</H2>
      <P>Below the stat cards, a sortable table with row selection. Use <InlineCode>TableHeader</InlineCode> for sortable columns and <InlineCode>TableSelectAll</InlineCode> / <InlineCode>TableSelectRow</InlineCode> for the checkboxes.</P>
      <Code language="jsx">{`const [sort, setSort] = useState({ key:"name", dir:"asc" });
const [selected, setSelected] = useState(new Set());

<Table maxHeight={400}>
  <thead>
    <tr>
      <TableSelectAll
        checked={selected.size === users.length}
        onChange={() => {/* toggle all */}}/>
      <TableHeader sortable sortDirection={sort.key==="name" ? sort.dir : null}
        onSort={() => toggleSort("name")}>Name</TableHeader>
      <TableHeader sortable sortDirection={sort.key==="role" ? sort.dir : null}
        onSort={() => toggleSort("role")}>Role</TableHeader>
      <th>Status</th>
      <th>MRR</th>
    </tr>
  </thead>
  <tbody>
    {sorted.map(user => (
      <tr key={user.id}>
        <TableSelectRow checked={selected.has(user.id)}
          onChange={() => toggle(user.id)}/>
        <td>
          <Inline gap={2} align="center">
            <Avatar name={user.name} size="sm"/>
            <div>
              <div>{user.name}</div>
              <div className="meta">{user.email}</div>
            </div>
          </Inline>
        </td>
        <td>{user.role}</td>
        <td><Badge variant="outline">{user.status}</Badge></td>
        <td>{user.mrr}</td>
      </tr>
    ))}
  </tbody>
</Table>`}</Code>

      <H2 id="full-page">Putting it together</H2>
      <P>The full dashboard page composes all three sections inside the shell.</P>
      <Code language="jsx">{`export default function DashboardPage() {
  return (
    <DashboardShell>
      <Stack gap={6}>
        <Inline gap={4} align="center">
          <h1>Overview</h1>
          <Badge variant="outline">Live</Badge>
        </Inline>
        <StatCards/>
        <UsersTable/>
      </Stack>
    </DashboardShell>
  );
}`}</Code>
    </div>
  );
}

export const PAGES = {
  dashboard: PageDashboardGuide,
};
