/* eslint-disable react-refresh/only-export-components */
import { Code, InlineCode, H1, H2, P, Lead, Divider } from '../../../ui/docs.jsx';

function PageSettingsGuide() {
  return (
    <div>
      <div style={{ fontSize:11, color:"var(--fg3)", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, marginBottom:12 }}>Guides</div>
      <H1>Building a settings page</H1>
      <Lead>A settings page is a good stress test for any component library. It needs tabs, form controls, cards, validation, and a layout that holds up on mobile. Here is how the pieces fit together in Monoset.</Lead>

      <H2 id="full-example">Full settings layout</H2>
      <P>Tabs across the top, cards for each section, and a save bar pinned to the bottom. This is the pattern most teams end up with.</P>
      <Code language="jsx" filename="Settings.tsx">{`import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card,
  Field, Input, Textarea, Switch, Button, Stack, Container,
} from "@monoset/react";

function SettingsPage() {
  return (
    <Container size="md">
      <h1>Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <h2>Profile details</h2>
              <Stack gap={16}>
                <Field label="Display name">
                  <Input placeholder="Jane Doe" />
                </Field>
                <Field label="Email">
                  <Input type="email" placeholder="jane@example.com" />
                </Field>
                <Field label="Bio">
                  <Textarea rows={3} />
                </Field>
              </Stack>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <h2>Email notifications</h2>
              <Stack gap={12}>
                <Field label="Marketing emails">
                  <Field.Control>
                    {props => <Switch {...props} />}
                  </Field.Control>
                </Field>
                <Field label="Security alerts">
                  <Field.Control>
                    {props => <Switch {...props} defaultChecked />}
                  </Field.Control>
                </Field>
              </Stack>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <h2>Change password</h2>
              <Stack gap={16}>
                <Field label="Current password">
                  <Input type="password" />
                </Field>
                <Field label="New password">
                  <Input type="password" />
                </Field>
                <Button variant="primary">Update password</Button>
              </Stack>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}`}</Code>

      <Divider/>

      <H2 id="validation">Form validation</H2>
      <P><InlineCode>Field</InlineCode> handles accessible labels and errors. Keep form state in React or use the form library your app already has.</P>
      <Code language="jsx" filename="ProfileForm.tsx">{`import { useState } from "react";
import { Field, Input, Button, Stack } from "@monoset/react";

function ProfileForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? {
    name: values.name ? undefined : "Name is required",
    email: values.email.includes("@") ? undefined : "Enter a valid email",
  } : {};

  return (
    <form onSubmit={event => {
      event.preventDefault();
      setSubmitted(true);
      if (values.name && values.email.includes("@")) onSave(values);
    }}>
      <Stack gap={16}>
        <Field label="Name" error={errors.name}>
          <Input
            value={values.name}
            onChange={event => setValues({...values, name: event.target.value})}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={event => setValues({...values, email: event.target.value})}
          />
        </Field>
        <Button type="submit" variant="primary">Save</Button>
      </Stack>
    </form>
  );
}`}</Code>

      <Divider/>

      <H2 id="layout">Layout with Stack and Container</H2>
      <P><InlineCode>Container</InlineCode> caps the width and centers the content. <InlineCode>Stack</InlineCode> handles vertical spacing between form fields. Both are thin wrappers that apply Monoset spacing tokens so you don't end up with magic numbers in every file.</P>
      <Code language="jsx">{`<Container size="sm">
  <Stack gap={24}>
    <Card>...</Card>
    <Card>...</Card>
  </Stack>
</Container>

{/* Container sizes: "sm" (480px), "md" (640px), "lg" (768px), "xl" (1024px) */}`}</Code>
    </div>
  );
}

export const PAGES = {
  settings: PageSettingsGuide,
};
