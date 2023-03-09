import Spotify from "spotify-web-api-js";

const playlistContainerEl = document.querySelector("#js-playlist-list");
const loginContainerEl = document.querySelector("#js-login-holder");
const randNavContainerEl = document.querySelector("#js-rand-nav-holder");

// NOTE: We use this lib to create a Spotify instance.
const s = new Spotify();

// NOTE: We get the access token for the client from the callback URI issued when user logs into spotify.
let cachedAccessToken = localStorage.getItem("access_token");

const accessToken =
  cachedAccessToken ??
  new URLSearchParams(window.location.hash.replace("#", "")).get(
    "access_token"
  );

if (accessToken) {
  cachedAccessToken = localStorage.setItem("access_token", accessToken);

  s.setAccessToken(accessToken);
  loginContainerEl.classList.add("is-hidden");
  randNavContainerEl.innerHTML = `
  <a href="/randSong.html">randomizer</a>
  <a href="">playlists</a>
  <button id="js-rand-btn" class="btn">randomize</button>
  `;
} else {
  loginContainerEl.classList.remove("is-hidden");
}

const randBtn = document.querySelector("#js-rand-btn");
console.log(randBtn);

// randBtn.addEventListener("click", () => {
//   randomizer();
// });

// TODO: Add event listener to login button only if user is not logged in
document.querySelector("#js-login-btn").addEventListener("click", () => {
  // ???calling a function with a arg that is never used. func does not take an arg???
  loginSpotifyUser(s.setAccessToken);
});

document.querySelector("#js-seach-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const genre = event.target.querySelector("#genre").value;
  // s.searchPlaylists("NO", "market")
  s.searchPlaylists(genre)
    .then((data) => {
      const playlists = data.playlists.items;
      console.log(playlists);
      // console.log(data);

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

async function loginSpotifyUser() {
  // NOTE: We need to request authorization from the user to access their data.
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  authUrl.searchParams.set("response_type", "token");
  authUrl.searchParams.set("client_id", import.meta.env.VITE_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", import.meta.env.VITE_CALLBACK_URL);
  authUrl.searchParams.set("scope", "user-read-private user-read-email");
  // REMOVE THIS IN PRODUCTION
  authUrl.searchParams.set("show_dialog", "true");

  try {
    window.location.replace(authUrl);
  } catch (error) {
    console.log(error);
  }
}

// TODO: Create a function that renders the playlists
function renderPlaylist({ title = "No title" }) {
  return `
    <div class="c-card">
      <h3>${title}</h3>
    </div>
  `;
}
