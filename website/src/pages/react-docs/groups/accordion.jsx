/* eslint-disable react-refresh/only-export-components */
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/accordion.css';


function PageAccordion() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Accordion</H1>
      <Lead>A disclosure pattern. The headings stay visible, the bodies collapse by default. Keyboard and screen reader behavior comes from Radix, so you don't have to wire any of it yourself.</Lead>

      <H2 id="default">Default</H2>
      <Preview bg="var(--bg)">
        <Accordion type="single" collapsible style={{ width:"100%", maxWidth:520 }}>
          <AccordionItem value="license">
            <AccordionTrigger>Is Monoset free?</AccordionTrigger>
            <AccordionContent>Yes. The tokens and components use the MIT license.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="tailwind">
            <AccordionTrigger>Does it work with Tailwind?</AccordionTrigger>
            <AccordionContent>Yes. You can reference the CSS variables from utility classes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="theme">
            <AccordionTrigger>Can I theme it?</AccordionTrigger>
            <AccordionContent>Yes. Override semantic tokens at the root or inside a scope.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Preview>
      <Code language="jsx">{`<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>Is Monoset free?</AccordionTrigger>
    <AccordionContent>Yes. MIT-licensed…</AccordionContent>
  </AccordionItem>
</Accordion>`}</Code>

      <H2 id="api">API</H2>
      <P>Props forward to <InlineCode>@radix-ui/react-accordion</InlineCode>. Set <InlineCode>type="single"</InlineCode> so only one panel opens at a time, or <InlineCode>type="multiple"</InlineCode> if you want people to open several.</P>
    </div>
  );
}

export const PAGES = {
  accordion: PageAccordion,
};
