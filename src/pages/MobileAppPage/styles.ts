import styled from "styled-components";

export const Container = styled.div`
  padding: 1em 3em;
  height: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  
  .content {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
  .mobile-app-banner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: -210px;
    left: 0;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .background-logo{
    width: 65%;
    height: 100%;
    opacity: 0.1;
    transform: scaleX(0.8) scaleY(0.75) ;
  }
  .mobile-page-text {
    text-align: center;
    color: #485364;
    margin: 5em 0;
    
    p {
      margin-top: 2em;
    }
  }
  .mobile-buttons {
    text-align: center;
    display: flex;
    justify-content: center;
    
    a {
      text-decoration: none;
      border: 2px solid #5fc49e;
      border-radius: 5px;
      padding: 10px;
      margin: 0 1em;
      color: #5fc49e;
      font-size: 14pt;
      font-weight: 500;
      width: 100px;
      display: flex;
      text-align: center;
      justify-content: center;
      
      p {
        margin: 0;
        line-height: 28px;
      }
      img {
        width: 25px;
        height: 25px;
        margin: 0 5px;
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
    
    .content {
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
    
    .background-logo {
      width: 100%;
      height: 50%;
    }
    
    .mobile-page-text {
      font-size: 16pt;
      padding: 0 1em;
      margin: 1em 0;
       
      h1 {
        font-size: 1.2em;
      }
      p {
        font-size: 14px;
      }
    }
  }
`

