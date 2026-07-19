import { useState } from 'react';
import { Combobox } from '@monoset/react';
import { Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/combobox.css';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

export default function ComboboxDemo() {
  const [country, setCountry] = useState(null);
  return (
    <Preview bg="var(--bg)">
      <div style={{ width:'100%', maxWidth:280 }}>
        <Combobox aria-label="Country" value={country} onValueChange={setCountry} options={options} placeholder="Pick a country"/>
      </div>
    </Preview>
  );
}
