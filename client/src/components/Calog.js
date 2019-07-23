import React, { Component } from 'react';
import styled from 'styled-components';

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

const WriteBtn = styled.button`
  position: absolute;
  width: 100%;
  height: 3rem;
  bottom: 0;
  left: 0;
`;

class Calog extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts !== this.props.posts;
  }
  render() {
    const {
      onPostStart,
      //onPostRemove,
      onPostListView,
      //onPostView,
      posts,
      isOwner,
      Calendar,
      onActiveDateChange,
      currentDate
    } = this.props;
    return (
      <CalogWrap isOwner={isOwner}>
        <Calendar
          onActiveDateChange={value => {
            onActiveDateChange(value.activeStartDate);
          }}
          onClickDay={value => {
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
            return (
              <div className="button_wrap">
                {(() => {
                  if (view != 'month') {
                    return null;
                  } else {
                    if (posts[date.getDate()]) {
                      return (
                        <p className="count">{`${posts[date.getDate()].length} Posts`}</p>
                      );
                    } else {
                      return <p className="count none">Not Post</p>;
                    }
                  }
                })()}

                <span className="border_bottom"></span>
              </div>
            );
          }}
        />
        {/*<List className="list_area">{postArray}</List>*/}
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
