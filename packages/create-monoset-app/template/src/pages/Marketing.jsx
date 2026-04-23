import { Avatar, Button, Card } from "@monoset/react";

const features = [
  {
    icon: "\u2014",
    title: "Built for speed",
    description:
      "Optimized from the ground up. No unnecessary abstractions, no bloat. Ship in hours, not weeks.",
  },
  {
    icon: "\u2014",
    title: "Team-ready",
    description:
      "Role-based access, audit logs, and SSO out of the box. Your security team will thank you.",
  },
  {
    icon: "\u2014",
    title: "Developer-first",
    description:
      "Clean APIs, typed SDKs, and docs that actually help. Integrate with your stack in minutes.",
  },
];

const avatars = [
  { initials: "EV" },
  { initials: "JH" },
  { initials: "PN" },
  { initials: "MR" },
  { initials: "SL" },
];

export default function Marketing() {
  return (
    <div style={{ background: "var(--bg)" }}>
      {/* Nav */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.02em",
          }}
        >
          YourApp
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost">Log in</Button>
          <Button variant="primary">Get started</Button>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "80px 24px 64px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Ship your next product in days, not months
        </h1>
        <p
          style={{
            margin: "20px auto 0",
            maxWidth: 480,
            fontSize: 16,
            color: "var(--fg3)",
            lineHeight: 1.6,
          }}
        >
          A modern platform for teams that move fast. Stop wrestling with
          infrastructure and start building what matters.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 32,
          }}
        >
          <Button variant="primary">Get started free</Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {features.map((f) => (
            <Card key={f.title} style={{ padding: 28 }}>
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 16,
                  color: "var(--fg3)",
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--fg3)",
                  lineHeight: 1.6,
                }}
              >
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section
        style={{
          textAlign: "center",
          padding: "48px 24px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          {avatars.map((a, i) => (
            <div
              key={a.initials}
              style={{
                marginLeft: i === 0 ? 0 : -8,
                border: "2px solid var(--bg)",
                borderRadius: "50%",
              }}
            >
              <Avatar initials={a.initials} size="sm" />
            </div>
          ))}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--fg3)",
          }}
        >
          Trusted by 1,000+ teams worldwide
        </p>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <Card
          variant="elevated"
          style={{
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to get started?
          </h2>
          <p
            style={{
              margin: "12px 0 28px",
              fontSize: 14,
              color: "var(--fg3)",
            }}
          >
            Free for small teams. No credit card required.
          </p>
          <Button variant="primary">Start building today</Button>
        </Card>
      </section>
    </div>
  );
}
