import { Global } from '@emotion/react'
import pixel1 from './pixeldigivolve-mom9-webfont.woff2'
import pixel2 from './pixeldigivolve-mom9-webfont.woff'




const Fonts = () => (
<Global
   styles={ `
   @font-face {
    font-family: 'pixel';
    src: local('pixel'), local('pixel'), 
         url(${pixel1}) format('woff2'),
         url(${pixel2}) format('woff');
    font-weight: normal;
    font-style: normal;

}
   `}
/>
)

export default Fonts