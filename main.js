import Spotify from "spotify-web-api-js";

const playlistContainerEl = document.querySelector("#js-playlist-list");

// NOTE: We use this lib to create a Spotify instance.
const s = new Spotify();

// NOTE: We get the access token for the client from the callback URI issued when user logs into spotify.
const accessToken = new URLSearchParams(
  window.location.hash.replace("#", "")
).get("access_token");

if (accessToken) {
  // TODO: Hide login button
  s.setAccessToken(accessToken);
} else {
  // TODO: Show login button
}

// TODO: Add event listener to login button only if user is not logged in
document.querySelector("#js-login-btn").addEventListener("click", () => {
  loginSpotifyUser(s.setAccessToken);
});

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
