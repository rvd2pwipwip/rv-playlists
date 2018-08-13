import React, { Component } from "react";
import "../App.css"; //import global css
// import Aggregate from "./Aggregate";
// import Filter from "./Filter";
// import Playlist from "./Playlist";

const defaultStyle = {
  color: "#fff"
};

let fakeServerData = {
  user: {
    name: "Herve",
    playlists: [
      {
        name: "rvSpanoushtre",
        songs: ["1977", "Tren al Sur", "Nada"]
      },
      {
        name: "rvChicaSpanoushtre",
        songs: ["Amor Sin Fin", "Flaca", "Padre Nuestro"]
      },
      {
        name: "rvChom",
        songs: ["Hells Bells", "Whole Lotta Love", "Godzilla"]
      },
      {
        name: "rvAltern",
        songs: ["In a Big Country", "Nostalgia", "The Unguarded Moment"]
      }
    ]
  }
};

class Aggregate extends Component {
  state = {};
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists && this.props.playlists.length} Title</h2>
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
  //set initial state before component did mount in the constructor
  constructor(props) {
    super(props);
    this.state = { serverData: {} };
  }

  componentDidMount() {
    //fake server delay
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {/* check if there is user data in serverData before rendering React.Fragment*/}
        {this.state.serverData.user ? (
          <React.Fragment>
            <h1
              style={{
                ...defaultStyle,
                "font-size": "54px",
                "font-weight": "100"
              }}
            >
              {this.state.serverData.user.name}
              's Playlists
            </h1>
            <Aggregate playlists={this.state.serverData.user.playlists} />
            <Aggregate />
            <Filter />
            <Playlist />
            <Playlist />
            <Playlist />
          </React.Fragment>
        ) : (
          // if there was no user data at start of ternary, render h3 Loading... instead
          <h3 style={defaultStyle}>Loading...</h3>
        )}
      </div>
    );
  }
}

export default App;
