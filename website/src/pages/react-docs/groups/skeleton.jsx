/* eslint-disable react-refresh/only-export-components */
import { Skeleton, Stack } from '@monoset/react';
import { Code, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/skeleton.css';
import '@monoset/react/styles/layout.css';

function PlatformPreview({ web, bg }) {
  return <Preview bg={bg}>{web}</Preview>;
}

function PageSkeleton() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Skeleton</H1>
      <Lead>A placeholder shape while real content loads. Show one only if the wait is over 400ms; faster than that, just render the result.</Lead>

      <H2 id="basic">Basic skeletons</H2>
      <PlatformPreview
        bg="var(--bg)"
        native="SkeletonDemo"
        web={
          <div style={{ width:"100%" }}>
            <Stack gap={2} style={{ maxWidth:320 }}>
              <Skeleton style={{ height:14, width:"60%" }}/>
              <Skeleton style={{ height:14, width:"100%" }}/>
              <Skeleton style={{ height:14, width:"85%" }}/>
            </Stack>
          </div>
        }
      />
      <Code language="jsx">{`import { Skeleton } from "@monoset/react";

<Skeleton style={{ height: 14, width: "60%" }}/>`}</Code>

      <H2 id="card">Card skeleton</H2>
      <P>Match the shape of the real content. Three lines, an avatar, a button: whatever the loaded state will show.</P>
      <Preview bg="var(--bg)">
        <div style={{ display:"flex", gap:12, alignItems:"flex-start", padding:14, border:"1px solid var(--border-subtle)", borderRadius:8, width:"100%", maxWidth:360 }}>
          <Skeleton style={{ width:36, height:36, borderRadius:"50%", flexShrink:0 }}/>
          <Stack gap={2} style={{ flex:1 }}>
            <Skeleton style={{ height:12, width:"50%" }}/>
            <Skeleton style={{ height:11, width:"80%" }}/>
            <Skeleton style={{ height:11, width:"65%" }}/>
          </Stack>
        </div>
      </Preview>
    </div>
  );
}

export const PAGES = {
  skeleton: PageSkeleton,
};
