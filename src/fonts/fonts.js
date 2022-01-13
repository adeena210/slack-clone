import { createGlobalStyle } from "styled-components";

import Hussar from './HussarBoldWeb-bf92.woff'
import pixel1 from './pixeldigivolve-mom9-webfont.woff2'
import pixel2 from './pixeldigivolve-mom9-webfont.woff'




export default createGlobalStyle`
    @font-face {
    font-family: 'pixel';
    src: local('pixel'), local('pixel'), 
         url(${pixel1}) format('woff2'),
         url(${pixel2}) format('woff');
    font-weight: normal;
    font-style: normal;

}

`
