import React, { useEffect, useState } from "react";
import { useStateValue } from "../utils/StateProvider";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Grid, Slider } from "@mui/material";
import styled from "styled-components";
import CurrentlyPlaying from "./CurrentlyPlaying";
import PlayerControls from "./PlayerControls";
import VolumeControl from "./VolumeControl";

function Footer() {
  return (
    <Container>
      <CurrentlyPlaying />
      <PlayerControls />
      <VolumeControl />
    </Container>
  );
}

const Container = styled.div`
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  padding: 0 1rem;
`;
export default Footer;
