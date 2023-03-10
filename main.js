import Spotify from "spotify-web-api-js";

import {
  getAccessToken,
  loginSpotifyUser,
  logOut,
  manageUserSessssion,
} from "./js/session.js";

const loginBtnEl = document.querySelector("#js-login-btn");
const logOutBtnEl = document.querySelector("#js-logout-btn");

// NOTE: We use this lib to create a Spotify instance. It makes it easier to work with the Spotify API.
const s = new Spotify();

manageUserSessssion();

// NOTE: We get the access token for the client from the callback URI issued when user logs into spotify.

// @alias accessToken
const isLoggedIn = getAccessToken();

if (isLoggedIn) {
  s.setAccessToken(isLoggedIn);
  loginBtnEl.classList.add("is-hidden");

  logOutBtnEl.addEventListener("click", logOut);
} else {
  loginBtnEl.classList.remove("is-hidden");

  loginBtnEl.addEventListener("click", loginSpotifyUser);
}

export default s;
