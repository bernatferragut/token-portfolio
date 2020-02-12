import React, { useEffect } from "react";
import { useStore } from "shared/hooks";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  DarkMode
} from "@chakra-ui/core";
import { rootStore, storeContext } from "../store";
import NavBar from "modules/user/components/NavBar";
import customTheme from "../theme";
import TransfersTable from "./TransfersTable";

export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>
  );
};

const App: React.FC = () => {
  const rootStore = useStore(rootStore => rootStore);

  useEffect(() => {
    if (!rootStore) console.error(`Rootstore not initialized yet.`);
    rootStore.init();
  }, [rootStore]);

  return (
    <StoreProvider>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <DarkMode>
            <CSSReset />
            <NavBar />
            <TransfersTable />
          </DarkMode>
        </ColorModeProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;