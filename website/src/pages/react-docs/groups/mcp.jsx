/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageMcpGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>MCP server</H1>
      <Lead>Make Monoset's bundled component catalog, tokens, and docs index available to an MCP client.</Lead>

      <H2 id="what-is-mcp">What this does</H2>
      <P>MCP (Model Context Protocol) is a standard way for AI tools to talk to external systems. Monoset's MCP server exposes five tools your agent can call:</P>

      <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:24,
        border:"1px solid var(--border-subtle)", borderRadius:10, overflow:"hidden" }}>
        {[
          { name:"list_components", desc:"Returns every component in @monoset/react with a one-line description." },
          { name:"get_component", desc:"Returns the import path, optional example, and docs link for one exported component." },
          { name:"list_tokens", desc:"Returns the bundled token names and values." },
          { name:"get_token", desc:"Returns the value and type for one dotted token name." },
          { name:"search_docs", desc:"Searches the bundled docs index and returns up to eight deep links." },
        ].map((tool, i, arr) => (
          <div key={tool.name} style={{ padding:"12px 18px", display:"flex", gap:12, alignItems:"flex-start",
            borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
            <code style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"var(--fg1)", background:"var(--bg-muted)",
              padding:"2px 8px", borderRadius:4, whiteSpace:"nowrap", flexShrink:0 }}>{tool.name}</code>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>{tool.desc}</div>
          </div>
        ))}
      </div>

      <H2 id="install-mcp">Install</H2>
      <Code filename="terminal">{`npm install -g @monoset/mcp-server`}</Code>

      <H2 id="claude-code">Claude Code</H2>
      <P>Claude Code picks up MCP servers from your project settings or global config. Add Monoset to your project:</P>
      <Code filename="terminal">{`claude mcp add monoset -- monoset-mcp`}</Code>
      <P>Claude Code can now call the five lookup tools in this guide.</P>

      <H2 id="claude-desktop">Claude Desktop</H2>
      <P>Add this to your Claude Desktop config file:</P>
      <Code filename="~/Library/Application Support/Claude/claude_desktop_config.json">{`{
  "mcpServers": {
    "monoset": {
      "command": "monoset-mcp"
    }
  }
}`}</Code>
      <P>Restart Claude Desktop after saving the config.</P>

      <H2 id="cursor">Cursor</H2>
      <P>Add a <InlineCode>.cursor/mcp.json</InlineCode> file with <InlineCode>monoset-mcp</InlineCode> as the stdio command.</P>
      <Code filename=".cursor/mcp.json">{`{
  "mcpServers": {
    "monoset": {
      "command": "monoset-mcp"
    }
  }
}`}</Code>

      <Divider/>

      <H2 id="what-it-looks-like">Useful queries</H2>
      <P>Ask for the data the server actually exposes:</P>

      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
        {[
          "Which React components are exported?",
          "Show the import and docs link for Dialog.",
          "What is the value of spacing.4?",
          "Find the dark mode guide.",
        ].map(prompt => (
          <div key={prompt} style={{ padding:"10px 14px", background:"var(--bg-subtle)", borderRadius:6,
            fontSize:12, color:"var(--fg2)", lineHeight:1.5, fontFamily:"var(--font-mono)",
            border:"1px solid var(--border-subtle)" }}>
            {prompt}
          </div>
        ))}
      </div>

      <P>The server returns reference data. Your agent still needs to read the component types and verify the code it writes.</P>

      <H2 id="why">Why this matters</H2>
      <P>The server gives an MCP client a searchable index of the package instead of making it infer component names or token values.</P>

      <H2 id="combine-with-llm">Combine with LLM naming</H2>
      <P>The MCP catalog helps an agent choose package exports. <InlineCode>data-ms</InlineCode> attributes from the LLM naming guide give it stable selectors in your application.</P>
    </div>
  );
}

export const PAGES = {
  mcp: PageMcpGuide,
};
