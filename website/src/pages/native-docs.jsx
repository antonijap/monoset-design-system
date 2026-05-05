import { useState, useRef } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import {
  Code, InlineCode, H1, H2, H3, P, Lead, PhonePreview, PropsTable,
} from '../ui/docs.jsx';
import {
  Button, Card, Input, Field, Stack, Inline, Switch, Spinner, Skeleton,
  Avatar, Badge, Alert, Divider, EmptyState, ListItem, Checkbox,
  RadioGroup, Radio, Chip, Progress,
  Sheet, Dialog, ToastProvider, useToast,
  Slider, SegmentedControl, TabBar,
  PasswordInput, NumberInput, PinInput,
  Tabs, Combobox, Accordion, AccordionItem,
  NavigationHeader, NavigationBack, ActionSheet, AppShell,
  DatePicker,
  colors, mono, fontSize, space,
} from '@monoset/native';

/* ─── Tiny RN-flavored text helpers (rendered via react-native-web) ───── */
const T = {
  H1:  ({ children }) => <Text style={{ fontSize: fontSize["2xl"], fontWeight: '700', color: colors.fg1, letterSpacing: -0.4 }}>{children}</Text>,
  H2:  ({ children }) => <Text style={{ fontSize: fontSize.lg,    fontWeight: '600', color: colors.fg1 }}>{children}</Text>,
  Lead: ({ children }) => <Text style={{ fontSize: fontSize.sm,   color: colors.fg3, lineHeight: fontSize.sm * 1.55 }}>{children}</Text>,
  Body: ({ children, dim }) => <Text style={{ fontSize: fontSize.sm, color: dim ? colors.fg3 : colors.fg1 }}>{children}</Text>,
  Meta: ({ children }) => <Text style={{ fontSize: fontSize.xs, color: colors.fg3, fontWeight: '500', letterSpacing: 0.6, textTransform: 'uppercase' }}>{children}</Text>,
};

/* ─── Reusable rows that show "this is what your app could look like" ── */
function Row({ title, body, right }) {
  return (
    <Inline justify="between" gap={3} align="center">
      <View style={{ flex: 1 }}>
        <T.Body>{title}</T.Body>
        {body && <View style={{ marginTop: 2 }}><T.Body dim>{body}</T.Body></View>}
      </View>
      {right}
    </Inline>
  );
}

function Section({ label, children }) {
  return (
    <View style={{ marginBottom: space[6] }}>
      <View style={{ paddingLeft: space[2], paddingBottom: space[2] }}><T.Meta>{label}</T.Meta></View>
      <Card><Stack gap={4}>{children}</Stack></Card>
    </View>
  );
}


/* ═══════════════════════════════════════════════════════════════════════
   Pages
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Page: Introduction ───────────────────────────────────────── */
function PageIntroduction() {
  return (
    <div>
      <div className="eyebrow">Getting started</div>
      <H1>Monoset Native</H1>
      <Lead>The Monoset philosophy on React Native. Variant API on the surface, vanilla <InlineCode>StyleSheet</InlineCode> inside. Same component names as the web kit. v0.1 ships the eight components you'd reach for on day one of any new app.</Lead>

      <H2 id="preview">A real screen, in &lt; 40 lines</H2>
      <P>This is one component composing the rest. Read the <InlineCode>basic usage</InlineCode> page for the source. Every part of it is visible above, and none is custom-styled.</P>
      <PhonePreview title="Account">
        <View style={{ marginBottom: space[5] }}>
          <Inline gap={3} align="center">
            <Avatar name="Ada Turing"/>
            <View style={{ flex: 1 }}>
              <T.Body>Ada Turing</T.Body>
              <View style={{ marginTop: 2 }}><T.Body dim>ada@monoset.dev</T.Body></View>
            </View>
            <Pressable><T.Body dim>Edit</T.Body></Pressable>
          </Inline>
        </View>

        <Section label="Notifications">
          <Row title="Email alerts" body="Daily summary of activity" right={<Switch label="Email" defaultChecked/>}/>
          <Row title="Push notifications" body="Mentions and direct replies" right={<Switch label="Push"/>}/>
          <Row title="Weekly digest" body="Sent every Sunday" right={<Switch label="Digest" defaultChecked/>}/>
        </Section>

        <Section label="Security">
          <Row title="Two-factor auth" body="Required on sign-in" right={<Switch label="2FA" defaultChecked/>}/>
          <Row title="Active sessions" body="2 devices" right={<T.Body dim>›</T.Body>}/>
        </Section>

        <Stack gap={2}>
          <Button variant="primary">Save changes</Button>
          <Button variant="ghost">Sign out</Button>
        </Stack>
      </PhonePreview>

      <H2 id="philosophy">Same philosophy, platform-tuned scale</H2>
      <P>One neutral ramp, one typeface, one easing curve. Tokens use the same keys as the web kit (<InlineCode>fontSize.base</InlineCode>, <InlineCode>space[5]</InlineCode>, <InlineCode>radius.md</InlineCode>) so cross-platform code reads the same on both sides. The values are tuned per platform. The native font scale follows <strong>Apple's Human Interface Guidelines</strong>: body at 17pt (vs. 14 on web), title sizes from iOS Title 1/2/3, and button heights at Apple's 44pt minimum tap target.</P>

      <H2 id="extending">Made to be extended</H2>
      <P>Every component exports its variant tokens. Every named style recipe in <InlineCode>styles.ts</InlineCode> is importable, so you can compose your own components on the same foundations:</P>
      <Code language="tsx">{`import { Pressable, Text } from 'react-native';
import { styles, colors, fontSize } from '@monoset/native';

// A custom IconButton built on Monoset's Button style recipes
export function IconButton({ icon, ...rest }) {
  return (
    <Pressable
      style={[styles.msBtn, styles.msBtnSm, styles.msBtnSecondary, { paddingHorizontal: 8 }]}
      {...rest}
    >
      {icon}
    </Pressable>
  );
}`}</Code>
    </div>
  );
}

/* ─── Page: Installation ───────────────────────────────────────── */
function PageInstallation() {
  return (
    <div>
      <div className="eyebrow">Getting started</div>
      <H1>Installation</H1>
      <Lead>Works in Expo (recommended) or bare React Native 0.74+. Reanimated is only required if you also install the motion package.</Lead>

      <H2 id="install">Install</H2>
      <Code language="bash" filename="terminal">{`npm install @monoset/native @monoset/motion-native react-native-reanimated`}</Code>

      <H2 id="reanimated">Reanimated setup</H2>
      <P>Reanimated needs a Babel plugin. Add it last in your <InlineCode>babel.config.js</InlineCode>:</P>
      <Code language="js" filename="babel.config.js">{`module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // must be last
    ],
  };
};`}</Code>

      <H2 id="components-only">Components only</H2>
      <P>The component kit on its own uses RN's built-in <InlineCode>Animated</InlineCode> API for Switch, Spinner, and Skeleton, so you don't need Reanimated:</P>
      <Code language="bash" filename="terminal">{`npm install @monoset/native`}</Code>
    </div>
  );
}

/* ─── Page: Usage ──────────────────────────────────────────────── */
function PageUsage() {
  const [email, setEmail] = useState('ada@monoset.dev');
  const [notify, setNotify] = useState(true);

  return (
    <div>
      <div className="eyebrow">Getting started</div>
      <H1>Basic usage</H1>
      <Lead>A small Account screen. Field-wrapped inputs, a Switch row, and a primary action. Same composition you'd write on the web, just with RN primitives instead of HTML.</Lead>

      <H2 id="screen">Screen</H2>
      <PhonePreview title="Account">
        <Stack gap={5}>
          <Field label="Email" help="Used for sign-in.">
            <Input value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
          </Field>
          <Field label="Display name">
            <Input placeholder="Ada Turing"/>
          </Field>
          <Inline justify="between">
            <View style={{ flex: 1 }}>
              <T.Body>Email alerts</T.Body>
              <View style={{ marginTop: 2 }}><T.Body dim>Daily summary</T.Body></View>
            </View>
            <Switch label="Notifications" checked={notify} onCheckedChange={setNotify}/>
          </Inline>
          <Button variant="primary">Save changes</Button>
          <Button variant="ghost">Sign out</Button>
        </Stack>
      </PhonePreview>

      <H2 id="code">Code</H2>
      <Code language="tsx" filename="AccountScreen.tsx">{`import { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Stack, Field, Input, Inline, Switch, Button,
} from '@monoset/native';

export default function AccountScreen() {
  const [email, setEmail] = useState('ada@monoset.dev');
  const [notify, setNotify] = useState(true);

  return (
    <Stack gap={5}>
      <Field label="Email" help="Used for sign-in.">
        <Input
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Field>
      <Field label="Display name">
        <Input placeholder="Ada Turing"/>
      </Field>
      <Inline justify="between">
        <Text>Email alerts</Text>
        <Switch checked={notify} onCheckedChange={setNotify}/>
      </Inline>
      <Button variant="primary">Save changes</Button>
      <Button variant="ghost">Sign out</Button>
    </Stack>
  );
}`}</Code>
    </div>
  );
}

