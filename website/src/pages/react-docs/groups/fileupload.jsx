/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { FileUpload } from '@monoset/react';
import { Code, InlineCode, H1, H2, P, Lead, Preview, PropsTable } from '../../../ui/docs.jsx';
import '@monoset/react/styles/file-upload.css';

function PageFileUpload() {
  const [files, setFiles] = useState([]);
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>File upload</H1>
      <Lead>A native file picker presented as a dropzone. The picker handles pointer and keyboard use; dropped files follow the same selection rules. Selected files stay in a removable list.</Lead>

      <H2 id="basic">Basic</H2>
      <Preview bg="var(--bg)">
        <div style={{ width:"100%", maxWidth:480 }}>
          <FileUpload aria-label="Upload attachments" files={files} onFilesChange={setFiles} accept="image/*,.pdf" multiple/>
        </div>
      </Preview>
      <Code language="jsx">{`const [files, setFiles] = useState([]);

<FileUpload
  aria-label="Upload attachments"
  files={files}
  onFilesChange={setFiles}
  accept="image/*,.pdf"
  multiple
/>`}</Code>

      <H2 id="selection">Selection behavior</H2>
      <P>Each pick or drop replaces the current batch. In single-file mode only the first accepted file is kept. The native picker is cleared after every change, so choosing the same file again still calls <InlineCode>onFilesChange</InlineCode>.</P>

      <H2 id="accept">Rejected files</H2>
      <P>Picker and drop input use the same <InlineCode>accept</InlineCode> rules: extensions, exact MIME types, and wildcards such as <InlineCode>image/*</InlineCode>. <InlineCode>onFilesRejected</InlineCode> receives files that do not match. A fully rejected batch leaves the current selection alone.</P>
      <Code language="jsx">{`<FileUpload
  aria-label="Upload invoice"
  accept=".pdf,application/pdf"
  onFilesRejected={files => showError(files)}
/>`}</Code>

      <H2 id="form">In a form</H2>
      <P>Pass <InlineCode>name</InlineCode> to append each selected file to form data under that key. <InlineCode>form</InlineCode> associates the picker with an external form. Required validity and disabled omission follow native form behavior.</P>
      <Code language="jsx">{`<FileUpload
  aria-label="Upload attachments"
  name="attachments"
  form="support-request"
  multiple
  required
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"files",         type:"File[]", default:"—", desc:"Currently selected files." },
        { name:"defaultFiles",  type:"File[]", default:"[]", desc:"Initial files when uncontrolled." },
        { name:"onFilesChange", type:"(files: File[]) => void", default:"—", desc:"Called when selection changes, including removal." },
        { name:"onFilesRejected", type:"(files: File[]) => void", default:"—", desc:"Called with files that do not match accept." },
        { name:"accept",        type:"string", default:"—", desc:"Native accept string, e.g. \"image/*,.pdf\"." },
        { name:"multiple",      type:"boolean", default:"false", desc:"Allow multiple files." },
        { name:"disabled",      type:"boolean", default:"false", desc:"Block selection." },
        { name:"required",      type:"boolean", default:"false", desc:"Require at least one file." },
        { name:"invalid",       type:"boolean", default:"false", desc:"Apply invalid semantics and styling." },
        { name:"name",          type:"string", default:"—", desc:"Form data key used for each selected file." },
        { name:"form",          type:"string", default:"—", desc:"ID of an external form owner." },
        { name:"children",      type:"ReactNode", default:"built-in prompt", desc:"Custom prompt content inside the dropzone." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  fileupload: PageFileUpload,
};
