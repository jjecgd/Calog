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

  hr {
    margin: 1rem 0;
    width: 100%;
    height: 1px;
    border: none;
    background: #dee2e6;
  }

  abbr{
    text-decoration:none;
  }

  html{
    font-size: 16px;
    min-width:320px;
    background: #f1f3f5;
  }

  .btn_group{
    & button{
      margin-left:0.8rem;
    }
  }
  
  button{
    padding:0 0.7rem;
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

  .introContainer{
    position:absolute;
    width:100%;
    height:100%;
    .button{
      display:table;
      position:absolute;
      width:50%;
      height:100%;
      text-align:center;
      font-size:2rem;
      color:#fff;
      transition:background 0.3s;
      & span{
        display:table-cell;
        vertical-align:middle;
      }
      &.green{
        top:0;
        left:0;
        background:#0ca678;
        &:hover{
          background:#087f5b;
        }
      }
      &.blue{
        top:0;
        left:50%;
        background:#1c7ed6;
        &:hover{
          background:#1864ab;
        }
      }
    }
  }

  .react-calendar{
    box-sizing:border-box;
    position:relative;
    top:0;
    left:0;
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
      line-height:1;
      & button{
        height:50px;
        font-size:1.2rem;
        background:#01ad7b;
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
        transition:background 0.3s;
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
            & .react-calendar__month-view__weekdays__weekday{
              & + .react-calendar__month-view__weekdays__weekday{
                box-sizing:border-box;
                border-left:1px solid #fff;
              }
            }
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
              color:#555;
              transition:background 0.3s;
              border-radius:0.8rem;
              overflow:visible !important;
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
                  width:92%;
                  height:1px;
                  margin:0 4%;
                  background:#80878d;
                }
                & .count{
                  position:absolute;
                  bottom:5%;
                  right:5%;
                  width:1.2rem;
                  height:1.2rem;
                  color:#fff;
                  font-size:0.875rem;
                  letter-spacing:0;
                  line-height:1.2rem;
                  border-radius:50%;
                  background:#f03e3e;
                  transition:background 0.3s;
                  &.none{
                    background:#adb5bd;
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
                cursor:default;
                outline:none;
                pointer-events:none;
                &:hover{
                  background:#f3f4f6;
                }
                abbr{
                  display:none;
                }
                & .button_wrap{
                  .count{
                    display:none;
                  }
                }
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
