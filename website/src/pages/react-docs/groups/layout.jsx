/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, H3, P, Lead, Divider, Preview } from '../../../ui/docs.jsx';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageLayout() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Layout</H1>
      <Lead>Four layout primitives that handle spacing so you never write <InlineCode>display: flex; gap: 16px</InlineCode> by hand again. Stack for vertical, Inline for horizontal, Grid for auto-fit columns, Container for max-width centering.</Lead>

      <H2 id="stack">Stack</H2>
      <P>Vertical spacing. The <InlineCode>gap</InlineCode> prop maps to the <InlineCode>--space-*</InlineCode> token scale (0-14).</P>
      <PlatformPreview
        bg="var(--bg)"
        native="LayoutDemo"
        web={
          <div style={{ width:"100%", maxWidth:300, display:"flex", flexDirection:"column", gap:16 }}>
            {["First item","Second item","Third item"].map(t => (
              <div key={t} style={{ padding:"10px 14px", background:"var(--bg-muted)", borderRadius:6, fontSize:13 }}>{t}</div>
            ))}
          </div>
        }
      />
      <Code language="jsx">{`<Stack gap={4}>
  <Card>First item</Card>
  <Card>Second item</Card>
  <Card>Third item</Card>
</Stack>`}</Code>

      <H2 id="inline">Inline</H2>
      <P>Horizontal with wrap. Good for tag lists, button rows, or any set of items that should flow left to right and wrap naturally.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {["design","monotone","v1.0","react","tokens","motion","layout"].map(t => (
            <span key={t} style={{ fontSize:12, color:"var(--fg2)", background:"var(--bg-muted)", borderRadius:4, padding:"3px 8px" }}>{t}</span>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Inline gap={2}>
  <Badge>design</Badge>
  <Badge>monotone</Badge>
  <Badge>v1.0</Badge>
</Inline>`}</Code>

      <H2 id="grid">Grid</H2>
      <P>Auto-fit responsive grid. Cards wrap to the next row when they can't fit at <InlineCode>minWidth</InlineCode>. No breakpoints needed.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12, width:"100%" }}>
          {["Users","Revenue","Orders","Growth"].map(t => (
            <div key={t} style={{ padding:"16px 14px", background:"var(--bg-muted)", borderRadius:6, border:"1px solid var(--border-subtle)" }}>
              <div style={{ fontSize:11, color:"var(--fg3)", marginBottom:4 }}>{t}</div>
              <div style={{ fontSize:20, fontWeight:600 }}>{[...t].reduce((a, c) => a + c.charCodeAt(0), 0) % 900 + 100}</div>
            </div>
          ))}
        </div>
      </Preview>
      <Code language="jsx">{`<Grid minWidth={200} gap={3}>
  <StatCard title="Users" value={1234}/>
  <StatCard title="Revenue" value="$12k"/>
  <StatCard title="Orders" value={89}/>
  <StatCard title="Growth" value="+12%"/>
</Grid>`}</Code>

      <H2 id="container">Container</H2>
      <P>Centers content with a max-width. Five sizes from <InlineCode>sm</InlineCode> (640px) to <InlineCode>2xl</InlineCode> (1536px). Adds horizontal padding by default.</P>
      <Code language="jsx">{`<Container size="lg">
  <Stack gap={6}>
    <h1>Page title</h1>
    <p>Content is centered with a max-width of 1024px.</p>
  </Stack>
</Container>`}</Code>

      <H2 id="composing">Composing layouts</H2>
      <P>These primitives are designed to nest. A typical page layout stacks sections vertically, each section uses a Container, and the content inside uses Grid or Inline.</P>
      <Code language="jsx">{`<Stack gap={8}>
  <Container size="lg">
    <Stack gap={4}>
      <h1>Dashboard</h1>
      <Grid minWidth={240} gap={4}>
        <StatCard title="Users" value={1234}/>
        <StatCard title="Revenue" value="$12k"/>
        <StatCard title="Orders" value={89}/>
      </Grid>
      <Inline gap={2}>
        <Button variant="primary">Export</Button>
        <Button variant="ghost">Settings</Button>
      </Inline>
    </Stack>
  </Container>
</Stack>`}</Code>

      <Divider/>

      <H3>Stack props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["gap","0-14","4","Spacing scale step (maps to --space-*)"],
              ["align",'"start" | "center" | "end" | "stretch"',"--","Cross-axis alignment"]].map(([p,t,d,desc],i,arr)=>(
              <tr key={p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Inline props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["gap","0-14","4","Spacing scale step"],
              ["align",'"start" | "center" | "end" | "baseline"',"--","Cross-axis alignment"],
              ["wrap","boolean","true","Whether items wrap to new lines"]].map(([p,t,d,desc],i,arr)=>(
              <tr key={p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Grid props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden", marginBottom:24 }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["columns","number","--","Fixed column count (overrides auto-fit)"],
              ["minWidth","number | string","240","Minimum column width for auto-fit"],
              ["gap","0-14","4","Spacing scale step"]].map(([p,t,d,desc],i,arr)=>(
              <tr key={p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3>Container props</H3>
      <div style={{ border:"1px solid var(--border-subtle)", borderRadius:8, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"var(--bg-subtle)" }}>
            {["Prop","Type","Default","Description"].map(h=>(
              <th key={h} style={{ padding:"8px 14px", textAlign:"left", fontWeight:500, fontSize:11, color:"var(--fg3)", letterSpacing:"0.04em", textTransform:"uppercase", borderBottom:"1px solid var(--border-subtle)" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[["size",'"sm" | "md" | "lg" | "xl" | "2xl"','"lg"',"Max-width (640-1536px)"],
              ["padding","boolean","true","Horizontal padding"]].map(([p,t,d,desc],i,arr)=>(
              <tr key={p} style={{ borderBottom:i<arr.length-1?"1px solid var(--border-subtle)":"none" }}>
                <td style={{ padding:"11px 14px" }}><InlineCode>{p}</InlineCode></td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg3)" }}>{t}</td>
                <td style={{ padding:"11px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"var(--fg4)" }}>{d}</td>
                <td style={{ padding:"11px 14px", color:"var(--fg3)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const PAGES = {
  layout: PageLayout,
};
