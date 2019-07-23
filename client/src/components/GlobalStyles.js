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

  abbr{
    text-decoration:none;
  }

  html{
    font-size: 16px;
    min-width:320px;
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

  .react-calendar{
    box-sizing:border-box;
    position:relative;
    top:0;
    left:0;
    margin-top:1px;
    width:100%;
    height:100%;
    & button{
      background:none;
      padding:0;
    }
    ${null /* 내비게이션 */}
    & .react-calendar__navigation{
      z-index:1;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      font-size:1rem;
      background:#01ad7b;
      & button{
        height:50px;
        ${null /* 화살표 버튼들 */}
        &.react-calendar__navigation__arrow{
          width:40px;
        }
      }
    }
    ${null /* 달 */}
    & .react-calendar__month-view, & .react-calendar__year-view, & .react-calendar__decade-view, & .react-calendar__century-view{
      box-sizing:border-box;
      position:absolute;
      top:0;
      left:0;
      padding-top:50px;
      width:100%;
      height:100%;
      & .react-calendar__tile{
        position:relative;
        box-sizing:border-box;
        background:#f3f4f6;
        color:#80878d;
        transition-property:background;
        transition-duration:0.3s;
        border-radius:0.8rem;
        &:hover{
          background:#e0e1e3;
        }
      }
      & > div{
        box-sizing:border-box;
        position:relative;
        height:100%;
        & > div{
          position:relative;
          height:100%;
          & .react-calendar__month-view__weekdays{
            position:absolute;
            top:0;
            left:0;
            width:100%;
            padding:0.5rem 0;
            background:#009e67;
            color:#fff;
            text-align:center;
            text-decoration:none !important;
          }
          ${null /* 날짜 */}
          & .react-calendar__month-view__days{
            box-sizing:border-box;
            position:absolute;
            padding-top:2rem;
            top:0;
            left:0;
            width:100%;
            height:99%;
            color:#90979d;
            ${null /* 날짜 버튼들 */}
            & .react-calendar__tile{
              position:relative;
              box-sizing:border-box;
              background:#f3f4f6;
              color:#80878d;
              transition-property:background;
              transition-duration:0.3s;
              border-radius:0.8rem;
              &.today{
                background:#ffe7ae;
              }
              &:hover{
                background:#e0e1e3;
              }
              & abbr{
                position:absolute;
                top:10%;
                left:5%;
                line-height:1;
              }
              & .button_wrap{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                & .border_bottom{
                  position:absolute;
                  bottom:0;
                  left:0;
                  width:90%;
                  height:1px;
                  margin:0 5%;
                  background:#80878d;
                }
                & .count{
                  position:absolute;
                  bottom:5%;
                  width:100%;
                  color:#6f52a2;
                  line-height:1;
                  white-space:nowrap;
                  text-overflow:ellipsis;
                  overflow:hidden;
                  &.none{
                    color:#faadbc;
                  }
                }
              }
              ${null /* 주말 */}
              &.react-calendar__month-view__days__day--weekend{
                color:#00b9f1;
                ${null /* 주말 - 일요일 */}
                & + .react-calendar__month-view__days__day--weekend{
                  color:#e63e24;
                }
              }
              ${null /* 이전달, 다음달 */}
              &.react-calendar__month-view__days__day--neighboringMonth{
                color:#c1c1c1;
              }
            }
          }
        }
      }
      ${null /* 요일 */}
    }
  }
`;

export default GlobalStyles;
