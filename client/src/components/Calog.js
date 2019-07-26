import React, { Component } from 'react';
import styled from 'styled-components';

import { replaceZero } from '../utils/number';

const CalogWrap = styled.div`
  min-width: 320px;
  box-sizing: border-box;
  position: absolute;
  padding: ${props => (props.isOwner ? '4rem 0 3rem;' : '4rem 0 0.5rem;')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Header = styled.header`
  z-index:3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #099268;
  h1 {
    padding: 1rem;
    text-align: center;
    font-weight: 300;
    font-size: 2rem;
    color: #fff;
  }
  .btn_group {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;

const WriteBtn = styled.button`
  position: absolute;
  width: 100%;
  height: 3rem;
  bottom: 0;
  left: 0;
`;

class Calog extends Component {
  render() {
    const {
      onPostStart,
      onLogout,
      onPostListView,
      onActiveDateChange,
      Calendar,
      status,
      currentCalog,
      isOwner,
      userId,
      currentDate,
      targetDate,
      posts,
      history
    } = this.props;
    const targetPost =
      status === 'SUCCESS' && posts[targetDate.year][targetDate.month];

    return (
      <CalogWrap isOwner={isOwner}>
        <Header>
          <h1>{currentCalog}'s Calog</h1>
          <div className="btn_group">
            <button
              className="blue"
              onClick={() => {
                history.push('/caloggers');
              }}
            >
              Caloggers
            </button>
            {userId !== '' ? (
              <button className="red" onClick={onLogout}>
                Logout
              </button>
            ) : (
              <button
                className="blue"
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </button>
            )}
          </div>
        </Header>
        <Calendar
          onActiveDateChange={value => {
            status === 'SUCCESS' && onActiveDateChange(value.activeStartDate);
          }}
          onClickDay={value => {
            if (targetPost[replaceZero(value.getDate())] === undefined) {
              return;
            }
            onPostListView(value);
          }}
          onClickMonth={value => {
            onActiveDateChange(value);
          }}
          value={currentDate}
          calendarType="US"
          tileClassName={({ date, view }) => {
            const today = new Date();
            if (
              today.getFullYear() === date.getFullYear() &&
              today.getMonth() === date.getMonth() &&
              today.getDate() === date.getDate()
            ) {
              return 'today';
            } else {
              return null;
            }
          }}
          tileContent={({ date, view }) => {
            let resultCount = 0;
            return (
              <div className="button_wrap">
                {(() => {
                  if (view !== 'month') {
                    console.log(`${date.getMonth() + 1}`);
                    return null;
                  } else {
                    if (targetPost[replaceZero(date.getDate())] !== undefined) {
                      resultCount =
                        targetPost[replaceZero(date.getDate())].length;
                    } else {
                      resultCount = 0;
                    }
                    return (
                      <p className={`count ${resultCount === 0 ? 'none' : ''}`}>
                        {resultCount}
                      </p>
                    );
                  }
                })()}
                <span className="border_bottom"></span>
              </div>
            );
          }}
        />
        {isOwner && (
          <WriteBtn className="orange" onClick={onPostStart}>
            글 작성
          </WriteBtn>
        )}
      </CalogWrap>
    );
  }
}

export default Calog;
