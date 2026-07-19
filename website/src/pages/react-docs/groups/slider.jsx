/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Slider } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/slider.css';


function PageSlider() {
  const [slider, setSlider] = useState(42);
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Slider</H1>
      <Lead>A range input. Good for values that feel continuous, like volume or opacity. The thumb is small on purpose; put the current value next to the label so people don't have to squint at it.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--fg2)" }}>
            <span>Volume</span>
            <span style={{ fontFamily:"var(--font-mono)", color:"var(--fg1)" }}>{slider}</span>
          </div>
          <Slider value={[slider]} min={0} max={100} onValueChange={v=>setSlider(v[0])} aria-label="Volume"/>
        </div>
      </Preview>
      <Code language="jsx">{`<Slider defaultValue={[42]} min={0} max={100} onValueChange={…}/>`}</Code>

      <H2 id="api">API</H2>
      <P>Wraps <InlineCode>@radix-ui/react-slider</InlineCode>. Pass an array of two numbers if you want a min/max range with two thumbs.</P>
    </div>
  );
}

export const PAGES = {
  slider: PageSlider,
};
