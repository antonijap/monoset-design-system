import { useState } from "react";
import {
  Button,
  Badge,
  Card,
  Field,
  Input,
  Switch,
} from "@monoset/react";

export default function App() {
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 24px",
        background: "var(--bg-subtle)",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <header style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge variant="outline">Monoset</Badge>
          <span style={{ fontSize: 12, color: "var(--fg3)" }}>
            Your new app is ready.
          </span>
        </header>

        <h1 style={{ margin: 0, fontSize: 24, letterSpacing: "-0.01em" }}>
          Get started
        </h1>

        <p style={{ margin: 0, color: "var(--fg3)", lineHeight: 1.6, fontSize: 14 }}>
          Edit <code>src/App.jsx</code> to start building. Docs live at{" "}
          <a href="https://monoset.design">monoset.design</a>.
        </p>

        <Field label="Email">
          {({ id }) => (
            <Input
              id={id}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>

        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
          label="Ship-notification emails"
        />

        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="primary">Continue</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Card>
    </main>
  );
}
