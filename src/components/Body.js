import styled from "styled-components";
import { useStateValue } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { duration } from "@mui/material";

function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateValue();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.images[0].url,
        description: response.data.description.startsWith("<a")
          ? " "
          : response.data.description, //If it gives an anchor tag than pass a empty string otherwise pass description
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          album: track.album.name,
          image: track.album.images[2].url,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: "SET_PLAYLIST", selectedPlaylist: selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinAndSec = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playtrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status == 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: "SET_PLAYING", currentlyPlaying: currentlyPlaying });
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else {
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    }
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selectedplaylist" />
            </div>
            <div className="details">
              <span className="type">PlAYLIST</span>
              <h1 className="title"> {selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header__row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playtrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span> {index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="img">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name"> {name}</span>
                          <span> {artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span> {album}</span>
                      </div>
                      <div className="col">
                        <span> {msToMinAndSec(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header__row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "rgba(0,0,0,0.7)" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          cursor: pointer;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
export default Body;