/* ─── Page: Tokens ─────────────────────────────────────────────── */
function PageTokens() {
  return (
    <div>
      <div className="eyebrow">Foundations</div>
      <H1>Tokens</H1>
      <Lead>Same shape as the web tokens, but as plain JavaScript exports instead of CSS variables. Drop them straight into <InlineCode>StyleSheet.create</InlineCode>, <InlineCode>Animated</InlineCode> values, or any RN style object.</Lead>

      <H2 id="import">Import</H2>
      <Code language="ts">{`import { tokens, colors, space, radius, fontSize, shadow } from '@monoset/native';`}</Code>

      <H2 id="colors">Colors</H2>
      <P>The semantic palette is a JS mirror of the web's <InlineCode>--bg</InlineCode>, <InlineCode>--fg1</InlineCode>, <InlineCode>--border</InlineCode>, etc.</P>
      <Code language="ts">{`const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
  },
  body: { color: colors.fg2 },
});`}</Code>

      <H2 id="space">Spacing</H2>
      <P>Same 4px-base scale as the web (<InlineCode>space[1]</InlineCode> through <InlineCode>space[14]</InlineCode>). Numbers are pixels.</P>

      <H2 id="type">Type scale (iOS-aligned)</H2>
      <P>The native scale runs about 3 points above the web kit so body text reads at a comfortable size on a phone. Same keys, different values. Code stays portable and the text looks right on each platform.</P>
      <PropsTable rows={[
        { name: 'fontSize.xs',   type: '11', default: 'web: 11', desc: 'iOS Caption 2. Micro labels.' },
        { name: 'fontSize.sm',   type: '13', default: 'web: 12', desc: 'iOS Footnote. Helper text and secondary labels.' },
        { name: 'fontSize.base', type: '17', default: 'web: 14', desc: 'iOS Body. The default for body text and most controls.' },
        { name: 'fontSize.lg',   type: '20', default: 'web: 16', desc: 'iOS Title 3.' },
        { name: 'fontSize.xl',   type: '22', default: 'web: 20', desc: 'iOS Title 2.' },
        { name: 'fontSize["2xl"]', type: '28', default: 'web: 24', desc: 'iOS Title 1.' },
        { name: 'fontSize["3xl"]', type: '34', default: 'web: 30', desc: 'iOS Large Title.' },
      ]}/>
      <P>Components consume these defaults: Button labels use <InlineCode>fontSize.base</InlineCode> (17pt), Input text is 17pt, Field labels are 13pt. Override on a per-component basis when needed via the <InlineCode>style</InlineCode> prop.</P>

      <H2 id="touch">Tap targets</H2>
      <P>Apple's HIG calls for a minimum 44pt tap target. Monoset's medium Button and Input both hit exactly 44pt of height; the small Button is 36pt (still comfortable for inline actions), large is 50pt (use for primary CTAs). Don't go smaller than 36pt unless the affordance is huge.</P>

      <H2 id="shadow">Shadows</H2>
      <P>Pre-shaped for iOS and Android. Each shadow object includes the iOS <InlineCode>shadow*</InlineCode> properties and Android's <InlineCode>elevation</InlineCode>.</P>
      <Code language="ts">{`<View style={[styles.card, shadow.md]}/>`}</Code>
    </div>
  );
}

/* ─── Page: Motion ─────────────────────────────────────────────── */
function PageMotion() {
  return (
    <div>
      <div className="eyebrow">Foundations</div>
      <H1>Motion</H1>
      <Lead>Same easings and durations as the web kit, mapped to Reanimated. Use the named entering presets directly on <InlineCode>Animated.View</InlineCode>, or compose your own with <InlineCode>withMonosetTiming</InlineCode>.</Lead>

      <H2 id="entering">Entering presets</H2>
      <Code language="tsx">{`import Animated from 'react-native-reanimated';
import { fadeUp, slideInRight, scaleIn } from '@monoset/motion-native';

<Animated.View entering={fadeUp}>
  <Card>Hello</Card>
</Animated.View>

<Animated.View entering={slideInRight}>
  <Sheet/>
</Animated.View>`}</Code>

      <H2 id="custom">Custom timing</H2>
      <P>For shared values, <InlineCode>withMonosetTiming</InlineCode> returns the right <InlineCode>{'{ duration, easing }'}</InlineCode> object for the named speed and curve.</P>
      <Code language="tsx">{`import { useSharedValue, withTiming } from 'react-native-reanimated';
import { withMonosetTiming } from '@monoset/motion-native';

const opacity = useSharedValue(0);
opacity.value = withTiming(1, withMonosetTiming('base'));`}</Code>

      <H2 id="constants">Constants</H2>
      <P><InlineCode>EASE_STANDARD</InlineCode>, <InlineCode>EASE_EMPHASIS</InlineCode>, <InlineCode>EASE_EXIT</InlineCode> mirror the web's bezier curves. <InlineCode>DUR.fast</InlineCode>, <InlineCode>DUR.base</InlineCode>, <InlineCode>DUR.slow</InlineCode> are 120ms / 180ms / 280ms.</P>
    </div>
  );
}

/* ─── Page: Button ─────────────────────────────────────────────── */
function PageButtons() {
  const [saving, setSaving] = useState(false);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Button</H1>
      <Lead>Pressable + Text under the hood. Four variants across three sizes, each sized to a comfortable touch target: small is 36pt, medium hits Apple's 44pt minimum, large is 50pt for primary CTAs. Corners follow iOS conventions (10 / 14 / 16pt) so buttons sit naturally next to native UIKit controls. Labels render at 17pt semibold (iOS body weight).</Lead>

      <H2 id="screen">In context</H2>
      <P>A confirm action at the bottom of a sheet. Primary on top, ghost cancel underneath. You'll repeat this pattern in every form.</P>
      <PhonePreview title="Delete project">
        <Stack gap={5}>
          <T.Body>This will permanently remove the project and all of its data. You can't undo this.</T.Body>
          <Stack gap={2}>
            <Button
              variant="danger"
              onPress={() => { setSaving(true); setTimeout(() => setSaving(false), 1500); }}
              disabled={saving}
              leading={saving ? <Spinner size={14} color="#fff"/> : null}
            >
              {saving ? 'Deleting…' : 'Delete project'}
            </Button>
            <Button variant="ghost">Cancel</Button>
          </Stack>
        </Stack>
      </PhonePreview>

      <H2 id="variants">Variants</H2>
      <PhonePreview>
        <Stack gap={3}>
          <Button variant="primary">Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'variant',  type:'"primary" | "secondary" | "ghost" | "danger"', default:'"secondary"', desc:'Visual style.' },
        { name:'size',     type:'"sm" | "md" | "lg"', default:'"md"', desc:'Height and font size.' },
        { name:'disabled', type:'boolean', default:'false', desc:'Prevents press handling.' },
        { name:'leading',  type:'ReactNode', default:'—', desc:'Element rendered before the label.' },
        { name:'trailing', type:'ReactNode', default:'—', desc:'Element rendered after the label.' },
        { name:'onPress',  type:'(e) => void', default:'—', desc:'Press handler. Forwards to Pressable.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Card ───────────────────────────────────────────────── */
function PageCards() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Card</H1>
      <Lead>A View with a hairline border. Three variants: outline (default, almost always right), elevated when something needs to lift off the page, and inset when a border would be too much.</Lead>

      <H2 id="screen">A feed</H2>
      <P>Cards as list items in a vertical scroll. The default variant works for almost every list. No shadow, no fuss.</P>
      <PhonePreview title="Home">
        <Stack gap={3}>
          {[
            { title: 'Weekly recap', body: 'You shipped 14 commits and merged 3 PRs.', meta: '3 min read' },
            { title: 'Sprint review',  body: 'Planning is locked in for next two weeks.', meta: '5 min read' },
            { title: 'Retro notes',    body: 'What went well, what didn\'t, what to try next.', meta: '4 min read' },
            { title: 'Deploy log',     body: 'Last release went out clean. No rollback.', meta: '2 min read' },
          ].map((c) => (
            <Card key={c.title}>
              <Stack gap={2}>
                <T.Body>{c.title}</T.Body>
                <T.Body dim>{c.body}</T.Body>
                <T.Body dim>{c.meta}</T.Body>
              </Stack>
            </Card>
          ))}
        </Stack>
      </PhonePreview>

      <H2 id="variants">Variants</H2>
      <PhonePreview>
        <Stack gap={3}>
          <Card>
            <T.Body>Default</T.Body>
            <View style={{ marginTop: 4 }}><T.Body dim>Hairline border, no shadow.</T.Body></View>
          </Card>
          <Card variant="elevated">
            <T.Body>Elevated</T.Body>
            <View style={{ marginTop: 4 }}><T.Body dim>Soft cross-platform shadow.</T.Body></View>
          </Card>
          <Card variant="inset">
            <T.Body>Inset</T.Body>
            <View style={{ marginTop: 4 }}><T.Body dim>Subtle background fill, no border.</T.Body></View>
          </Card>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'variant', type:'"default" | "elevated" | "inset"', default:'"default"', desc:'Visual style.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Input ──────────────────────────────────────────────── */
function PageInputs() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [edited, setEdited] = useState(false);
  const isInvalid = edited && !email.includes('@');

  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Input</H1>
      <Lead>TextInput with focus and invalid states baked in. Wrap with <InlineCode>Field</InlineCode> for label, helper text, and error message. Same API as the web kit, sized at 44pt tall with 17pt text to match iOS HIG.</Lead>

      <H2 id="screen">Sign in</H2>
      <P>Two fields, a primary button, a small link. The classic.</P>
      <PhonePreview title="Sign in">
        <Stack gap={5}>
          <View style={{ marginBottom: space[2] }}>
            <T.H1>Welcome back</T.H1>
            <View style={{ marginTop: space[2] }}><T.Lead>Sign in to continue.</T.Lead></View>
          </View>
          <Field
            label="Email"
            help="We'll send a confirmation."
            error={isInvalid ? 'Enter a valid email.' : undefined}
          >
            <Input
              value={email}
              onChangeText={(t) => { setEmail(t); setEdited(true); }}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
              invalid={isInvalid}
            />
          </Field>
          <Field label="Password">
            <Input value={pw} onChangeText={setPw} secureTextEntry placeholder="••••••••"/>
          </Field>
          <Button variant="primary">Sign in</Button>
          <Pressable style={{ alignSelf: 'center' }}>
            <T.Body dim>Forgot your password?</T.Body>
          </Pressable>
        </Stack>
      </PhonePreview>

      <H2 id="states">States</H2>
      <PhonePreview>
        <Stack gap={3}>
          <Field label="Default"><Input placeholder="Type something"/></Field>
          <Field label="Read only"><Input value="Not editable" editable={false}/></Field>
          <Field label="Invalid" error="That doesn't look right."><Input value="bad value" invalid/></Field>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'invalid',  type:'boolean', default:'false', desc:'Marks the input red.' },
        { name:'editable', type:'boolean', default:'true',  desc:'When false, applies the disabled style.' },
      ]}/>
      <P>All other props forward to <InlineCode>TextInput</InlineCode>.</P>
    </div>
  );
}

