/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, PropsTable } from '../../../ui/docs.jsx';
import DemoLauncher from '../DemoLauncher.jsx';

function PageCalendar() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Components</div>
      <H1>Calendar</H1>
      <Lead>A standalone month grid for CalendarDate values. Locale settings control its labels and default week start.</Lead>

      <H2 id="basic">Basic</H2>
      <DemoLauncher label="Run Calendar demo" load={() => import('../demos/calendar.jsx')}/>
      <Code language="jsx">{`import { Calendar, CalendarDate } from "@monoset/react";

const [d, setD] = useState(() => new CalendarDate(2026, 7, 17));
<Calendar value={d} onValueChange={setD}/>`}</Code>

      <H2 id="week-start">Week start</H2>
      <P>The locale sets the default. Pass <InlineCode>firstDayOfWeek="sun"</InlineCode> to override it.</P>
      <Code language="jsx">{`<Calendar value={d} onValueChange={setD} firstDayOfWeek="sun"/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"CalendarDate | null", default:"—", desc:"Selected date (controlled)." },
        { name:"defaultValue",  type:"CalendarDate | null", default:"—", desc:"Initial date when uncontrolled." },
        { name:"onValueChange", type:"(date: CalendarDate) => void", default:"—", desc:"Called when a date is selected." },
        { name:"focusedValue",  type:"CalendarDate | null", default:"—", desc:"Focused date (controlled)." },
        { name:"onFocusChange", type:"(date: CalendarDate) => void", default:"—", desc:"Called when the focused date changes." },
        { name:"min",           type:"CalendarDate", default:"—", desc:"Earliest selectable date." },
        { name:"max",           type:"CalendarDate", default:"—", desc:"Latest selectable date." },
        { name:"firstDayOfWeek", type:'"sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"', default:"locale", desc:"Overrides the locale's first day of the week." },
        { name:"locale",        type:"string", default:"browser", desc:"Locale for labels." },
      ]}/>
    </div>
  );
}

export const PAGES = {
  calendar: PageCalendar,
};
