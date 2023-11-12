import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import secondsToMinutes from "../../utils/secondsToMinutes";

const TimeControls = () => {
  const {audio, currentTrack} = useContext(AudioContext);
  const {duration} = currentTrack;
  const [currentTime, setCurrentTime] = useState(0);
  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const handleChangeCurrentTime = (_, value) => {
    const time = Math.round(value / 100 * duration);

    setCurrentTime(time);
    audio.currentTime = time;
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime)
    }, 1000);

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  console.log("TimeControls");

  return (
    <>
      <p>{secondsToMinutes(currentTime)}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  )
}

const Playbar = () => {
  const {currentTrack, handleToggleAudio, isPlaying} = useContext(AudioContext);
  const {title, artist, preview, duration } = currentTrack;

  console.log("Playbar");

  return <div className={style.playbar}>
    <img className={style.preview} src={preview} alt="" />
    <IconButton onClick={() => handleToggleAudio(currentTrack)}>
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>
    <div className={style.credits}>
      <h4>{title}</h4>
      <p>{artist}</p>
    </div>
    <div className={style.slider}>
      <TimeControls />
      <p>{secondsToMinutes(duration)}</p>
    </div>
  </div>;
}

export default Playbar;