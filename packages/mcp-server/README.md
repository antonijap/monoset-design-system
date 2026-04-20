# @monoset/mcp-server

A Model Context Protocol server that exposes the Monoset design system to agents (Claude Desktop, Cursor, Windsurf, etc).

Ask an agent "what Monoset components exist?" or "show me the mono-600 token" and it gets a structured, up-to-date answer instead of hallucinating.

## Tools

| Tool | Purpose |
|---|---|
| `list_components` | Every component exported from `@monoset/react` with a one-line description. |
| `get_component(name)` | Import path + short docs URL for one component. |
| `list_tokens` | Every design token (flattened). |
| `get_token(name)` | Value and type for one token (e.g. `color.mono.600`). |
| `search_docs(query)` | Full-text search across the Monoset docs; returns deep-linked URLs. |

## Install

```bash
npm install -g @monoset/mcp-server
```

Then point your agent at the `monoset-mcp` binary.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "monoset": {
      "command": "monoset-mcp"
    }
  }
}
```

Restart Claude Desktop. The Monoset tools appear automatically.

### Cursor / Windsurf

Both support MCP via the same stdio protocol. See their docs for the exact config file; the command is the same.

## Data refresh

The server reads bundled JSON in `data/` at startup. Regenerate after a component or token change:

```bash
npm run build-data --workspace=@monoset/mcp-server
```

This also runs automatically on `prepublishOnly`.

## License

MIT
