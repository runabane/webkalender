import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from "./containers/MainContainer";
import ColorPalettes from "./dataModel/ColorPalettes";

function App() {
  return (
    <div style={divStyle.divStyle} className="App">
        <MainContainer />
    </div>
  );
}

const divStyle: any = {
    divStyle: {
        backgroundColor: ColorPalettes.BackgroundColorPalettes.metallicBlack,
        fontFamily: "roboto"
    }
}

export default App;
