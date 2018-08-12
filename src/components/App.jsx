import React, { Component } from "react";
import "../App.css"; //import global css
// import Aggregate from "./Aggregate";
// import Filter from "./Filter";
// import Playlist from "./Playlist";

const defaultStyle = {
  color: "#fff"
};

class Aggregate extends Component {
  state = {};
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  state = {};
  render() {
    return (
      <div style={defaultStyle}>
        <img src="" alt="" />
        <input type="text" />
      </div>
    );
  }
}

class Playlist extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          ...defaultStyle,
          width: "25%",
          display: "inline-block"
        }}
      >
        <img src="" alt="" />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{ ...defaultStyle, "font-size": "54px" }}>Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
