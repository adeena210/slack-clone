import { extendTheme, textDecoration} from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: 'pixel',
        body: 'pixel',
    },
    styles: {
        global: {
          body: {
            bg: '#141301',
            color: '#EF846C',
          },
          a: {
              color: '#2D5676',
              textDecoration: 'underline',

              _hover: {
                  color: '#94C5CC'
              }
          }
        },
      },
})

export default theme