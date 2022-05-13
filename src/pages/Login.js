import React from 'react';
import { ConnectButton, Icon } from 'web3uikit';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className="loginPage">
        <Icon fill="#ffffff" size={40} svg="twitter" />
        <ConnectButton />
        <div className="netMessage">Polygon - Mumbai</div>
      </div>
    </>
  );
};

export default Login;
