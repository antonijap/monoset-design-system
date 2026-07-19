import { useState } from 'react';
import { MultiCombobox } from '@monoset/react';
import { Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/combobox.css';
import '@monoset/react/styles/multi-combobox.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'design', label: 'Design' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'motion', label: 'Motion' },
  { value: 'tools', label: 'Tools' },
  { value: 'guides', label: 'Guides' },
];

export default function MultiComboboxDemo() {
  const [tags, setTags] = useState(['react', 'design']);
  return (
    <Preview bg="var(--bg)">
      <div style={{ width:'100%', maxWidth:320 }}>
        <MultiCombobox aria-label="Tags" options={options} value={tags} onValueChange={setTags} placeholder="Pick tags"/>
      </div>
    </Preview>
  );
}
