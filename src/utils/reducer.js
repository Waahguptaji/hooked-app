export const initialState = {
  token: null,
  userinfo: null,
  playlists: [],
  selectedPlaylistId: "37i9dQZF1EQnqst5TRi17F",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
};

const reducer = (state, action) => {
  //Action -> type, [payload]

  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_USER":
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case "SET_PLAYLIST":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case "SET_PLAYLIST_ID":
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };

    case "SET_PLAYING":
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };

    case "SET_PLAYER_STATE":
      return {
        ...state,
        playerState: action.playerState,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    default:
      return state;
  }
};

export default reducer;
