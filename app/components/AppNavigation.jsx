import { NavMenu } from "@shopify/app-bridge-react";

export default function AppNavigation() {
  return (
    <NavMenu>
      <a href="/">Dashboard</a>
      <a href="/field-mapping">Field Mapping</a>
      <a href="/sync">Sync</a>
      <a href="/health">Health</a>
      <a href="/settings">Settings</a>
      <a href="/logs">Logs</a>
    </NavMenu>
  );
}