/* ─── Page: Layout (Stack & Inline) ────────────────────────────── */
function PageLayout() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Stack &amp; Inline</H1>
      <Lead>Two flex primitives so you don't write <InlineCode>flexDirection: 'row', alignItems: 'center', gap: 12</InlineCode> by hand. Stack is vertical, Inline is horizontal. Both take a <InlineCode>gap</InlineCode> token from the spacing scale.</Lead>

      <H2 id="screen">Composing a screen</H2>
      <P>The whole layout below is two Stacks, a couple of Inlines, and a few Cards. No custom flex code anywhere.</P>
      <PhonePreview title="Activity">
        <Stack gap={5}>
          <Inline justify="between">
            <T.Body>Today</T.Body>
            <T.Body dim>Apr 30</T.Body>
          </Inline>
          <Card>
            <Stack gap={3}>
              <Inline gap={3} align="center">
                <Avatar name="Grace Hopper"/>
                <View style={{ flex: 1 }}>
                  <T.Body>Grace shipped v1.2.0</T.Body>
                  <View style={{ marginTop: 2 }}><T.Body dim>2 minutes ago</T.Body></View>
                </View>
              </Inline>
              <Inline gap={3} align="center">
                <Avatar name="Linus Bell"/>
                <View style={{ flex: 1 }}>
                  <T.Body>Linus opened PR #218</T.Body>
                  <View style={{ marginTop: 2 }}><T.Body dim>22 minutes ago</T.Body></View>
                </View>
              </Inline>
            </Stack>
          </Card>
          <Inline justify="between">
            <T.Body>Yesterday</T.Body>
            <T.Body dim>Apr 29</T.Body>
          </Inline>
          <Card variant="inset">
            <Stack gap={2}>
              <T.Body>Daily standup</T.Body>
              <T.Body dim>Notes captured by 4 people.</T.Body>
            </Stack>
          </Card>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <H3>Stack</H3>
      <PropsTable rows={[
        { name:'gap',   type:'0-14', default:'4', desc:'Space between children, mapped to the spacing scale.' },
        { name:'align', type:'"stretch" | "start" | "center" | "end"', default:'"stretch"', desc:'Cross-axis alignment.' },
      ]}/>
      <H3>Inline</H3>
      <PropsTable rows={[
        { name:'gap',     type:'0-14', default:'3', desc:'Space between children.' },
        { name:'align',   type:'"start" | "center" | "end" | "stretch"', default:'"center"', desc:'Cross-axis alignment.' },
        { name:'justify', type:'"start" | "center" | "end" | "between" | "around"', default:'"start"', desc:'Main-axis alignment.' },
        { name:'wrap',    type:'boolean', default:'false', desc:'Wrap onto multiple lines when overflowing.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Switch ─────────────────────────────────────────────── */
function PageSwitch() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  const [d, setD] = useState(false);
  const [e, setE] = useState(true);

  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Switch</H1>
      <Lead>For toggles that take effect right away: notifications, dark mode, feature flags. Sized to iOS standard (51 × 31 track, 27pt thumb) so it sits naturally next to native iOS controls. The thumb animates with RN's built-in Animated API, so Reanimated isn't required.</Lead>

      <H2 id="screen">Settings list</H2>
      <P>Where Switch actually lives in your app. Grouped rows with a label and short description.</P>
      <PhonePreview title="Notifications">
        <Section label="Email">
          <Row title="Marketing emails" body="Promotions, newsletters" right={<Switch label="Marketing" checked={a} onCheckedChange={setA}/>}/>
          <Row title="Account updates" body="Billing, security" right={<Switch label="Account" checked={b} onCheckedChange={setB}/>}/>
        </Section>
        <Section label="Push">
          <Row title="Mentions" body="When someone @s you" right={<Switch label="Mentions" checked={c} onCheckedChange={setC}/>}/>
          <Row title="Comments on my posts" right={<Switch label="Comments" checked={d} onCheckedChange={setD}/>}/>
          <Row title="Sounds" body="Play a chime for pings" right={<Switch label="Sounds" checked={e} onCheckedChange={setE}/>}/>
        </Section>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'checked',         type:'boolean', default:'—', desc:'Controlled state.' },
        { name:'defaultChecked',  type:'boolean', default:'false', desc:'Uncontrolled default.' },
        { name:'onCheckedChange', type:'(checked: boolean) => void', default:'—', desc:'Called when the user toggles.' },
        { name:'disabled',        type:'boolean', default:'false', desc:'Prevents press handling.' },
        { name:'label',           type:'string',  default:'—', desc:'Accessibility label for screen readers.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Spinner ────────────────────────────────────────────── */
function PageSpinner() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Spinner</H1>
      <Lead>A rotating ring. Use it for waits longer than about 400ms when you don't have a better placeholder. Smaller is usually right; match the surrounding text size.</Lead>

      <H2 id="screen">In-button loading</H2>
      <P>The most common Spinner home: inside a button while a request is in flight.</P>
      <PhonePreview>
        <Stack gap={5}>
          <T.H2>Save your work</T.H2>
          <T.Body dim>Changes will sync to all of your devices.</T.Body>
          <Stack gap={2}>
            <Button variant="primary" leading={<Spinner size={14} color="#fff"/>} disabled>Saving…</Button>
            <Button variant="secondary" leading={<Spinner size={14}/>} disabled>Refreshing…</Button>
          </Stack>
        </Stack>
      </PhonePreview>

      <H2 id="sizes">Sizes</H2>
      <PhonePreview>
        <Inline gap={5} align="center" justify="center">
          <Spinner size={14}/>
          <Spinner size={20}/>
          <Spinner size={28}/>
          <Spinner size={40}/>
        </Inline>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'size',  type:'number', default:'16', desc:'Diameter in pixels.' },
        { name:'color', type:'string', default:'fg1', desc:'Stroke color of the moving arc.' },
        { name:'label', type:'string', default:'"Loading"', desc:'Accessible label.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Skeleton ───────────────────────────────────────────── */
function PageSkeleton() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Skeleton</H1>
      <Lead>A pulsing placeholder. Match its shape to the loaded content. A circle for an avatar, two or three lines for a paragraph, a rectangle for an image.</Lead>

      <H2 id="screen">Feed loading</H2>
      <P>Skeletons in the actual shape of what's coming. The page never collapses; the layout doesn't shift when data arrives.</P>
      <PhonePreview title="Home">
        <Stack gap={3}>
          {[0, 1, 2].map((i) => (
            <Card key={i}>
              <Inline gap={3} align="start">
                <Skeleton width={40} radius={999}/>
                <Stack gap={2} style={{ flex: 1 }}>
                  <Skeleton width={140}/>
                  <Skeleton width="100%"/>
                  <Skeleton width="80%"/>
                </Stack>
              </Inline>
            </Card>
          ))}
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'width',  type:'DimensionValue', default:'"100%"', desc:'Width as a number, percent, or token.' },
        { name:'height', type:'DimensionValue', default:'17',     desc:'Height in pixels or percent. Default matches iOS body line height.' },
        { name:'radius', type:'number', default:'4', desc:'Border radius in pixels.' },
      ]}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   v0.2 component pages
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Page: Avatar ─────────────────────────────────────────────── */
function PageAvatar() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Avatar</H1>
      <Lead>A circle with initials. Pass <InlineCode>name</InlineCode> for the fallback, <InlineCode>source</InlineCode> for an image. Three sizes for headers, lists, and inline mentions.</Lead>

      <H2 id="screen">In a list</H2>
      <PhonePreview title="Activity">
        <Stack gap={3}>
          {[
            { name: "Ada Turing",     body: "Pushed 4 commits to feat/onboarding" },
            { name: "Grace Hopper",   body: "Opened a draft PR on the docs repo" },
            { name: "Linus Bell",     body: "Replied to your comment" },
            { name: "Margaret Clarke",body: "Joined your team" },
          ].map((p) => (
            <ListItem key={p.name} leading={<Avatar name={p.name}/>} title={p.name} subtitle={p.body}/>
          ))}
        </Stack>
      </PhonePreview>

      <H2 id="sizes">Sizes</H2>
      <PhonePreview>
        <Inline gap={4} align="center">
          <Avatar name="Ada Turing" size="sm"/>
          <Avatar name="Ada Turing" size="md"/>
          <Avatar name="Ada Turing" size="lg"/>
        </Inline>
      </PhonePreview>
      <Code language="tsx">{`<Avatar name="Ada Turing"/>
<Avatar name="Ada Turing" size="lg"/>
<Avatar source={{ uri: 'https://...' }}/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'name',   type:'string', default:'—', desc:'Two-letter initials are derived from the first two words.' },
        { name:'source', type:'ImageSourcePropType', default:'—', desc:'Image. Replaces initials when provided.' },
        { name:'size',   type:'"sm" | "md" | "lg"', default:'"md"', desc:'28 / 40 / 56 pixels.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Badge ──────────────────────────────────────────────── */
function PageBadge() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Badge</H1>
      <Lead>Small pill for status, counts, or category labels. Five variants. Pair with <InlineCode>Avatar</InlineCode> + <InlineCode>ListItem</InlineCode> when surfacing state in a list.</Lead>

      <H2 id="screen">Status indicators</H2>
      <PhonePreview title="Issues">
        <Stack gap={2}>
          <ListItem
            title="Email digest is missing the unsubscribe link"
            subtitle="reported 2h ago"
            trailing={<Badge variant="danger">Open</Badge>}
          />
          <Divider/>
          <ListItem
            title="Account avatar fails to load on slow networks"
            subtitle="in review"
            trailing={<Badge>Triage</Badge>}
          />
          <Divider/>
          <ListItem
            title="Onboarding checklist completion event"
            subtitle="closed 3d ago"
            trailing={<Badge variant="success">Done</Badge>}
          />
        </Stack>
      </PhonePreview>

      <H2 id="variants">Variants</H2>
      <PhonePreview>
        <Inline gap={2} wrap>
          <Badge>Neutral</Badge>
          <Badge variant="solid">Solid</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
        </Inline>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'variant', type:'"neutral" | "solid" | "outline" | "success" | "danger"', default:'"neutral"', desc:'Visual style.' },
        { name:'leading', type:'ReactNode', default:'—', desc:'Optional element before the label (a dot, an icon).' },
      ]}/>
    </div>
  );
}

/* ─── Page: Alert ──────────────────────────────────────────────── */
function PageAlert() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Alert</H1>
      <Lead>Inline status block with title, body, and an icon. Use it for content-level messages (a form-wide error, an info note about the page). For transient feedback, reach for Toast.</Lead>

      <H2 id="variants">Variants</H2>
      <PhonePreview title="Settings">
        <Stack gap={3}>
          <Alert variant="info" title="Beta feature">
            This setting is being tested. Behavior may change without notice.
          </Alert>
          <Alert variant="success" title="Saved">
            Your changes have been applied.
          </Alert>
          <Alert variant="warning" title="Verification needed">
            Confirm your email so we can sync your subscription.
          </Alert>
          <Alert variant="danger" title="Couldn't save">
            Network is offline. We'll retry automatically when you're back online.
          </Alert>
        </Stack>
      </PhonePreview>
      <Code language="tsx">{`<Alert variant="warning" title="Verification needed">
  Confirm your email so we can sync your subscription.
</Alert>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'variant', type:'"info" | "success" | "warning" | "danger"', default:'"info"', desc:'Visual tone.' },
        { name:'title',   type:'ReactNode', default:'—', desc:'Bold headline.' },
        { name:'children',type:'ReactNode', default:'—', desc:'Body text or custom content.' },
        { name:'icon',    type:'ReactNode', default:'glyph from variant', desc:'Custom icon for the leading slot.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Divider ────────────────────────────────────────────── */
function PageDivider() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Divider</H1>
      <Lead>A hairline. Reach for it when two regions need a clear boundary that spacing alone can't carry. In list rows, prefer the natural gap from <InlineCode>Stack</InlineCode>.</Lead>

      <H2 id="screen">In a list</H2>
      <PhonePreview title="Account">
        <Stack gap={0}>
          <ListItem title="Profile" subtitle="Display name, avatar"/>
          <Divider/>
          <ListItem title="Notifications" subtitle="Email and push"/>
          <Divider/>
          <ListItem title="Security" subtitle="Password, 2FA"/>
          <Divider/>
          <ListItem title="Billing" subtitle="Plan, payment methods"/>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'orientation', type:'"horizontal" | "vertical"', default:'"horizontal"', desc:'Direction of the line.' },
      ]}/>
    </div>
  );
}

