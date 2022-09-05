import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { useState } from 'react';
import UserContext from '@/components/user-context';
import Splash from '@/components/splash';

const themeConfig = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  themeConfig,
    components: {
      Button: {
        /*variants: {
            solid: (props) => ({
              bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
            })
        }*/
      }
  }
});

function VolunteerApp({ Component, pageProps }) {

  const [user, setUser] = useState({});
  const [hasShownSplash, setHasShownSplash] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      { hasShownSplash ? null : <Splash onComplete={() => setHasShownSplash(true)}/> }
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default VolunteerApp;
