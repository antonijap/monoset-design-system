import { useState } from 'react';
import { CalendarDate, DatePicker } from '@monoset/react';
import { Preview } from '../../../ui/docs.jsx';
import '@monoset/react/styles/date-picker.css';
import '@monoset/react/styles/calendar.css';

export default function DatePickerDemo() {
  const [date, setDate] = useState(() => new CalendarDate(2026, 7, 17));
  return <Preview bg="var(--bg)"><DatePicker value={date} onValueChange={setDate}/></Preview>;
}
