import { Outlet } from "react-router";
import { AppProvider } from "@shopify/polaris";
import AppNavigation from "./components/AppNavigation";

import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <AppNavigation />
      <Outlet />
    </AppProvider>
  );
}