/* ─── Page: EmptyState ─────────────────────────────────────────── */
function PageEmpty() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Empty state</H1>
      <Lead>Title, one-line body, an action. That's the recipe. Don't apologize and don't write a paragraph. The action should be the thing the user came here to do.</Lead>

      <H2 id="screen">Empty inbox</H2>
      <PhonePreview title="Inbox">
        <View style={{ flex: 1, justifyContent: 'center', minHeight: 360 }}>
          <EmptyState
            title="Nothing here yet"
            body="Messages and mentions will land in your inbox so you can read them in one place."
            action={<Button variant="primary">Connect an account</Button>}
          />
        </View>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'title',  type:'ReactNode', default:'—', desc:'Headline.' },
        { name:'body',   type:'ReactNode', default:'—', desc:'One-line explanation.' },
        { name:'icon',   type:'ReactNode', default:'—', desc:'Optional small icon above the title.' },
        { name:'action', type:'ReactNode', default:'—', desc:'A button or link that gets the user unstuck.' },
      ]}/>
    </div>
  );
}

/* ─── Page: ListItem ───────────────────────────────────────────── */
function PageList() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>List item</H1>
      <Lead>The row pattern most mobile apps repeat dozens of times: an icon or avatar, a title, a subtitle, and something on the right (chevron, switch, badge). Tappable when you pass <InlineCode>onPress</InlineCode>.</Lead>

      <H2 id="screen">A settings list</H2>
      <PhonePreview title="Settings">
        <Stack gap={0}>
          <ListItem title="Profile" subtitle="Ada Turing" leading={<Avatar name="Ada Turing"/>} chevron onPress={() => {}}/>
          <Divider/>
          <ListItem title="Notifications" subtitle="3 channels enabled" trailing={<Badge>3</Badge>} onPress={() => {}}/>
          <Divider/>
          <ListItem title="Two-factor auth" trailing={<Switch defaultChecked/>}/>
          <Divider/>
          <ListItem title="Sign out" subtitle="ada@monoset.dev" chevron onPress={() => {}}/>
        </Stack>
      </PhonePreview>
      <Code language="tsx">{`<ListItem
  title="Notifications"
  subtitle="3 channels enabled"
  trailing={<Badge>3</Badge>}
  onPress={() => navigate('/notifications')}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'title',    type:'ReactNode', default:'—', desc:'Primary text. String values are truncated to one line.' },
        { name:'subtitle', type:'ReactNode', default:'—', desc:'Secondary text below the title.' },
        { name:'leading',  type:'ReactNode', default:'—', desc:'Element before the body (icon, avatar).' },
        { name:'trailing', type:'ReactNode', default:'—', desc:'Element after the body (badge, switch, action).' },
        { name:'chevron',  type:'boolean',   default:'false', desc:'Show a chevron when the row is tappable and trailing is empty.' },
        { name:'onPress',  type:'(e) => void', default:'—', desc:'Press handler. Makes the row pressable.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Checkbox ───────────────────────────────────────────── */
function PageCheckbox() {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [updates, setUpdates] = useState(false);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Checkbox</H1>
      <Lead>For form-style multi-select. Use Switch when the change takes effect immediately, Checkbox when it's part of a Submit. The checkmark animates on tap, no extra setup.</Lead>

      <H2 id="screen">Sign-up consent</H2>
      <PhonePreview title="Create account">
        <Stack gap={5}>
          <Stack gap={3}>
            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={terms} onCheckedChange={setTerms}
            />
            <Checkbox
              label="Send me product updates"
              checked={updates} onCheckedChange={setUpdates}
            />
            <Checkbox
              label="Subscribe to the newsletter"
              checked={marketing} onCheckedChange={setMarketing}
            />
          </Stack>
          <Button variant="primary" disabled={!terms}>Create account</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'checked',         type:'boolean', default:'—', desc:'Controlled value.' },
        { name:'defaultChecked',  type:'boolean', default:'false', desc:'Uncontrolled default.' },
        { name:'onCheckedChange', type:'(checked: boolean) => void', default:'—', desc:'Called when toggled.' },
        { name:'label',           type:'ReactNode', default:'—', desc:'Visible label rendered to the right of the box.' },
        { name:'disabled',        type:'boolean', default:'false', desc:'Prevents interaction.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Radio ──────────────────────────────────────────────── */
function PageRadio() {
  const [plan, setPlan] = useState('pro');
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Radio group</H1>
      <Lead>Pick one from a few. If the list is longer than four or five items, use a Select or Combobox instead. The group manages state; each <InlineCode>Radio</InlineCode> just declares its value.</Lead>

      <H2 id="screen">Pricing plan</H2>
      <PhonePreview title="Choose a plan">
        <Stack gap={4}>
          <RadioGroup value={plan} onValueChange={setPlan}>
            <Stack gap={2}>
              <Radio value="free" label="Free — 1 project, 100 MB"/>
              <Radio value="pro"  label="Pro — 10 projects, 10 GB"/>
              <Radio value="team" label="Team — Unlimited"/>
            </Stack>
          </RadioGroup>
          <Button variant="primary">Continue</Button>
        </Stack>
      </PhonePreview>
      <Code language="tsx">{`<RadioGroup value={plan} onValueChange={setPlan}>
  <Radio value="free" label="Free"/>
  <Radio value="pro"  label="Pro"/>
  <Radio value="team" label="Team"/>
</RadioGroup>`}</Code>

      <H2 id="api">API</H2>
      <H3>RadioGroup</H3>
      <PropsTable rows={[
        { name:'value',         type:'string', default:'—', desc:'Controlled selected value.' },
        { name:'defaultValue',  type:'string', default:'—', desc:'Uncontrolled default.' },
        { name:'onValueChange', type:'(value: string) => void', default:'—', desc:'Called when a different option is picked.' },
        { name:'disabled',      type:'boolean', default:'false', desc:'Disables every Radio in the group.' },
      ]}/>
      <H3>Radio</H3>
      <PropsTable rows={[
        { name:'value', type:'string',   default:'—', desc:'Identifier passed to onValueChange when picked.' },
        { name:'label', type:'ReactNode',default:'—', desc:'Visible label.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Chip ───────────────────────────────────────────────── */
function PageChip() {
  const [filters, setFilters] = useState(['active']);
  const toggle = (id) => setFilters((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Chip</H1>
      <Lead>Small pressable pill for filters and tags. Selected chips invert; unselected sit on the surface. They're 36pt tall, comfortable to tap, and smaller than a Button.</Lead>

      <H2 id="screen">Filters</H2>
      <PhonePreview title="Issues">
        <Stack gap={4}>
          <Inline gap={2} wrap>
            {[
              { id:'active',  label:'Active' },
              { id:'pending', label:'Pending' },
              { id:'paused',  label:'Paused' },
              { id:'archived',label:'Archived' },
            ].map((f) => (
              <Chip
                key={f.id}
                selected={filters.includes(f.id)}
                onSelectedChange={() => toggle(f.id)}
              >
                {f.label}
              </Chip>
            ))}
          </Inline>
          <Stack gap={2}>
            <ListItem title="Email digest missing unsubscribe" subtitle="2h ago" trailing={<Badge variant="danger">Open</Badge>}/>
            <Divider/>
            <ListItem title="Avatar fails on slow networks" subtitle="in review" trailing={<Badge>Triage</Badge>}/>
          </Stack>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'selected',         type:'boolean', default:'false', desc:'Selected state. Inverts the visual style.' },
        { name:'onSelectedChange', type:'(selected: boolean) => void', default:'—', desc:'Fires alongside onPress with the new value.' },
        { name:'leading',          type:'ReactNode', default:'—', desc:'Element before the label.' },
        { name:'trailing',         type:'ReactNode', default:'—', desc:'Element after the label.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Progress ───────────────────────────────────────────── */
function PageProgress() {
  const [v, setV] = useState(40);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Progress</H1>
      <Lead>A bar that fills as a measurable task makes progress. Use it when you can compute the percentage. If you can't, use Spinner.</Lead>

      <H2 id="screen">Upload</H2>
      <PhonePreview title="Upload">
        <Stack gap={5}>
          <Stack gap={2}>
            <Inline justify="between">
              <Text style={{ fontSize: fontSize.sm, color: colors.fg2 }}>Uploading photos.zip</Text>
              <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>{v}%</Text>
            </Inline>
            <Progress value={v}/>
          </Stack>
          <Inline gap={2}>
            <Button variant="secondary" onPress={() => setV((x) => Math.max(0, x - 20))}>-20</Button>
            <Button variant="secondary" onPress={() => setV((x) => Math.min(100, x + 20))}>+20</Button>
          </Inline>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'value', type:'number', default:'—', desc:'Current value, 0 to max.' },
        { name:'max',   type:'number', default:'100', desc:'Maximum value.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Sheet ──────────────────────────────────────────────── */
function PageSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Sheet</H1>
      <Lead>Bottom sheet built on RN Modal. Slides up over a scrim, taps the scrim to dismiss. Use it for quick actions, filters, or short forms. For multi-step flows, push a screen.</Lead>

      <H2 id="screen">Filters</H2>
      <PhonePreview title="Issues">
        <Stack gap={4}>
          <Button variant="secondary" onPress={() => setOpen(true)}>Open filters</Button>
          <Sheet
            open={open}
            onClose={() => setOpen(false)}
            title="Filters"
            description="Narrow down the issue list."
          >
            <Stack gap={3}>
              <Checkbox label="Active" defaultChecked/>
              <Checkbox label="Pending"/>
              <Checkbox label="Paused"/>
              <Button variant="primary" onPress={() => setOpen(false)}>Apply</Button>
            </Stack>
          </Sheet>
        </Stack>
      </PhonePreview>
      <Code language="tsx">{`const [open, setOpen] = useState(false);

<Button onPress={() => setOpen(true)}>Open filters</Button>
<Sheet open={open} onClose={() => setOpen(false)} title="Filters">
  <Stack gap={3}>
    <Checkbox label="Active"/>
    <Checkbox label="Pending"/>
    <Button variant="primary" onPress={() => setOpen(false)}>Apply</Button>
  </Stack>
</Sheet>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'open',        type:'boolean', default:'—', desc:'Controlled visibility.' },
        { name:'onClose',     type:'() => void', default:'—', desc:'Called when the user taps the scrim or hardware back.' },
        { name:'title',       type:'ReactNode', default:'—', desc:'Optional title shown at the top.' },
        { name:'description', type:'ReactNode', default:'—', desc:'Optional secondary text below the title.' },
        { name:'grabber',     type:'boolean', default:'true', desc:'Show the iOS-style grabber at the top.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Dialog ─────────────────────────────────────────────── */
function PageDialog() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Dialog</H1>
      <Lead>Centered modal for confirmations and short flows. Use Dialog when the choice is yes/no/cancel. Use Sheet when there's content to scroll or multiple inputs.</Lead>

      <H2 id="screen">Confirm delete</H2>
      <PhonePreview title="Project settings">
        <Stack gap={4}>
          <Card>
            <Stack gap={2}>
              <Text style={{ fontSize: fontSize.base, color: colors.fg1, fontWeight: '600' }}>Danger zone</Text>
              <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>Deleting the project removes all data. This can't be undone.</Text>
            </Stack>
          </Card>
          <Button variant="danger" onPress={() => setOpen(true)}>Delete project</Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Delete this project?"
            description="All issues, comments, and uploaded files will be removed. There's no recovery."
          >
            <Inline gap={2} justify="end">
              <Button variant="ghost"  onPress={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onPress={() => setOpen(false)}>Delete</Button>
            </Inline>
          </Dialog>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'open',        type:'boolean', default:'—', desc:'Controlled visibility.' },
        { name:'onClose',     type:'() => void', default:'—', desc:'Called on scrim tap or hardware back.' },
        { name:'title',       type:'ReactNode', default:'—', desc:'Bold title at the top.' },
        { name:'description', type:'ReactNode', default:'—', desc:'Body text under the title.' },
        { name:'dismissible', type:'boolean', default:'true', desc:'When false, scrim taps are ignored.' },
      ]}/>
    </div>
  );
}

