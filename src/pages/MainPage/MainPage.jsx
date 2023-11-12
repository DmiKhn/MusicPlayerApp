import { useState } from "react";
import tracksList from "../../assets/trackList";
import style from "./mainPage.module.scss";
import Track from "../../components/Track/Track";
import { Input } from "@mui/material";

const runSearch = (query) => {
  if (!query) {
    return tracksList;
  }

  const lowerCaseQuery = query.toLowerCase();

  return tracksList.filter((track) =>
    track.title.toLowerCase().includes(lowerCaseQuery) ||
    track.artist.toLowerCase().includes(lowerCaseQuery)
    )
}

const MainPage = () => {
  const [tracks, setTracks] = useState(tracksList);
  const handleChange = (event) => {
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  }

  return (
    <div className={style.search}>
      <Input
        className={style.Input}
        placeholder="Search track"
        onChange={handleChange}
      />
      <div className={style.list}>
        {tracks.map((track) => {
          return <Track key={track.id} {...track}/>
        })}
      </div>
    </div>
  )
}

export default MainPage;