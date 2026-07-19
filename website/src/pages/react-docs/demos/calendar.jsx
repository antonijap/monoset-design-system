import { useState } from 'react';
import { Calendar, CalendarDate } from '@monoset/react';
import { Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/calendar.css';

export default function CalendarDemo() {
  const [date, setDate] = useState(() => new CalendarDate(2026, 7, 17));
  return <Preview bg="var(--bg)"><Calendar value={date} onValueChange={setDate}/></Preview>;
}
