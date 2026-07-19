/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import DemoLauncher from '../DemoLauncher.jsx';

function PageDatePicker() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>DatePicker</H1>
      <Lead>An editable date field with a calendar popover. It uses CalendarDate values, so dates stay independent of time zones.</Lead>

      <H2 id="basic">Basic</H2>
      <DemoLauncher label="Run DatePicker demo" load={() => import('../demos/datepicker.jsx')}/>
      <Code language="jsx">{`import { CalendarDate, DatePicker } from "@monoset/react";

const [d, setD] = useState(() => new CalendarDate(2026, 7, 17));
<DatePicker value={d} onValueChange={setD}/>`}</Code>

      <H2 id="bounds">Min and max</H2>
      <P>Pass <InlineCode>min</InlineCode> and <InlineCode>max</InlineCode> to bound selection.</P>
      <Code language="jsx">{`import { CalendarDate, DatePicker } from "@monoset/react";

<DatePicker
  value={d}
  onValueChange={setD}
  min={new CalendarDate(2026, 7, 1)}
  max={new CalendarDate(2026, 7, 31)}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"CalendarDate | null", default:"—", desc:"Selected date (controlled)." },
        { name:"defaultValue",  type:"CalendarDate | null", default:"—", desc:"Initial date when uncontrolled." },
        { name:"onValueChange", type:"(value: CalendarDate | null) => void", default:"—", desc:"Called when the date changes or is cleared." },
        { name:"min",           type:"CalendarDate", default:"—", desc:"Earliest selectable date." },
        { name:"max",           type:"CalendarDate", default:"—", desc:"Latest selectable date." },
        { name:"locale",        type:"string",      default:"browser", desc:"Locale for month/weekday labels." },
        { name:"firstDayOfWeek", type:'"sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"', default:"locale", desc:"Overrides the locale's first day of the week." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  datepicker: PageDatePicker,
};
