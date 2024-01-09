import React from "react";
import styled from "styled-components";
import { useStateValue } from "../utils/StateProvider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import axios from "axios";

function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateValue();

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: "SET_PLAYING", currentlyPlaying: currentlyPlaying });
    } else {
      dispatch({ type: "SET_PLAYING", currentlyPlaying: null });
    }
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SET_PLAYER_STATE", playerState: !playerState }); //if play then pause and vice versa
  };
  return (
    <Container>
      <div className="shuffle">
        <ShuffleIcon />
      </div>
      <div className="previous">
        <SkipPreviousIcon
          onClick={() => changeTrack("previous")}
          className="footer__icon"
        />
      </div>
      <div className="state">
        {playerState ? (
          <PauseCircleOutlineIcon
            onClick={changeState}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={changeState}
            fontSize="large"
            className="footer__icon"
          />
        )}
      </div>
      <div className="next">
        <SkipNextIcon
          onClick={() => changeTrack("next")}
          className="footer__icon"
        />
      </div>
      <div className="repeat">
        <RepeatIcon className="footer__green" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg {
      color: #b3b3b3;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
    .state {
      svg {
        color: white;
      }
    }

    .previous,
    .next,
    .state {
      font-size: 2rem;
    }
  }
`;
export default PlayerControls;
