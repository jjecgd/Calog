import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    font-family: sans-serif;
    word-break: break-word;
    letter-spacing: -1px;
    font-size: inherit;
  }

  a{
    text-decoration:none;
    color:inherit;
  }

  html{
    font-size: 16px;
    background: #f1f3f5;
  }

  button{
    padding:0 0.7rem;
    outline: none;
    border: none;
    line-height: 2.2rem;
    color: #fff;
    cursor: pointer;
    background: #000;
    &>a{
      display:block;
    }
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
    &.gray{
      background: #495057;
      cursor:default;
    }
  }
`;

export default GlobalStyles;