/* ─── Page: Toast ──────────────────────────────────────────────── */
function ToastDemo() {
  const { toast } = useToast();
  return (
    <Stack gap={3}>
      <Button variant="primary" onPress={() => toast({ title: "Changes saved" })}>Save</Button>
      <Button variant="secondary" onPress={() => toast({
        title: "1 message archived",
        action: "Undo",
        onActionPress: () => toast({ title: "Restored" }),
      })}>Archive (with undo)</Button>
      <Button variant="ghost" onPress={() => toast({ title: "Couldn't connect", duration: 5000 })}>Show error</Button>
    </Stack>
  );
}

function PageToast() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Toast</H1>
      <Lead>Transient banner for confirming a quick action: "Saved", "Archived", "Couldn't sync". Wrap your app in <InlineCode>ToastProvider</InlineCode>, then call <InlineCode>useToast()</InlineCode> from anywhere.</Lead>

      <H2 id="screen">Try it</H2>
      <PhonePreview title="Inbox">
        <ToastProvider>
          <ToastDemo/>
        </ToastProvider>
      </PhonePreview>
      <Code language="tsx">{`// 1. Wrap your app:
<ToastProvider>
  <App/>
</ToastProvider>

// 2. From any descendant:
const { toast } = useToast();
toast({ title: "Changes saved" });

// With an undo action:
toast({
  title: "1 message archived",
  action: "Undo",
  onActionPress: () => undoArchive(),
});`}</Code>

      <H2 id="api">API</H2>
      <H3>ToastProvider</H3>
      <PropsTable rows={[
        { name:'defaultDuration', type:'number', default:'3500', desc:'Default auto-dismiss duration in ms.' },
      ]}/>
      <H3>useToast()</H3>
      <P>Returns <InlineCode>{`{ toast, dismiss }`}</InlineCode>. <InlineCode>toast(item)</InlineCode> takes <InlineCode>{`{ title, action?, onActionPress?, duration? }`}</InlineCode> and returns the new toast's id.</P>
    </div>
  );
}

