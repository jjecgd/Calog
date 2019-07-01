import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    word-break: break-word;
    letter-spacing: -1px;
    font-size: inherit;
  }

  html{
    padding: 0;
    margin: 0;
    font-size: 16px;
    background: #f1f3f5;
  }

  ul {
    list-style: none;
  }

  button{
    padding: 0.25rem 0.75rem;
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
    background: #000;

    &.orange{
      background: #f59f00;
    }
    &.red{
      background: #f03e3e;
    }
    &.blue{
      background: #1c7ed6;
    }
    &.teal{
      background: #0ca678;
    }
    &.green{
      background: #37b24d;
    }
  }
`;

export default GlobalStyles;
