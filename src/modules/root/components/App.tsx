import React, { useEffect } from "react";
import { useStore } from "shared/hooks";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  DarkMode,
  Spinner,
  Link,
} from "@chakra-ui/core";
import { rootStore, storeContext } from "../store";
import NavBar from "modules/user/components/NavBar";
import customTheme from "../theme";
import TransfersTable from "./TransfersTable";
import TransfersChart from "./TransfersChart";
import { observer } from "mobx-react";
import { ReactComponent as GithubRibbon } from 'shared/assets/github.svg'

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
            {rootStore.initialized ? (
              <>
                <Link href="https://github.com/MrToph/token-portfolio"><GithubRibbon /></Link>
                <NavBar />
                <TransfersChart />
                <TransfersTable />
              </>
            ) : (
              <Spinner />
            )}
          </DarkMode>
        </ColorModeProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default observer(App);
