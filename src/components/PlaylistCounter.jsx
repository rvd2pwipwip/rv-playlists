import React, { Component } from "react";
import defaultTextColor from "./App";

class PlaylistCounter extends Component {
  state = {};
  render() {
    return (
      <div style={{ width: "40%", display: "inline-block" }}>
        <h2 style={{ color: defaultTextColor }}>Number Text</h2>
      </div>
    );
  }
}

export default PlaylistCounter;
