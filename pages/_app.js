import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/styled-system'

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
})


function VolunteerApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default VolunteerApp
