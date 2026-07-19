/* eslint-disable react-refresh/only-export-components */
import { Avatar, HoverCard, HoverCardTrigger, HoverCardContent } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/hover-card.css';
import '@monoset/react/styles/avatar.css';

function PageHoverCard() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>HoverCard</H1>
      <Lead>A rich tooltip. Use it when the preview content is too much for a one-line tooltip but not so much that it deserves its own page. Common cases: user mentions, link previews, ticket summaries.</Lead>

      <H2 id="basic">Basic usage</H2>
      <Preview bg="var(--bg)">
        <span style={{ fontSize:13, color:"var(--fg2)" }}>
          Hover over{" "}
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href="#" onClick={(e) => e.preventDefault()}
                 style={{ color:"var(--fg1)", fontWeight:500, textDecoration:"underline", textUnderlineOffset:2 }}>
                @ada
              </a>
            </HoverCardTrigger>
            <HoverCardContent side="bottom" sideOffset={8}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <Avatar name="Ada Turing" size="md"/>
                <div>
                  <div style={{ fontWeight:600, fontSize:13 }}>Ada Turing</div>
                  <div style={{ fontSize:12, color:"var(--fg3)", marginTop:2 }}>Designer · Joined 2026</div>
                  <div style={{ fontSize:12, color:"var(--fg2)", marginTop:8, lineHeight:1.55 }}>
                    Working on the new dashboard design.
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {" "}to see a card.
        </span>
      </Preview>
      <Code language="jsx">{`import { HoverCard, HoverCardTrigger, HoverCardContent } from "@monoset/react";

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/users/ada">@ada</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <strong>Ada Turing</strong>
    <p style={{ marginTop: 6, color: "var(--fg2)" }}>
      Designer · Joined 2026
    </p>
  </HoverCardContent>
</HoverCard>`}</Code>

      <H2 id="link-preview">Link preview</H2>
      <P>Wrap any link to show a preview when the user hovers. Good for internal mentions, doc links, or external services where you want to show context before the click.</P>
      <Code language="jsx">{`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/issues/247">#247</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <Stack gap={2}>
      <Badge variant="solid">Open</Badge>
      <strong>Email digest is missing the unsubscribe link</strong>
      <p style={{ color: "var(--fg2)" }}>
        Reported by ada@acme.com · 4 comments
      </p>
    </Stack>
  </HoverCardContent>
</HoverCard>`}</Code>

      <H2 id="vs-tooltip">HoverCard vs Tooltip</H2>
      <P>Use <InlineCode>Tooltip</InlineCode> for a short label or keyboard hint. Use <InlineCode>HoverCard</InlineCode> for structured preview content. HoverCard opens from hover or focus, but the trigger should still make sense without the preview.</P>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"side",       type:'"top" | "right" | "bottom" | "left"', default:'"bottom"', desc:"Which side of the trigger to render." },
        { name:"sideOffset", type:"number",                              default:"6",        desc:"Distance from the trigger in pixels." },
        { name:"align",      type:'"start" | "center" | "end"',          default:'"center"', desc:"Alignment relative to the trigger." },
      ]}/>
      <P>The root <InlineCode>HoverCard</InlineCode> also accepts <InlineCode>openDelay</InlineCode> and <InlineCode>closeDelay</InlineCode> in milliseconds. Defaults are 700 and 300, the same as Radix.</P>
    </div>
  );
}

export const PAGES = {
  hovercard: PageHoverCard,
};
