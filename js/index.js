import { renderPlaylist } from "./helpers.js";

import s from "../main.js";

const playlistContainerEl = document.querySelector("#js-playlist-list");

document.querySelector("#js-seach-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const genre = event.target.querySelector("#genre").value;
  s.searchPlaylists(genre)
    .then((data) => {
      const playlists = data.playlists.items;
      console.log(playlists);

      playlistContainerEl.innerHTML = "";

      playlists.forEach((playlist) => {
        playlistContainerEl.innerHTML += renderPlaylist({
          title: playlist.name,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
