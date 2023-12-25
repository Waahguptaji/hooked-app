import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromResponse } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useStateValue } from "./StateProvider";

const spotify = new SpotifyWebApi(); //creating a instance of webApi to use all the functionality of api.

function App() {
  //using context api, so we need not to prop drilling
  const [{ token }, dispatch] = useStateValue(); //dispatch is like a gun we shoot it to data layer in order to change and update data values to use that

  useEffect(
    () => {
      const hash = getTokenFromResponse(); //Here we getting the all tokken format.
      window.location.hash = ""; //We donot want to show our token for security reason so we will show empty.
      const _token = hash.access_token; //here we getting the token from the hash

      if (_token) {
        spotify.setAccessToken(_token); //here we are passing our token to spotify, so we can communicate back and forth between spotify and our react app.

        dispatch({
          type: "SET_TOKEN",
          token: _token,
        });

        spotify.getMe().then((user) => {
          dispatch({
            //Here we shoot it to context
            type: "SET_USER",
            user: user,
          });
        });

        spotify.getPlaylist("37i9dQZEVXcJHDZYl7Cri7").then((response) =>
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response,
          })
        );

        spotify.getMyTopArtists().then((response) =>
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          })
        );

        dispatch({
          type: "SET_SPOTIFY",
          spotify: spotify,
        });
      }

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          //Here we shoot it to context
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, dispatch]
  );

  return (
    <div className="App">
      {token ? (
        <Player
          spotify={
            spotify
          } /*Here we sending spotify object as a prop so that we need no do the token acces again*/
        />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
