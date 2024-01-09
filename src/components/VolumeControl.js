import React from "react";
import styled from "styled-components";
import { Grid, Slider } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { useStateValue } from "../utils/StateProvider";
import axios from "axios";

function VolumeControl() {
  const [{ token }] = useStateValue();

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDownIcon />
        </Grid>
        <Grid item xs>
          <Slider
            min={0}
            max={100}
            onChange={(e) => setVolume(e)}
            className="slider"
            aria-labelledby="continuous-slider"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  flex: 0.3;
  .slider {
    color: green;
  }
`;
export default VolumeControl;
