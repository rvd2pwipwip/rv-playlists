import React, { Component } from "react";
import "../App.css"; //import global css
import queryString from "query-string";
// import PlaylistCounter from "./PlaylistCounter";
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
        name: "Spanoushtre",
        songs: [
          { title: "1977", duration: 243 },
          { title: "Tren al Sur", duration: 324 },
          { title: "Nada", duration: 356 }
        ]
      },
      {
        name: "ChicaSpanoushtre",
        songs: [
          { title: "Amor Sin Fin", duration: 243 },
          { title: "Flaca", duration: 324 },
          { title: "Padre Nuestro", duration: 356 }
        ]
      },
      {
        name: "rvChom",
        songs: [
          { title: "Hells Bells", duration: 243 },
          { title: "Whole Lotta Love", duration: 324 },
          { title: "Godzilla", duration: 356 }
        ]
      },
      {
        name: "rvAltern",
        songs: [
          { title: "In a Big Country", duration: 243 },
          { title: "Nostalgia", duration: 324 },
          { title: "The Unguarded Moment", duration: 356 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  state = {};
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>
          {`${this.props.playlists.length} `}
          <span style={{ fontWeight: "100" }}>playlists</span>
        </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  state = {};
  render() {
    const allSongs = this.props.playlists.reduce(
      (songs, playlist) => songs.concat(playlist.songs),
      []
    );
    const hours = allSongs.reduce((sum, song) => (sum += song.duration), 0);
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>
          {`${Math.round(hours / 60)} `}
          <span style={{ fontWeight: "100" }}>hours</span>
        </h2>
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
        <input
          type="text"
          onKeyUp={e => this.props.onFilterChange(e.target.value)}
        />
      </div>
    );
  }
}

class Playlist extends Component {
  state = {};
  render() {
    const playlist = this.props.playlist;
    return (
      <div
        style={{
          ...defaultStyle,
          width: "25%",
          display: "inline-block"
        }}
      >
        <img src="" alt="" />
        <h3>{playlist.name}</h3>
        <ul style={{ listStyle: "none" }}>
          {playlist.songs.map(song => (
            <li>{`${song.title} ${song.duration}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  //set initial state before component did mount in the constructor
  constructor(props) {
    super(props);
    this.state = {
      serverData: {},
      filterString: ""
    };
  }

  componentDidMount() {
    //use npm module to extract access token from URL
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    console.log(accessToken);
    //fetch returns a promise of a response that will then be parsed to JSON
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken }
    })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data =>
        this.setState({ serverData: { user: { name: data.display_name } } })
      );
  }

  render() {
    //first: ternary check for user && playlists in serverData
    const playlistsToRender =
      this.state.serverData.user && this.state.serverData.user.playlists
        ? //if there is data, filter only playlist with filter query in their name
          this.state.serverData.user.playlists.filter(playlist =>
            playlist.name
              .toLowerCase() //turn playlist name to lower case
              .includes(this.state.filterString.toLowerCase())
          )
        : []; //else return an empty array (no serverData)

    return (
      <div className="App">
        {/* check if there is user data in serverData before rendering React.Fragment*/}
        {this.state.serverData.user ? (
          <React.Fragment>
            <h1
              style={{
                ...defaultStyle,
                fontSize: "54px",
                fontWeight: "100"
              }}
            >
              {this.state.serverData.user.name}
              's Playlists
            </h1>
            {/* render only filtered playlist */}
            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter
              onFilterChange={query => this.setState({ filterString: query })}
            />
            {/* filter then render the playlists */}
            {playlistsToRender.map(playlist => (
              <Playlist playlist={playlist} />
            ))}
          </React.Fragment>
        ) : (
          // if there was no user data at start of ternary, render Sign in button instead
          <button
            onClick={() => (window.location = "http://localhost:8888/login")}
            style={{
              padding: "20px",
              marginTop: "60px",
              fontSize: 24,
              fontWeight: 100
            }}
          >
            Sign in with Spotify
          </button>
        )}
      </div>
    );
  }
}

export default App;
