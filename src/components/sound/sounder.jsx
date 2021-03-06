import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Sound from "react-sound";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";

const Sounder = props => {
  const { classes, player, toggleMusic, playing, delay } = props;
  console.log(player);
  return (
    <div>
      {playing == false ? (
        <Button onClick={toggleMusic}>
          <VolumeOffIcon />
        </Button>
      ) : (
        <div>
          <Button onClick={toggleMusic}>
            <VolumeUpIcon />
          </Button>
          <Sound url={player} playStatus={Sound.status.PLAYING} playFromPosition={delay}/>
        </div>
      )}
    </div>
  );
};

export default Sounder;
