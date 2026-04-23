import { useState } from "react";
import {
  Avatar,
  Badge,
  Card,
  Input,
  Separator,
  Table,
} from "@monoset/react";

const stats = [
  { label: "Total users", value: "2,847", change: "+12%" },
  { label: "Active now", value: "184", change: "+3%" },
  { label: "Revenue", value: "$48.2k", change: "+8%" },
];

const navItems = [
  { label: "Overview", active: true },
  { label: "Users" },
  { label: "Analytics" },
  { label: "Reports" },
  { label: "Settings" },
];

const users = [
  { name: "Elena Voss", email: "elena@acme.co", role: "Admin", status: "Active" },
  { name: "James Harlow", email: "james@acme.co", role: "Editor", status: "Active" },
  { name: "Priya Nair", email: "priya@acme.co", role: "Viewer", status: "Invited" },
  { name: "Marcus Reid", email: "marcus@acme.co", role: "Editor", status: "Active" },
  { name: "Sofia Lund", email: "sofia@acme.co", role: "Viewer", status: "Inactive" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          borderRight: "1px solid var(--border)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexShrink: 0,
          background: "var(--bg-subtle)",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            padding: "0 12px 16px",
            letterSpacing: "-0.02em",
          }}
        >
          YourApp
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              style={{
                display: "block",
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                color: item.active ? "var(--fg1)" : "var(--fg3)",
                background: item.active ? "var(--bg-hover)" : "transparent",
                textDecoration: "none",
                fontWeight: item.active ? 500 : 400,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 28px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 280 }}
          />
          <Avatar initials="AJ" size="sm" />
        </header>

        {/* Content */}
        <main style={{ padding: 28, flex: 1 }}>
          <h1
            style={{
              margin: "0 0 24px",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Overview
          </h1>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 28,
            }}
          >
            {stats.map((stat) => (
              <Card key={stat.label} style={{ padding: 20 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--fg3)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--fg3)" }}>
                    {stat.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <Separator style={{ marginBottom: 28 }} />

          {/* Users table */}
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Recent users
          </h2>

          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar initials={user.name.split(" ").map((n) => n[0]).join("")} size="sm" />
                      {user.name}
                    </div>
                  </td>
                  <td style={{ color: "var(--fg3)" }}>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Badge
                      variant={user.status === "Active" ? "solid" : "outline"}
                    >
                      {user.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    </div>
  );
}
