import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { Pause } from "@mui/icons-material";
import secondsToMinutes from "../../utils/secondsToMinutes";
import cn from "classnames";

const Track = (track) => {
  const {id, src, preview, title, artist, duration} = track;

  const { handleToggleAudio, currentTrack, isPlaying } = useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === track.id;

  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
       {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt=""></img>
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artist}</p>
      </div>
      <p>{secondsToMinutes(duration)}</p>
    </div>
  )
}

export default Track;