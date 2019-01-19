import React from "react";
import styled from "styled-components"
import {injectIntl} from 'react-intl'

import Routes from "./components/Routes";
import AppHelmet from "./components/AppHelmet";
import LanguagePicker from "./components/LanguagePicker";
import CookiesBanner from "./components/CookiesBanner";
import { createGlobalStyle } from 'styled-components'

import 'react-tippy/dist/tippy.css'
import './styles/index.scss'
import {withRouter} from "react-router";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: any) => props.path === '/evaluator' ? '#F4F3F2' : '#fff'};
  }
`

interface IProps {
  location: Location;
}

class App extends React.Component<IProps, never> {
  render() {
    return (
      <Container>
        <GlobalStyle path={this.props.location.pathname} />
        <AppHelmet/>
        <Routes />
        <LanguagePicker />
        {/*<CookiesBanner />*/}
      </Container>
    )
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 1280px;
  margin: auto;
  
  .rtl {
    direction: rtl;
  }
  
  .text-center {
    text-align: center;
  }
`

export default withRouter(injectIntl(App));
