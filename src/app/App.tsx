import { HashRouter, useRoutes } from "react-router";
import { AppProviders } from "./providers";
import { appRoutes } from "./routes";

function RoutedApp() {
  return useRoutes(appRoutes);
}

export default function App() {
  return (
    <AppProviders>
      <HashRouter>
        <RoutedApp />
      </HashRouter>
    </AppProviders>
  );
}
