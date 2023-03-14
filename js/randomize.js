import s from "../main.js";

import { GENRES } from "./constants.js";

const generateBtn = document.querySelector("#js-gnrt-btn");
const resultHolder = document.querySelector("#js-res-holder");
// const resultHolder2 = document.querySelector("#js-res-holder-2");
// const songPreview = document.querySelector("#js-iframe");
const countryInp = document.querySelector("#js-country-input");
const yearCalInput = document.querySelector("#js-yr-cal-input");
const genreInput = document.querySelector("#js-genre-input");
const genresList = document.querySelector("#js-genres-list");
// const srchTypeInp = document.querySelector("#js-search-type-input");

let selectedYear = "1950";
let selectedGenre = "jazz";
// let market = "NO";
let srchQ = `year:${selectedYear} genre:${selectedGenre}`;
// let srchQ = `isrc:${market} year:${selectedYear} genre:${selectedGenre}`;

genresList.innerHTML = GENRES.map(
  (genre) => `<option value=${genre}>${genre}</option>`
);

yearCalInput.addEventListener("change", (event) => {
  selectedYear = event.target.value.substring(0, 4);
  srchQ = `year:${selectedYear} genre:${selectedGenre}`;
});

genreInput.addEventListener("change", (event) => {
  selectedGenre = event.target.value;
  srchQ = `isrc:JP year:${selectedYear} genre:${selectedGenre}`;
});

// countryInp.addEventListener("change", (event) => {
//   market = event.target.value;
//   srchQ = `isrc:${market} year:${selectedYear} genre:${selectedGenre}`;
// });

generateBtn.addEventListener("click", getSong);

const resultLmt = 50;
// const searchType = ["track"];
const optns = {
  limit: resultLmt,
  market: countryInp.value,
  safeSearch: true,
};

function getSong() {
  const randNum = Math.floor(Math.random() * (resultLmt - 1));

  s.searchTracks(srchQ, optns).then((data) => {
    console.log(data);

    if (data.tracks.items.length === 0) {
      resultHolder.innerHTML = `
      <h2>There were no ${selectedGenre} in ${selectedYear}'s</h2>
      <h4>Please select another genre or year</h4>
      `;
      return;
    }

    const item = data.tracks.items[randNum];
    const song = item.preview_url;
    console.log(song);

    console.log(item.album.images[0].url);

    resultHolder.innerHTML = `
    <img src="${item.album.images[0].url}" alt="pix">
    <audio class="audio-player" controls id="js-song-preview-container">
      <source src="${song}" id="js-song-preview" type="audio/mpeg">
    </audio>
    <h3>${item.name} - ${item.artists[0].name}</h3>
    <h5>ID: ${randNum}</h5>
    <a href="${item.uri}">Open on Spotify</a>
    `;
  });

  // s.search(srchQ, searchType, optns).then((data) => {
  //   console.log(data);
  //   const item = data.tracks.items[randNum];

  //   resultHolder2.innerHTML = `
  //   <h3>${item.name} - ${item.artists[0].name}</h3>
  //   <h5>ID: ${randNum}</h5>
  //   <a href="${item.uri}">Open on Spotify</a>
  //   `;
  // });
}

// First get a list of songs from the country (Norway).
// From the list pick a random song and get the id
// get the song URI using the Id https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.gettrack
// https://api.spotify.com/v1/search?q=year:YEAR&type=track&limit=50&offset=OFFSET
