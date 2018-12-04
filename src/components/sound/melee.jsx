import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Sound from "react-sound";

class Melee extends Component {
  constructor(props) {
    super(props);
    this.toggleSound = this.toggleSound.bind(this);
  }

  state = {
    playing: false
  };

  toggleSound = () => {
    if (this.state.playing == false) {
      this.state.playing = true;
    } else {
      this.state.playing = false;
    }
  };

  render() {
    return (
      <Sound
        url="./melee.mp3"
        playStatus={Sound.status.PLAYING}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
  }
}

export default Melee;