/* ─── Page: Slider ─────────────────────────────────────────────── */
function PageSlider() {
  const [vol, setVol] = useState(60);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Slider</H1>
      <Lead>Drag-to-adjust numeric value. Built on raw touch events so it has no extra dependencies. For single-thumb continuous values: volume, opacity, font size.</Lead>

      <H2 id="screen">Volume</H2>
      <PhonePreview title="Sound">
        <Stack gap={5}>
          <Stack gap={2}>
            <Inline justify="between">
              <Text style={{ fontSize: fontSize.sm, color: colors.fg2 }}>Volume</Text>
              <Text style={{ fontSize: fontSize.sm, color: colors.fg3, fontVariant: ['tabular-nums'] }}>{vol}</Text>
            </Inline>
            <Slider value={vol} onValueChange={setVol} min={0} max={100}/>
          </Stack>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'value',         type:'number', default:'—', desc:'Current value.' },
        { name:'onValueChange', type:'(value: number) => void', default:'—', desc:'Called as the user drags.' },
        { name:'min',           type:'number', default:'0', desc:'Lower bound.' },
        { name:'max',           type:'number', default:'100', desc:'Upper bound.' },
        { name:'step',          type:'number', default:'1', desc:'Increment between values.' },
        { name:'disabled',      type:'boolean', default:'false', desc:'Prevents drag.' },
      ]}/>
    </div>
  );
}

/* ─── Page: SegmentedControl ───────────────────────────────────── */
function PageSegmented() {
  const [view, setView] = useState('week');
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Segmented control</H1>
      <Lead>iOS-style group of mutually exclusive choices. Use for view modes ("Day / Week / Month"), filters with three or four options, and other one-of-N choices where Tabs would be too heavy.</Lead>

      <H2 id="screen">Calendar view</H2>
      <PhonePreview title="Calendar">
        <Stack gap={4}>
          <SegmentedControl
            items={[
              { value: 'day',   label: 'Day' },
              { value: 'week',  label: 'Week' },
              { value: 'month', label: 'Month' },
            ]}
            value={view}
            onValueChange={setView}
          />
          <Card variant="inset">
            <Stack gap={2}>
              <Text style={{ fontSize: fontSize.lg, fontWeight: '600', color: colors.fg1 }}>{view.charAt(0).toUpperCase() + view.slice(1)} view</Text>
              <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>The selected view drives what the calendar grid renders. The state lives in your screen, the control just reflects it.</Text>
            </Stack>
          </Card>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'items',         type:'SegmentedItem[]', default:'—', desc:'List of {value, label} entries.' },
        { name:'value',         type:'string', default:'—', desc:'Controlled selection.' },
        { name:'defaultValue',  type:'string', default:'first item', desc:'Uncontrolled default.' },
        { name:'onValueChange', type:'(value: string) => void', default:'—', desc:'Called when a different segment is picked.' },
      ]}/>
    </div>
  );
}

/* ─── Page: TabBar ─────────────────────────────────────────────── */
function PageTabBar() {
  const [route, setRoute] = useState('home');
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Tab bar</H1>
      <Lead>Bottom navigation for the app's primary destinations. Pair with a router like React Navigation or Expo Router; TabBar itself is presentational so the router stays in charge of routes.</Lead>

      <H2 id="screen">App shell</H2>
      <PhonePreview>
        <View style={{ flex: 1, justifyContent: 'space-between', minHeight: 600 }}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: fontSize["2xl"], fontWeight: '700', color: colors.fg1, marginBottom: 12 }}>
              {route === 'home' ? 'Home' : route === 'inbox' ? 'Inbox' : route === 'search' ? 'Search' : 'Profile'}
            </Text>
            <Text style={{ fontSize: fontSize.sm, color: colors.fg3 }}>
              The tab bar at the bottom controls which screen renders here. In a real app, this would be your screen component, mounted by the router.
            </Text>
          </View>
          <TabBar
            value={route}
            onValueChange={setRoute}
            items={[
              { value: 'home',   label: 'Home' },
              { value: 'inbox',  label: 'Inbox' },
              { value: 'search', label: 'Search' },
              { value: 'me',     label: 'Profile' },
            ]}
          />
        </View>
      </PhonePreview>
      <Code language="tsx">{`<TabBar
  value={route}
  onValueChange={setRoute}
  items={[
    { value: 'home',   label: 'Home',    icon: ({ active }) => <HomeIcon filled={active}/> },
    { value: 'inbox',  label: 'Inbox' },
    { value: 'search', label: 'Search' },
    { value: 'me',     label: 'Profile' },
  ]}
/>`}</Code>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:'items',         type:'TabBarItem[]', default:'—', desc:'List of {value, label, icon?} entries.' },
        { name:'value',         type:'string', default:'—', desc:'Controlled active tab.' },
        { name:'defaultValue',  type:'string', default:'first item', desc:'Uncontrolled default.' },
        { name:'onValueChange', type:'(value: string) => void', default:'—', desc:'Called when a tab is tapped.' },
      ]}/>
      <P>Each <InlineCode>TabBarItem.icon</InlineCode> is a render function that receives <InlineCode>{`{ active }`}</InlineCode>, so you can swap glyphs based on state.</P>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   v0.3 component pages
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Page: PasswordInput ─────────────────────────────────────── */
function PagePasswordN() {
  const [pw, setPw] = useState("");
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Password input</H1>
      <Lead>An <InlineCode>Input</InlineCode> with a Show / Hide toggle on the right edge. Tap to flip visibility. Sized to the same 44pt minimum as the rest of the kit.</Lead>

      <H2 id="screen">Sign in</H2>
      <PhonePreview title="Sign in">
        <Stack gap={4}>
          <Field label="Email"><Input keyboardType="email-address" autoCapitalize="none" placeholder="you@example.com"/></Field>
          <Field label="Password"><PasswordInput value={pw} onChangeText={setPw} placeholder="••••••••"/></Field>
          <Button variant="primary">Sign in</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"hideToggle", type:"boolean", default:"false", desc:"Hide the show/hide toggle." },
      ]}/>
      <P>Other props forward to <InlineCode>Input</InlineCode>.</P>
    </div>
  );
}

/* ─── Page: NumberInput ───────────────────────────────────────── */
function PageNumberInputN() {
  const [qty, setQty] = useState(1);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Number input</H1>
      <Lead>A numeric <InlineCode>Input</InlineCode> with stepper buttons on either side. The +/- buttons hit the 44pt tap target so cart-quantity flows feel right.</Lead>

      <H2 id="screen">Cart quantity</H2>
      <PhonePreview title="Cart">
        <Stack gap={4}>
          <Card>
            <Inline gap={3} align="center" justify="between">
              <View style={{ flex: 1 }}>
                <T.Body>Monoset hoodie</T.Body>
                <View style={{ marginTop: 2 }}><T.Body dim>Black, M</T.Body></View>
              </View>
              <NumberInput value={qty} onValueChange={setQty} min={1} max={9}/>
            </Inline>
          </Card>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"number", default:"—", desc:"Controlled value." },
        { name:"onValueChange", type:"(n: number) => void", default:"—", desc:"Called with the clamped new value." },
        { name:"min",           type:"number", default:"-Infinity", desc:"Lower bound." },
        { name:"max",           type:"number", default:"Infinity",  desc:"Upper bound." },
        { name:"step",          type:"number", default:"1",         desc:"Increment." },
      ]}/>
    </div>
  );
}

