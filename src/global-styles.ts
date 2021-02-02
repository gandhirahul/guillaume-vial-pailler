import { createGlobalStyle } from "styled-components";
import { theme } from "./componentsLibrary/styles/colours";
import { fontSize } from "./componentsLibrary/styles/fontSize";

export const GlobalStyles = createGlobalStyle`
body {
    background-color: ${theme.colours.brand.lightGray};
    margin: 0;
    font-size: ${fontSize.medium};
    font-family: sans-serif;
  }
  
  p {
    margin: 0
  }
`;
