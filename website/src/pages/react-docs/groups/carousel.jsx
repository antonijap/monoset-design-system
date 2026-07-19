/* eslint-disable react-refresh/only-export-components */
import { Carousel } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/carousel.css';


function PageCarousel() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Carousel</H1>
      <Lead>Horizontal slider with arrow buttons and pagination dots. Each child becomes a slide; CSS scroll-snap keeps slides aligned. Optional <InlineCode>autoplay</InlineCode> for hero sections.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:520 }}>
          <Carousel>
            {[1,2,3,4].map((n) => (
              <div key={n} style={{ height:160, background:"var(--bg-muted)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:48, fontWeight:700, color:"var(--fg2)" }}>
                {n}
              </div>
            ))}
          </Carousel>
        </div>
      </Preview>
      <Code language="jsx">{`<Carousel>
  <Slide>1</Slide>
  <Slide>2</Slide>
  <Slide>3</Slide>
</Carousel>`}</Code>

      <P>Dragging or trackpad scrolling updates the active slide after the track settles. Autoplay pauses while the carousel is hovered or focused, while the page is hidden, and when reduced motion is requested.</P>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"index",          type:"number", default:"—", desc:"Controlled current slide." },
        { name:"defaultIndex",   type:"number", default:"0", desc:"Uncontrolled initial slide." },
        { name:"onIndexChange",  type:"(i: number) => void", default:"—", desc:"Called when the slide changes." },
        { name:"showArrows",     type:"boolean", default:"true", desc:"Render previous/next arrow buttons." },
        { name:"showDots",       type:"boolean", default:"true", desc:"Render pagination dots." },
        { name:"autoplay",       type:"number", default:"—", desc:"Auto-advance interval in ms. Pauses during interaction and for reduced motion." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  carousel: PageCarousel,
};
