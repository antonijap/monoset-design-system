/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead } from '../../../ui/docs.jsx';

function PageDataTableGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Data table with filters</H1>
      <Lead>A searchable, filterable, sortable data table with row selection and bulk actions. The pattern you need every time someone says "can we add an admin view for this?"</Lead>

      <H2 id="overview">What we're building</H2>
      <P>A table of users with: a search input that filters by name or email, a select dropdown that filters by role, sortable column headers, row checkboxes, and a bulk action bar that appears when rows are selected.</P>

      <H2 id="search">Search filter</H2>
      <P>An Input above the table. Filter rows on each keystroke.</P>
      <Code language="jsx">{`const [search, setSearch] = useState("");

const filtered = users.filter(u =>
  u.name.toLowerCase().includes(search.toLowerCase()) ||
  u.email.toLowerCase().includes(search.toLowerCase())
);

<Field label="Search users">
  <Input
    placeholder="Search by name or email..."
    value={search}
    onChange={e => setSearch(e.target.value)}/>
</Field>`}</Code>

      <H2 id="column-filter">Column filter</H2>
      <P>A Select for role filtering. Combine it with the search filter.</P>
      <Code language="jsx">{`const [roleFilter, setRoleFilter] = useState("all");

const filtered = users
  .filter(u => roleFilter === "all" || u.role === roleFilter)
  .filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

<Inline gap={3}>
  <div style={{ flex:1 }}>
    <Input placeholder="Search..." value={search}
      onChange={e => setSearch(e.target.value)}/>
  </div>
  <Select value={roleFilter} onValueChange={setRoleFilter}>
    <SelectTrigger placeholder="All roles"/>
    <SelectContent>
      <SelectItem value="all">All roles</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="member">Member</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</Inline>`}</Code>

      <H2 id="sort">Sort</H2>
      <P>Use <InlineCode>TableHeader</InlineCode> with an <InlineCode>onSort</InlineCode> callback. Keep the sort state in a single object.</P>
      <Code language="jsx">{`const [sort, setSort] = useState({ key:"name", dir:"asc" });

function toggleSort(key) {
  setSort(prev =>
    prev.key === key
      ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
      : { key, dir: "asc" }
  );
}

const sorted = [...filtered].sort((a, b) => {
  const v = a[sort.key].localeCompare(b[sort.key]);
  return sort.dir === "asc" ? v : -v;
});`}</Code>

      <H2 id="selection">Row selection and bulk actions</H2>
      <P>Track selected row IDs in a Set. Show the bulk action bar only when the set is non-empty.</P>
      <Code language="jsx">{`const [selected, setSelected] = useState(new Set());

function toggleAll() {
  setSelected(prev =>
    prev.size === sorted.length ? new Set() : new Set(sorted.map(u => u.id))
  );
}

function toggleOne(id) {
  setSelected(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
}

{selected.size > 0 && (
  <Inline gap={3} align="center">
    <span className="meta">{selected.size} selected</span>
    <Button variant="ghost" size="sm" onClick={exportSelected}>
      Export
    </Button>
    <Button variant="danger" size="sm" onClick={deleteSelected}>
      Delete
    </Button>
  </Inline>
)}`}</Code>

      <H2 id="full-table">Full example</H2>
      <P>Everything wired together.</P>
      <Code language="jsx">{`export default function UsersAdmin() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState({ key:"name", dir:"asc" });
  const [selected, setSelected] = useState(new Set());

  const filtered = users
    .filter(u => roleFilter === "all" || u.role === roleFilter)
    .filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );

  const sorted = [...filtered].sort((a, b) => {
    const v = a[sort.key].localeCompare(b[sort.key]);
    return sort.dir === "asc" ? v : -v;
  });

  return (
    <Stack gap={4}>
      <Inline gap={3}>
        <div style={{ flex:1 }}>
          <Input placeholder="Search..." value={search}
            onChange={e => setSearch(e.target.value)}/>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger placeholder="All roles"/>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </Inline>

      {selected.size > 0 && (
        <Inline gap={3} align="center">
          <Badge variant="solid">{selected.size} selected</Badge>
          <Button variant="ghost" size="sm">Export</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </Inline>
      )}

      <Table maxHeight={400}>
        <thead><tr>
          <TableSelectAll checked={selected.size === sorted.length}
            onChange={toggleAll}/>
          <TableHeader sortable sortDirection={sort.key==="name" ? sort.dir : null}
            onSort={() => toggleSort("name")}>Name</TableHeader>
          <TableHeader sortable sortDirection={sort.key==="role" ? sort.dir : null}
            onSort={() => toggleSort("role")}>Role</TableHeader>
          <th>Status</th>
        </tr></thead>
        <tbody>
          {sorted.map(u => (
            <tr key={u.id}>
              <TableSelectRow checked={selected.has(u.id)}
                onChange={() => toggleOne(u.id)}/>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td><Badge variant="outline">{u.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
}`}</Code>
    </div>
  );
}

export const PAGES = {
  datatable: PageDataTableGuide,
};
