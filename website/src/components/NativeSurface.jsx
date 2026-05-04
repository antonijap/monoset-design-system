import { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Button, Card, Input, Field, Stack, Inline, Switch, Spinner, Skeleton,
  colors, fontSize, fontWeight,
} from '@monoset/native';

/**
 * NativeSurface - renders @monoset/native demos via react-native-web.
 * Each demo is a small example mirroring the web Preview.
 */

function ButtonDemo() {
  return (
    <Stack gap={3} style={{ width: 280 }}>
      <Inline gap={2} wrap>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Inline>
      <Inline gap={2} wrap>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Inline>
      <Button disabled>Disabled</Button>
    </Stack>
  );
}

function CardDemo() {
  return (
    <Stack gap={2} style={{ width: 320 }}>
      <Card>
        <Title>Default</Title>
        <Body>Subtle border, no shadow.</Body>
      </Card>
      <Card variant="elevated">
        <Title>Elevated</Title>
        <Body>Soft shadow, no border.</Body>
      </Card>
      <Card variant="inset">
        <Title>Inset</Title>
        <Body>Subtle background fill.</Body>
      </Card>
    </Stack>
  );
}

function InputDemo() {
  const [v, setV] = useState('ada@monoset.dev');
  return (
    <Card style={{ width: 320 }}>
      <Stack gap={3}>
        <Field label="Email" help="We'll send a confirmation.">
          <Input value={v} onChangeText={setV} keyboardType="email-address" autoCapitalize="none"/>
        </Field>
        <Field label="Disabled">
          <Input value="Read only" editable={false}/>
        </Field>
      </Stack>
    </Card>
  );
}

function SwitchDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <Card style={{ width: 320 }}>
      <Stack gap={3}>
        <Inline justify="between"><Body>Email alerts</Body><Switch label="Email" checked={a} onCheckedChange={setA}/></Inline>
        <Inline justify="between"><Body>Push notifications</Body><Switch label="Push" checked={b} onCheckedChange={setB}/></Inline>
        <Inline justify="between"><Body>Two-factor auth</Body><Switch label="2FA" checked={c} onCheckedChange={setC}/></Inline>
      </Stack>
    </Card>
  );
}

function SpinnerDemo() {
  return (
    <Inline gap={4}>
      <Spinner size={16}/>
      <Spinner size={20}/>
      <Spinner size={28}/>
    </Inline>
  );
}

function SkeletonDemo() {
  return (
    <Stack gap={2} style={{ width: 280 }}>
      <Skeleton width="60%"/>
      <Skeleton width="100%"/>
      <Skeleton width="85%"/>
    </Stack>
  );
}

function LayoutDemo() {
  return (
    <Stack gap={3} style={{ width: 320 }}>
      <Body>Stack</Body>
      <Stack gap={2} style={demoBox}>
        {['one','two','three'].map(t => <Chip key={t} label={t}/>)}
      </Stack>
      <Body>Inline</Body>
      <Inline gap={2} wrap style={demoBox}>
        {['a','b','c','d','e'].map(t => <Chip key={t} label={t}/>)}
      </Inline>
    </Stack>
  );
}

/* ─── shared text helpers ──────────────────────────────────────── */
function Title({ children }) {
  return <Text style={{ fontSize: fontSize.base, fontWeight: '600', color: colors.fg1 }}>{children}</Text>;
}
function Body({ children }) {
  return <Text style={{ fontSize: fontSize.sm, color: colors.fg2 }}>{children}</Text>;
}
function Chip({ label }) {
  return (
    <View style={{ backgroundColor: colors.bg, borderColor: colors.borderSubtle, borderWidth: 1, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 6 }}>
      <Text style={{ fontSize: fontSize.xs, color: colors.fg2 }}>{label}</Text>
    </View>
  );
}
const demoBox = { backgroundColor: colors.bgSubtle, borderRadius: 6, padding: 12 };

const DEMOS = {
  ButtonDemo,
  CardDemo,
  InputDemo,
  SwitchDemo,
  SpinnerDemo,
  SkeletonDemo,
  LayoutDemo,
};

export default function NativeSurface({ demoKey }) {
  const Demo = DEMOS[demoKey];
  if (!Demo) {
    return <Text style={{ fontSize: 12, color: '#71717a' }}>No native demo for "{demoKey}".</Text>;
  }
  return <Demo/>;
}
