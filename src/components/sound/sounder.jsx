import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Sound from "react-sound";
import AddIcon from "@material-ui/icons/Add"
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'


const Sounder = props => {
  const { classes, player, mute } = props;
  return (
    <div>
      <Button onClick={ mute } > <VolumeOffIcon /> </Button>
      <Button onClick={ mute } > <VolumeUpIcon/> </Button>
      <Sound url={player} playStatus={Sound.status.PLAYING} loop="true" />
    </div>
  );
};

export default Sounder;
