/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, PropsTable } from '../../../ui/docs.jsx';

function PageCli() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Tools</div>
      <H1>CLI</H1>
      <Lead>Copy one of the CLI's supported source groups into your project, then edit the files in place.</Lead>

      <H2 id="install">Install</H2>
      <Code language="bash" filename="terminal">{`npm install -g @monoset/cli`}</Code>
      <P>Or use it without installing via <InlineCode>npx</InlineCode>:</P>
      <Code language="bash" filename="terminal">{`npx @monoset/cli add button card`}</Code>

      <H2 id="init">Initialize a project</H2>
      <P>Run <InlineCode>monoset init</InlineCode> to scaffold the CSS entry point and get instructions for installing the token and component packages.</P>
      <Code language="bash" filename="terminal">{`monoset init`}</Code>
      <P>This creates a <InlineCode>src/monoset.css</InlineCode> file that imports the token and component stylesheets. Then install the packages:</P>
      <Code language="bash" filename="terminal">{`npm install @monoset/tokens @monoset/react`}</Code>

      <H2 id="add">Add components</H2>
      <P>Run <InlineCode>monoset list</InlineCode> to see the current registry. The CLI copies the selected source files and their registered local dependencies.</P>
      <Code language="bash" filename="terminal">{`monoset add button card input dialog`}</Code>
      <P>Files land in <InlineCode>src/components/monoset/</InlineCode> by default. The command prints any package dependencies you need to install.</P>

      <H2 id="add-all">Add every registered group</H2>
      <Code language="bash" filename="terminal">{`monoset add --all`}</Code>

      <H2 id="list">List available components</H2>
      <Code language="bash" filename="terminal">{`monoset list`}</Code>

      <H2 id="options">Options</H2>
      <PropsTable rows={[
        { name:"--out <dir>",   type:"flag", default:"src/components/monoset", desc:"Where to write the files." },
        { name:"--overwrite",   type:"flag", default:"false",                  desc:"Replace existing files." },
        { name:"--all",         type:"flag", default:"false",                  desc:"Add every registered source group." },
      ]}/>

      <H2 id="how">How it works</H2>
      <P>The CLI fetches registered source files from the Monoset repository's main branch. It skips existing files unless you pass <InlineCode>--overwrite</InlineCode>.</P>
      <P>The source-copy registry is a supported subset of <InlineCode>@monoset/react</InlineCode>. Inspect the diff whenever you overwrite local changes.</P>

      <H2 id="vs-npm">CLI vs npm package</H2>
      <P>Both approaches work. Use <InlineCode>@monoset/react</InlineCode> from npm if you want a standard dependency you can upgrade with a version bump. Use the CLI if you want to own the source and modify components in place.</P>
    </div>
  );
}

export const PAGES = {
  cli: PageCli,
};
