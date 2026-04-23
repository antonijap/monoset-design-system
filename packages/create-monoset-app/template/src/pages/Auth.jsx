import { useState } from "react";
import { Button, Card, Field, Input, Separator } from "@monoset/react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--fg1)",
            }}
          >
            YourApp
          </span>
        </div>

        <Card
          style={{
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Sign in
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 13,
                color: "var(--fg3)",
              }}
            >
              Enter your credentials to continue.
            </p>
          </div>

          <Field label="Email">
            {({ id }) => (
              <Input
                id={id}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </Field>

          <div>
            <Field label="Password">
              {({ id }) => (
                <Input
                  id={id}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </Field>
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <a
                href="#"
                style={{
                  fontSize: 12,
                  color: "var(--fg3)",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          <Button variant="primary" style={{ width: "100%" }}>
            Sign in
          </Button>

          <Separator
            style={{ position: "relative" }}
          />
          <span
            style={{
              fontSize: 11,
              color: "var(--fg3)",
              textAlign: "center",
              marginTop: -12,
              marginBottom: -6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            or
          </span>

          <Button variant="secondary" style={{ width: "100%" }}>
            Create account
          </Button>
        </Card>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "var(--fg3)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
