/* eslint-disable react-refresh/only-export-components */
import { Card } from '@monoset/react';
import { Code, H1, H2, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/card.css';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageCards() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Card</H1>
      <Lead>A surface container. Outline by default. Use the elevated variant when a card needs to feel lifted off the page, or the inset variant inside forms and modals where the surrounding panel already does the grouping.</Lead>

      <H2 id="outline">Outline</H2>
      <PlatformPreview
        bg="var(--bg)"
        web={
          <Card style={{ width:"100%", maxWidth:320 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Outline card</div>
            <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Default surface. Hairline border, no shadow.</div>
          </Card>
        }
        native="CardDemo"
      />
      <Code>{`<Card>
  <h3>Outline card</h3>
  <p>Default surface. Hairline border, no shadow.</p>
</Card>`}</Code>

      <H2 id="elevated">Elevated</H2>
      <Preview>
        <Card variant="elevated" style={{ width:"100%", maxWidth:320 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Elevated card</div>
          <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Use when lifting off a subtle background.</div>
        </Card>
      </Preview>
      <Code>{`<Card variant="elevated">Elevated card</Card>`}</Code>

      <H2 id="inset">Inset</H2>
      <Preview>
        <Card variant="inset" style={{ width:"100%", maxWidth:320 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:6 }}>Inset card</div>
          <div style={{ fontSize:12, color:"var(--fg3)", lineHeight:1.5 }}>Borderless. For sidebars or quiet sections.</div>
        </Card>
      </Preview>
      <Code>{`<Card variant="inset">Inset card</Card>`}</Code>
    </div>
  );
}

export const PAGES = {
  cards: PageCards,
};
