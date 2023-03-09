import Spotify from "spotify-web-api-js";
// import Spotify from "../node_modules/spotify-web-api-js/src/typings/spotify-web-api";

const generateBtn = document.querySelector("#js-gnrt-btn");
const resultHolder = document.querySelector("#js-res-holder");
const yearInput = document.querySelector("#js-yr-input");
console.log(resultHolder);

generateBtn.addEventListener("click", () => {
  randomizer(yearInput.value);
});

const accessToken = localStorage.getItem("access_token");
console.log(accessToken);

const dataBase = new Spotify();
console.log(dataBase);
// const accessToken = new URLSearchParams(
//   window.location.hash.replace("#", "")
// ).get("access_token");

// First get a list of songs from the country (Norway).
// From the list pick a random song and get the id
// get the song URI using the Id https://jmperezperez.com/spotify-web-api-js/#src-spotify-web-api.js-constr.prototype.gettrack

function randomizer(yrInput = 0) {
  // randNum>> a random number between 0 and 19. replace 19 with response limit
  resultHolder.innerHTML = "";
  const randNum = Math.floor(Math.random() * 20);
  console.log(randNum);
  //  Problem: the URI is unique for each song, so rand number wont work here.
  // we need to first get a catalog back and then use the rand number. but how?
  // dataBase.getCategories().then((tracks) => {
  //   console.log(tracks);
  // });
  resultHolder.innerHTML = `
  <h3>rand.nr: ${randNum}. Year input: ${yrInput}</h3>
  `;
  console.log(resultHolder);
}