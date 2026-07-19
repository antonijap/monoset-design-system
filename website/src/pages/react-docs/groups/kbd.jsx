/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { CommandPalette, Kbd } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/kbd.css';
import '@monoset/react/styles/command.css';


function PageKbd() {
  const [pressed, setPressed] = useState(new Set());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lastShortcut, setLastShortcut] = useState(null);

  useEffect(() => {
    const norm = (e) => {
      const k = e.key;
      if (k === "Meta") return "Cmd";
      if (k === "Control") return "Ctrl";
      if (k === "Shift") return "Shift";
      if (k === "Alt") return "Alt";
      if (k === " ") return "Space";
      return k.length === 1 ? k.toUpperCase() : k;
    };
    const down = (e) => {
      setPressed(p => new Set(p).add(norm(e)));
      // ⌘K / Ctrl+K → open palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(v => !v);
        setLastShortcut("⌘K");
      }
      // / → focus search
      if (e.key === "/" && !(e.target?.tagName === "INPUT")) {
        e.preventDefault();
        setLastShortcut("/");
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    const up = (e) => setPressed(p => { const n = new Set(p); n.delete(norm(e)); return n; });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Kbd</H1>
      <Lead>Renders a keyboard shortcut. The little <InlineCode>⌘K</InlineCode> chip you see in search bars and menus. Use it anywhere a user might reach for the mouse when they didn't have to.</Lead>

      <H2 id="try">Try it: press a key</H2>
      <P>The chips below light up when you press the matching key. <InlineCode>⌘K</InlineCode> (or <InlineCode>Ctrl+K</InlineCode>) opens the command palette.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"center", minHeight:80 }}>
          <div style={{ display:"flex", gap:6 }}>
            {["Cmd", "Ctrl", "Shift", "Alt", "K", "/", "Enter", "Esc"].map(k => (
              <KbdKey key={k} active={pressed.has(k) || (k === "Esc" && pressed.has("Escape"))}>{k}</KbdKey>
            ))}
          </div>
          <div style={{ fontSize:12, color:"var(--fg3)", minHeight:18 }}>
            {lastShortcut
              ? <>Last shortcut caught: <span style={{ fontFamily:"var(--font-mono)", color:"var(--fg1)" }}>{lastShortcut}</span></>
              : "Press something…"}
          </div>
        </div>
      </Preview>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={[
          { id:"docs", label:"Open documentation", onSelect:() => setLastShortcut("Open documentation") },
          { id:"theme", label:"Change theme", onSelect:() => setLastShortcut("Change theme") },
        ]}
      />

      <H2 id="default">In context</H2>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:10, alignItems:"center", fontSize:12, color:"var(--fg2)" }}>
          Open command bar
          <span style={{ display:"inline-flex", gap:4 }}>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      </Preview>
      <Code language="jsx">{`<Kbd>⌘</Kbd> <Kbd>K</Kbd>`}</Code>

      <H2 id="sizes">Sizes</H2>
      <P><InlineCode>sm</InlineCode> for inside body text, <InlineCode>md</InlineCode> (the default) for menus and tooltips.</P>
      <Code language="jsx">{`<Kbd size="sm">Esc</Kbd>
<Kbd size="md">Enter</Kbd>`}</Code>
    </div>
  );
}

export const PAGES = {
  kbd: PageKbd,
};
