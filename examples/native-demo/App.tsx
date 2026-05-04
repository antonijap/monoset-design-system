import { useState } from "react";
import { ScrollView, StatusBar, Text, View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Input,
  Field,
  Stack,
  Inline,
  Switch,
  Spinner,
  Skeleton,
  colors,
  space,
  fontSize,
  fontWeight,
} from "@monoset/native";

export default function App() {
  const [email, setEmail] = useState("ada@monoset.dev");
  const [emailEdited, setEmailEdited] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSkeletons, setShowSkeletons] = useState(false);

  const isInvalid = emailEdited && !email.includes("@");

  return (
    <View style={local.root}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={local.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header ──────────────────────────────────── */}
        <View style={local.header}>
          <Text style={local.eyebrow}>MONOSET · NATIVE</Text>
          <Text style={local.title}>Everything.{"\n"}Nothing extra.</Text>
          <Text style={local.lead}>
            One neutral ramp, one typeface, the components you'd build anyway.
            Vanilla StyleSheet inside, Reanimated for motion.
          </Text>
        </View>

        {/* ─── Buttons ─────────────────────────────────── */}
        <Section title="Buttons">
          <Card>
            <Stack gap={4}>
              <Inline gap={2} wrap>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </Inline>
              <Inline gap={2} wrap>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Inline>
              <Button disabled>Disabled</Button>
            </Stack>
          </Card>
        </Section>

        {/* ─── Cards ───────────────────────────────────── */}
        <Section title="Cards">
          <Stack gap={3}>
            <Card>
              <Text style={local.cardTitle}>Default</Text>
              <Text style={local.cardBody}>Subtle border, no shadow.</Text>
            </Card>
            <Card variant="elevated">
              <Text style={local.cardTitle}>Elevated</Text>
              <Text style={local.cardBody}>Soft shadow, no border.</Text>
            </Card>
            <Card variant="inset">
              <Text style={local.cardTitle}>Inset</Text>
              <Text style={local.cardBody}>Subtle background fill.</Text>
            </Card>
          </Stack>
        </Section>

        {/* ─── Inputs ──────────────────────────────────── */}
        <Section title="Inputs">
          <Card>
            <Stack gap={4}>
              <Field
                label="Email"
                help="Used for sign-in and account recovery."
                error={isInvalid ? "Enter a valid email address." : undefined}
              >
                <Input
                  value={email}
                  onChangeText={(t) => { setEmail(t); setEmailEdited(true); }}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  invalid={isInvalid}
                />
              </Field>
              <Field label="Name">
                <Input placeholder="Ada Turing" />
              </Field>
              <Field label="Disabled">
                <Input value="Read only" editable={false} />
              </Field>
            </Stack>
          </Card>
        </Section>

        {/* ─── Switches ────────────────────────────────── */}
        <Section title="Switches">
          <Card>
            <Stack gap={4}>
              <Inline justify="between">
                <View style={{ flex: 1 }}>
                  <Text style={local.rowTitle}>Email alerts</Text>
                  <Text style={local.rowBody}>Daily summary of activity</Text>
                </View>
                <Switch label="Email alerts" checked={emailNotifs} onCheckedChange={setEmailNotifs} />
              </Inline>
              <Inline justify="between">
                <View style={{ flex: 1 }}>
                  <Text style={local.rowTitle}>Push notifications</Text>
                  <Text style={local.rowBody}>Ping me on mentions</Text>
                </View>
                <Switch label="Push" checked={pushNotifs} onCheckedChange={setPushNotifs} />
              </Inline>
              <Inline justify="between">
                <View style={{ flex: 1 }}>
                  <Text style={local.rowTitle}>Two-factor auth</Text>
                  <Text style={local.rowBody}>Require code on sign-in</Text>
                </View>
                <Switch label="2FA" checked={twoFactor} onCheckedChange={setTwoFactor} />
              </Inline>
            </Stack>
          </Card>
        </Section>

        {/* ─── Spinner / Skeleton ──────────────────────── */}
        <Section title="Loading">
          <Stack gap={3}>
            <Card>
              <Inline justify="between">
                <Inline gap={3}>
                  {loading ? <Spinner /> : null}
                  <Text style={local.rowTitle}>
                    {loading ? "Saving…" : "Tap to simulate"}
                  </Text>
                </Inline>
                <Button
                  variant={loading ? "secondary" : "primary"}
                  onPress={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1500);
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading" : "Save"}
                </Button>
              </Inline>
            </Card>

            <Card>
              <Stack gap={3}>
                <Inline justify="between">
                  <Text style={local.rowTitle}>Skeleton placeholders</Text>
                  <Switch checked={showSkeletons} onCheckedChange={setShowSkeletons} label="Skeleton" />
                </Inline>
                {showSkeletons ? (
                  <Stack gap={2}>
                    <Skeleton width="60%" />
                    <Skeleton width="100%" />
                    <Skeleton width="85%" />
                  </Stack>
                ) : (
                  <Stack gap={1}>
                    <Text style={local.rowBody}>Status: nominal</Text>
                    <Text style={local.rowBody}>Last sync 4 minutes ago</Text>
                    <Text style={local.rowBody}>Next run in 56 minutes</Text>
                  </Stack>
                )}
              </Stack>
            </Card>
          </Stack>
        </Section>

        {/* ─── Layout ──────────────────────────────────── */}
        <Section title="Layout primitives">
          <Card>
            <Stack gap={4}>
              <View>
                <Text style={local.rowTitle}>Stack (vertical, gap=3)</Text>
                <Stack gap={3} style={local.demoBox}>
                  {["one", "two", "three"].map((t) => (
                    <View key={t} style={local.demoChip}><Text style={local.demoChipText}>{t}</Text></View>
                  ))}
                </Stack>
              </View>
              <View>
                <Text style={local.rowTitle}>Inline (horizontal, gap=2)</Text>
                <Inline gap={2} wrap style={local.demoBox}>
                  {["a", "b", "c", "d", "e"].map((t) => (
                    <View key={t} style={local.demoChip}><Text style={local.demoChipText}>{t}</Text></View>
                  ))}
                </Inline>
              </View>
            </Stack>
          </Card>
        </Section>

        <View style={{ height: space[10] }} />
        <Text style={local.footer}>v0.1 · MIT · monoset.design</Text>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={local.section}>
      <Text style={local.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const local = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { paddingTop: 56, paddingBottom: 64, paddingHorizontal: space[5] },
  header: { marginBottom: space[8], paddingHorizontal: space[2] },
  eyebrow: { fontSize: 10, fontWeight: fontWeight.semibold as any, letterSpacing: 1.5, color: colors.fg3, marginBottom: space[3] },
  title: { fontSize: fontSize["3xl"], fontWeight: fontWeight.bold as any, color: colors.fg1, letterSpacing: -0.5, lineHeight: fontSize["3xl"] * 1.1, marginBottom: space[3] },
  lead: { fontSize: fontSize.base, color: colors.fg3, lineHeight: fontSize.base * 1.55 },

  section: { marginBottom: space[7] },
  sectionTitle: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold as any, letterSpacing: 1.2, color: colors.fg3, textTransform: "uppercase", marginBottom: space[3], paddingHorizontal: space[2] },

  cardTitle: { fontSize: fontSize.base, fontWeight: fontWeight.semibold as any, color: colors.fg1 },
  cardBody:  { fontSize: fontSize.sm, color: colors.fg3, marginTop: 2 },

  rowTitle: { fontSize: fontSize.sm, fontWeight: fontWeight.medium as any, color: colors.fg1 },
  rowBody:  { fontSize: fontSize.xs, color: colors.fg3, marginTop: 2 },

  demoBox: { backgroundColor: colors.bgSubtle, borderRadius: 6, padding: space[3], marginTop: space[2] },
  demoChip: { backgroundColor: colors.bg, borderColor: colors.borderSubtle, borderWidth: 1, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 6 },
  demoChipText: { fontSize: fontSize.xs, color: colors.fg2 },

  footer: { fontSize: fontSize.xs, color: colors.fg4, textAlign: "center", marginTop: space[4] },
});
