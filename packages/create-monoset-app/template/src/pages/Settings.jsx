import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Textarea,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@monoset/react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("Elena Voss");
  const [email, setEmail] = useState("elena@acme.co");
  const [bio, setBio] = useState("");

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        Settings
      </h1>
      <p
        style={{
          margin: "0 0 32px",
          fontSize: 13,
          color: "var(--fg3)",
        }}
      >
        Manage your account preferences.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="profile" isActive={activeTab === "profile"}>
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" isActive={activeTab === "notifications"}>
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" isActive={activeTab === "security"}>
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile">
          <Card
            style={{
              marginTop: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Field label="Full name">
              {({ id }) => (
                <Input
                  id={id}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
            </Field>

            <Field label="Email">
              {({ id }) => (
                <Input
                  id={id}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </Field>

            <Field label="Bio">
              {({ id }) => (
                <Textarea
                  id={id}
                  rows={3}
                  placeholder="A short description about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              )}
            </Field>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary">Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card
            style={{
              marginTop: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <Switch
                checked={emailNotifs}
                onCheckedChange={setEmailNotifs}
                label="Email notifications"
              />
              <p
                style={{
                  margin: "4px 0 0 44px",
                  fontSize: 12,
                  color: "var(--fg3)",
                }}
              >
                Receive updates about account activity via email.
              </p>
            </div>

            <div>
              <Switch
                checked={pushNotifs}
                onCheckedChange={setPushNotifs}
                label="Push notifications"
              />
              <p
                style={{
                  margin: "4px 0 0 44px",
                  fontSize: 12,
                  color: "var(--fg3)",
                }}
              >
                Get real-time alerts on your device.
              </p>
            </div>

            <div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                label="Marketing emails"
              />
              <p
                style={{
                  margin: "4px 0 0 44px",
                  fontSize: 12,
                  color: "var(--fg3)",
                }}
              >
                Hear about new features and product updates.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Security tab */}
        <TabsContent value="security">
          <Card
            style={{
              marginTop: 24,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Field label="Current password">
              {({ id }) => (
                <Input
                  id={id}
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              )}
            </Field>

            <Field label="New password">
              {({ id }) => (
                <Input
                  id={id}
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              )}
            </Field>

            <Field label="Confirm new password">
              {({ id }) => (
                <Input
                  id={id}
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
            </Field>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary">Change password</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
