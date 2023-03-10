import { hideProtectedContent } from "./helpers.js";

const ACCESS_TOKEN_KEY = "access_token";

export const getAccessToken = () => {
  let token = null;

  const cachedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  const currentSessionToken = new URLSearchParams(
    window.location.hash.replace("#", "")
  ).get(ACCESS_TOKEN_KEY);

  if (cachedAccessToken) {
    token = cachedAccessToken;
  }

  if (currentSessionToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, currentSessionToken);
    window.location.hash = "";
    token = currentSessionToken;
  }

  return token;
};

export const checkIfUserIsLoggedIn = () => !!getAccessToken();

export const manageUserSessssion = () => {
  const userIsLoggedIn = checkIfUserIsLoggedIn();

  hideProtectedContent(userIsLoggedIn);

  if (!userIsLoggedIn) {
    window.location.href = "/login.html";
  }
};

export async function loginSpotifyUser() {
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

export function logOut() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.location.replace("/login.html");
}
