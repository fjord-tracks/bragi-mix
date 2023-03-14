import { loginSpotifyUser } from "./session.js";

/*
============================================
Login page specfic code
============================================
*/

const loginBtnEl = document.querySelector("#js-login-btn");

loginBtnEl.addEventListener("click", loginSpotifyUser);