/* ─── Page: PinInput ──────────────────────────────────────────── */
function PagePinInputN() {
  const [code, setCode] = useState("");
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Pin input</H1>
      <Lead>One cell per character with auto-advance, backspace-to-previous, and paste-the-whole-code support. Default is digits only and the first cell hints at <InlineCode>oneTimeCode</InlineCode> so iOS auto-fills SMS codes.</Lead>

      <H2 id="screen">Verify</H2>
      <PhonePreview title="Verify">
        <Stack gap={5}>
          <View style={{ alignItems: "center", gap: space[2] }}>
            <T.H1>Enter the code</T.H1>
            <T.Lead>We sent a 6-digit code to ada@monoset.dev</T.Lead>
          </View>
          <View style={{ alignItems: "center" }}>
            <PinInput length={6} value={code} onValueChange={setCode}/>
          </View>
          <Button variant="primary" disabled={code.length < 6}>Verify</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"length",        type:"number",  default:"6", desc:"Number of cells." },
        { name:"value",         type:"string",  default:"—", desc:"Controlled value." },
        { name:"onValueChange", type:"(v: string) => void", default:"—", desc:"Called on every change." },
        { name:"onComplete",    type:"(v: string) => void", default:"—", desc:"Fires when the last cell fills." },
        { name:"mask",          type:"boolean", default:"false", desc:"Mask each cell." },
      ]}/>
    </div>
  );
}

/* ─── Page: Tabs ──────────────────────────────────────────────── */
function PageTabsN() {
  const [tab, setTab] = useState("posts");
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Tabs</H1>
      <Lead>Top tabs with an underline indicator. Scrolls horizontally when items overflow. Pair it with a screen-level state and conditionally render the section below.</Lead>

      <H2 id="screen">Profile</H2>
      <PhonePreview title="Ada Turing">
        <Stack gap={0}>
          <Tabs
            items={[
              { value: "posts",    label: "Posts" },
              { value: "replies",  label: "Replies" },
              { value: "media",    label: "Media" },
              { value: "likes",    label: "Likes" },
            ]}
            value={tab}
            onValueChange={setTab}
          />
          <View style={{ paddingTop: space[5] }}>
            <T.Body dim>Showing the {tab} feed.</T.Body>
          </View>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"items",         type:"TabItem[]",                default:"—", desc:"List of {value, label, disabled?}." },
        { name:"value",         type:"string",                   default:"—", desc:"Controlled active tab." },
        { name:"defaultValue",  type:"string",                   default:"first item", desc:"Uncontrolled initial tab." },
        { name:"onValueChange", type:"(value: string) => void",  default:"—", desc:"Called on tap." },
        { name:"scrollable",    type:"boolean",                  default:"true", desc:"Allow horizontal scroll when overflow." },
      ]}/>
    </div>
  );
}

/* ─── Page: Popover ───────────────────────────────────────────── */
function PagePopoverDemoTrigger() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        ref={ref}
        onPress={() => setOpen(true)}
        style={({ pressed }) => ({ paddingHorizontal: 14, paddingVertical: 10, backgroundColor: pressed ? colors.bgMuted : colors.bgSubtle, borderRadius: 12, borderWidth: 1, borderColor: colors.border })}
      >
        <T.Body>Sort by ▾</T.Body>
      </Pressable>
      <Popover open={open} onClose={() => setOpen(false)} anchorRef={ref}>
        <Stack gap={1}>
          {["Newest", "Oldest", "Most replies", "Most likes"].map((label) => (
            <Pressable key={label} onPress={() => setOpen(false)} style={({ pressed }) => ({ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 8, backgroundColor: pressed ? colors.bgMuted : "transparent" })}>
              <T.Body>{label}</T.Body>
            </Pressable>
          ))}
        </Stack>
      </Popover>
    </>
  );
}

function PagePopoverN() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Popover</H1>
      <Lead>A floating panel anchored to a trigger. Use it for filters, sort menus, or small inline actions. Pass an <InlineCode>anchorRef</InlineCode> so the popover knows where to position itself.</Lead>

      <H2 id="screen">Sort menu</H2>
      <PhonePreview title="Feed">
        <Stack gap={4}>
          <Inline justify="between">
            <T.Body>87 posts</T.Body>
            <PagePopoverDemoTrigger/>
          </Inline>
          <Card variant="inset">
            <T.Body dim>Tap "Sort by" to open the popover.</T.Body>
          </Card>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"open",       type:"boolean",                  default:"—", desc:"Controlled visibility." },
        { name:"onClose",    type:"() => void",               default:"—", desc:"Called when scrim is tapped or hardware back is pressed." },
        { name:"anchorRef",  type:"RefObject<View>",          default:"—", desc:"Reference to the trigger element. Required." },
        { name:"side",       type:'"top" | "bottom"',         default:'"bottom"', desc:"Which side of the anchor to position." },
        { name:"sideOffset", type:"number",                   default:"6", desc:"Distance from the anchor in pixels." },
        { name:"width",      type:"number",                   default:"anchor width", desc:"Custom panel width." },
      ]}/>
    </div>
  );
}

/* ─── Page: Combobox ──────────────────────────────────────────── */
function PageComboboxN() {
  const [country, setCountry] = useState();
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Combobox</H1>
      <Lead>Searchable single-select. Tapping the trigger opens a bottom-sheet picker with a search field and a scrollable list of matches. Built for long lists where Select feels too cramped.</Lead>

      <H2 id="screen">Country</H2>
      <PhonePreview title="Profile">
        <Stack gap={4}>
          <Field label="Country" help="Used for billing and localization.">
            <Combobox
              value={country}
              onValueChange={setCountry}
              options={[
                { value: "us", label: "United States" },
                { value: "fr", label: "France" },
                { value: "fi", label: "Finland" },
                { value: "de", label: "Germany" },
                { value: "es", label: "Spain" },
                { value: "jp", label: "Japan" },
              ]}
              placeholder="Pick a country"
            />
          </Field>
          <Button variant="primary">Save</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"options",       type:"ComboboxOption[]", default:"—", desc:"List of {value, label, description?, keywords?, disabled?}." },
        { name:"value",         type:"string",           default:"—", desc:"Controlled value." },
        { name:"onValueChange", type:"(v: string) => void", default:"—", desc:"Called when an option is picked." },
        { name:"placeholder",   type:"string",           default:'"Select…"', desc:"Trigger placeholder." },
        { name:"emptyMessage",  type:"string",           default:'"No results."', desc:"Shown when nothing matches." },
        { name:"filter",        type:"(q, opt) => boolean", default:"built-in", desc:"Custom filter function." },
      ]}/>
    </div>
  );
}

/* ─── Page: Accordion ─────────────────────────────────────────── */
function PageAccordionN() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Accordion</H1>
      <Lead>Collapsible disclosure panels. Use it for FAQs, settings groupings, or any vertical list where you want to keep the page short by default.</Lead>

      <H2 id="screen">FAQ</H2>
      <PhonePreview title="Help">
        <Accordion type="single" defaultValue="b">
          <AccordionItem value="a" title="What is Monoset?">
            A minimal, monotone design system. One neutral ramp, one typeface, no color. The constraint is the whole point.
          </AccordionItem>
          <AccordionItem value="b" title="Does it work on web and native?">
            Yes. @monoset/react for web and @monoset/native for React Native, with the same component names and variant API.
          </AccordionItem>
          <AccordionItem value="c" title="Do I need Tailwind?">
            No. Tokens ship as CSS variables on web and plain JS exports on native. No build step required.
          </AccordionItem>
        </Accordion>
      </PhonePreview>

      <H2 id="api">API</H2>
      <H3>Accordion</H3>
      <PropsTable rows={[
        { name:"type",          type:'"single" | "multiple"', default:'"single"', desc:"Allow only one open item or multiple." },
        { name:"defaultValue",  type:"string | string[]",     default:"—", desc:"Uncontrolled default open value(s)." },
        { name:"value",         type:"string | string[]",     default:"—", desc:"Controlled open value(s)." },
        { name:"onValueChange", type:"(v) => void",           default:"—", desc:"Called when open state changes." },
      ]}/>
      <H3>AccordionItem</H3>
      <PropsTable rows={[
        { name:"value",    type:"string",    default:"—", desc:"Identifier used by the parent." },
        { name:"title",    type:"ReactNode", default:"—", desc:"Header content." },
        { name:"disabled", type:"boolean",   default:"false", desc:"Prevents toggling." },
      ]}/>
    </div>
  );
}

