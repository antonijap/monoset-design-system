import { useState } from 'react';
import { NumberInput } from '@monoset/react';
import { Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/number-input.css';

export default function NumberInputDemo() {
  const [quantity, setQuantity] = useState(1);
  return <Preview bg="var(--bg)"><NumberInput aria-label="Quantity" value={quantity} onValueChange={setQuantity} min={0} max={99}/></Preview>;
}
