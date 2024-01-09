import styled from "styled-components";
import React, { useEffect } from "react";
import { useStateValue } from "../utils/StateProvider";
import axios from "axios";
function CurrentlyPlaying() {
  const [{ token, currentlyPlaying }, dispatch] = useStateValue();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: "SET_PLAYING", currentlyPlaying: currentlyPlaying });
      }
    };
    getCurrentTrack();
  }, [dispatch, token, currentlyPlaying]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <img
            className="track__albumLogo"
            src={currentlyPlaying.image}
            alt={currentlyPlaying.name}
          />
          {currentlyPlaying ? (
            <div className="track__songInfo">
              <h4>{currentlyPlaying.name}</h4>
              <h6>{currentlyPlaying.artists.join(", ")}</h6>
            </div>
          ) : (
            <div className="track__songInfo">
              <h4>No song is playing</h4>
              <h6>...</h6>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    .track__songInfo {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h6 {
        color: #b3b3b3;
      }
    }
  }
`;
export default CurrentlyPlaying;
