/* eslint-disable react-refresh/only-export-components */
import { AspectRatio } from '@monoset/react';
import { Code, H1, H2, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/aspect-ratio.css';


function PageAspectRatio() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Aspect ratio</H1>
      <Lead>Holds media at a fixed width-to-height ratio so layouts don't jump while images load. Wrap an image, video, or map embed and pass the ratio you want.</Lead>

      <H2 id="example">Example</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:360 }}>
          <AspectRatio ratio={16/9}>
            <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg, var(--mono-200), var(--mono-400))", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--fg2)", fontSize:12 }}>16 : 9</div>
          </AspectRatio>
        </div>
      </Preview>
      <Code language="jsx">{`import { AspectRatio } from "@monoset/react";

<AspectRatio ratio={16/9}>
  <img src="/cover.jpg" alt="Cover" />
</AspectRatio>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"ratio", type:"number", default:"1", desc:"Width divided by height, e.g. 16/9 or 4/3." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  aspectratio: PageAspectRatio,
};
