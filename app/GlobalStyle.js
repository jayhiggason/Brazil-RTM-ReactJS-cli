import { createGlobalStyle } from 'styled-components';
import * as MarsBook from '../app/fonts/MarsCentra-Book.ttf';
import * as MarsBold from '../app/fonts/MarsCentra-Bold.ttf';
import * as MarsExtraBold from '../app/fonts/MarsCentra-Extrabold.ttf';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    // font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    // font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    // font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  @font-face {
    font-family: 'MarsCentra-Book';
    src: url(${MarsBook}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'MarsCentra-Bold';
    src: url(${MarsBold}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'MarsCentra-Extrabold';
    src: url(${MarsExtraBold}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default GlobalStyle;
