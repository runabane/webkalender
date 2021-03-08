import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <div style={divStyle.divStyle} className="App">
        <MainContainer/>
    </div>
  );
}

const divStyle: any = {
    divStyle: {
        fontFamily: "roboto"
    }
}

export default App;
