import React from "react";
import styled from "styled-components";
import range from "lodash/range";
import {connect} from "react-redux";
import classnames from 'classnames'

import ReduxState from "../types/GlobalState";

interface IOwnProps {

}

interface IStateProps {
  userRecitedAyahs: number;
}

type IProps = IOwnProps & IStateProps;

class ProgressBubbles extends React.Component<IProps, never> {
  render() {
    return (
      <Container>
        {
          range(1, 6).map((num, i) => {
            const classname = classnames({
              completed: this.props.userRecitedAyahs >= num
            })
            return <Bubble key={i} className={classname} >{ num }</Bubble>
          })
        }
      </Container>
    )
  }
}

const Container = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Bubble = styled.div`
  font-weight: bold;
  border: solid 2px #9a9e9b;
  color: #9a9e9b;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  
  &.completed {
    background-color: #5ec49e;
    border-color: #5ec49e;
    color: white;
  }
`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    userRecitedAyahs: state.profile.userRecitedAyahs
  }
}

export default connect(mapStateToProps)(ProgressBubbles);