/* ─── Page: NavigationHeader ──────────────────────────────────── */
function PageNavHeader() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Navigation header</H1>
      <Lead>A 56pt-tall top bar with leading, title, and trailing slots. Use the included <InlineCode>NavigationBack</InlineCode> for the iOS chevron-left back action, or pass any custom button.</Lead>

      <H2 id="screen">Detail screen</H2>
      <PhonePreview>
        <View>
          <NavigationHeader
            leading={<NavigationBack/>}
            title="Issue #218"
            trailing={<Pressable hitSlop={8} style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: pressed ? colors.bgMuted : "transparent" })}><T.Body>•••</T.Body></Pressable>}
          />
          <View style={{ padding: space[5] }}>
            <Stack gap={3}>
              <T.H2>Email digest is missing the unsubscribe link</T.H2>
              <T.Body dim>Reported by ada@monoset.dev · 2h ago</T.Body>
            </Stack>
          </View>
        </View>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"title",    type:"ReactNode", default:"—", desc:"Header title." },
        { name:"leading",  type:"ReactNode", default:"—", desc:"Left slot. Usually a back button or menu icon." },
        { name:"trailing", type:"ReactNode", default:"—", desc:"Right slot. Usually an action button." },
        { name:"border",   type:"boolean",   default:"true", desc:"Show the bottom hairline." },
      ]}/>
    </div>
  );
}

/* ─── Page: ActionSheet ───────────────────────────────────────── */
function PageActionSheetN() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Action sheet</H1>
      <Lead>iOS-style list of mutually exclusive actions plus a Cancel button. Built on <InlineCode>Sheet</InlineCode>. Destructive actions render in red.</Lead>

      <H2 id="screen">Long-press menu</H2>
      <PhonePreview title="Files">
        <Stack gap={3}>
          <ListItem
            title="report-q4.pdf"
            subtitle="Tap the dots to open"
            trailing={<Pressable onPress={() => setOpen(true)} hitSlop={8}><T.Body>•••</T.Body></Pressable>}
          />
          <ActionSheet
            open={open}
            onClose={() => setOpen(false)}
            title="report-q4.pdf"
            description="Choose an action"
            actions={[
              { label: "Share",    onPress: () => {} },
              { label: "Rename",   onPress: () => {} },
              { label: "Move…",    onPress: () => {} },
              { label: "Delete",   onPress: () => {}, destructive: true },
            ]}
          />
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"open",        type:"boolean", default:"—", desc:"Controlled visibility." },
        { name:"onClose",     type:"() => void", default:"—", desc:"Called on dismiss." },
        { name:"actions",     type:"ActionSheetAction[]", default:"—", desc:"List of {label, onPress?, destructive?, disabled?}." },
        { name:"title",       type:"string", default:"—", desc:"Optional sheet title." },
        { name:"description", type:"string", default:"—", desc:"Optional secondary text." },
        { name:"cancelLabel", type:"string", default:'"Cancel"', desc:"Cancel button label." },
      ]}/>
    </div>
  );
}

/* ─── Page: AppShell ──────────────────────────────────────────── */
function PageAppShellN() {
  const [tab, setTab] = useState("home");
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>AppShell</H1>
      <Lead>Root layout for a screen. Wraps children in a <InlineCode>SafeAreaView</InlineCode> and stacks an optional <InlineCode>header</InlineCode>, the children, and an optional <InlineCode>tabBar</InlineCode>. Pair with <InlineCode>NavigationHeader</InlineCode> + <InlineCode>TabBar</InlineCode> for a complete app frame.</Lead>

      <H2 id="screen">App frame</H2>
      <PhonePreview>
        <AppShell
          header={<NavigationHeader title="Home"/>}
          tabBar={
            <TabBar
              value={tab}
              onValueChange={setTab}
              items={[
                { value: "home",   label: "Home" },
                { value: "search", label: "Search" },
                { value: "inbox",  label: "Inbox" },
                { value: "me",     label: "Profile" },
              ]}
            />
          }
        >
          <View style={{ flex: 1, padding: space[5] }}>
            <Stack gap={3}>
              <T.H2>{tab === "home" ? "Today's recap" : tab === "search" ? "Search" : tab === "inbox" ? "Inbox" : "Profile"}</T.H2>
              <T.Body dim>The middle section flexes. Drop a ScrollView or FlatList here for scrollable content.</T.Body>
            </Stack>
          </View>
        </AppShell>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"header",          type:"ReactNode", default:"—", desc:"Optional top bar. Usually a NavigationHeader." },
        { name:"tabBar",          type:"ReactNode", default:"—", desc:"Optional bottom nav. Usually a TabBar." },
        { name:"children",        type:"ReactNode", default:"—", desc:"Screen content. Flexes to fill the middle." },
        { name:"backgroundColor", type:"string",    default:"colors.bg", desc:"SafeArea background color." },
      ]}/>
    </div>
  );
}

/* ─── Page: Tooltip ───────────────────────────────────────────── */
function PageTooltipN() {
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>Tooltip</H1>
      <Lead>A short label shown on long-press. Use it sparingly on touch — most actions should have visible labels. It's worth it for icon-only buttons and accessibility hints.</Lead>

      <H2 id="screen">Icon row</H2>
      <PhonePreview title="Editor">
        <Inline gap={4} justify="center">
          {["B", "I", "U", "↩"].map((g) => (
            <Tooltip key={g} content={g === "B" ? "Bold" : g === "I" ? "Italic" : g === "U" ? "Underline" : "Undo"}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.bgMuted, alignItems: "center", justifyContent: "center" }}>
                <T.Body>{g}</T.Body>
              </View>
            </Tooltip>
          ))}
        </Inline>
        <View style={{ marginTop: space[5] }}>
          <T.Body dim>Long-press an icon to see its label.</T.Body>
        </View>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"content",         type:"ReactNode",        default:"—", desc:"Tooltip body." },
        { name:"side",            type:'"top" | "bottom"', default:'"top"', desc:"Side of the trigger to position." },
        { name:"width",           type:"number",           default:"auto", desc:"Custom width." },
        { name:"longPressDelay",  type:"number",           default:"400", desc:"Long-press duration in ms." },
      ]}/>
    </div>
  );
}

/* ─── Page: DatePicker ────────────────────────────────────────── */
function PageDatePickerN() {
  const [d, setD] = useState(null);
  return (
    <div>
      <div className="eyebrow">Components</div>
      <H1>DatePicker</H1>
      <Lead>A bottom sheet hosting a calendar grid. Tap a day to pick it; the sheet dismisses on selection. Plain JS Date math under the hood — no external date library required.</Lead>

      <H2 id="screen">Booking</H2>
      <PhonePreview title="Reserve">
        <Stack gap={4}>
          <Field label="Date" help="Tap to open the calendar.">
            <DatePicker value={d} onValueChange={setD} placeholder="Pick a date" min={new Date()}/>
          </Field>
          <Button variant="primary" disabled={!d}>Confirm</Button>
        </Stack>
      </PhonePreview>

      <H2 id="api">API</H2>
      <PropsTable rows={[
        { name:"value",         type:"Date | null", default:"—", desc:"Selected date." },
        { name:"onValueChange", type:"(d: Date | null) => void", default:"—", desc:"Called when the user picks or clears." },
        { name:"min",           type:"Date",        default:"—", desc:"Earliest selectable date." },
        { name:"max",           type:"Date",        default:"—", desc:"Latest selectable date." },
        { name:"locale",        type:"string",      default:"device", desc:"Locale for labels." },
        { name:"format",        type:"(d: Date) => string", default:"locale-aware short", desc:"Trigger label formatter." },
      ]}/>
    </div>
  );
}

/* ─── Page map ─────────────────────────────────────────────────── */
const PAGES = {
  // Getting started
  introduction: PageIntroduction,
  installation: PageInstallation,
  usage:        PageUsage,
  // Foundations
  tokens:       PageTokens,
  motion:       PageMotion,
  // v0.1 components
  buttons:      PageButtons,
  cards:        PageCards,
  inputs:       PageInputs,
  layout:       PageLayout,
  switch:       PageSwitch,
  spinner:      PageSpinner,
  skeleton:     PageSkeleton,
  // v0.2 display
  avatar:       PageAvatar,
  badge:        PageBadge,
  alert:        PageAlert,
  divider:      PageDivider,
  empty:        PageEmpty,
  list:         PageList,
  chip:         PageChip,
  progress:     PageProgress,
  // v0.2 form
  checkbox:     PageCheckbox,
  radio:        PageRadio,
  slider:       PageSlider,
  segmented:    PageSegmented,
  // v0.2 overlay & navigation
  sheet:        PageSheet,
  dialog:       PageDialog,
  toast:        PageToast,
  tabbar:       PageTabBar,
  // v0.3
  passwordn:    PagePasswordN,
  numberinputn: PageNumberInputN,
  pininputn:    PagePinInputN,
  tabsn:        PageTabsN,
  popovern:     PagePopoverN,
  comboboxn:    PageComboboxN,
  accordionn:   PageAccordionN,
  navheader:    PageNavHeader,
  actionsheet:  PageActionSheetN,
  appshell:     PageAppShellN,
  tooltipn:     PageTooltipN,
  datepickern:  PageDatePickerN,
};

export default function NativeDocsContent({ page }) {
  const PageComp = PAGES[page] || PageIntroduction;
  return <PageComp/>;
}
