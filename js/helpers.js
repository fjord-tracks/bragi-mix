/*
============================================
Helper functions
https://github.com/S3ak/fed-javascript1-api-calls/blob/main/examples/games.html#L154
============================================
*/

// TODO: Create a function that renders the playlists
export function renderPlaylist({ title = "No title" }) {
  return `
    <div class="c-card">
      <h3>${title}</h3>
    </div>
  `;
}

export function hideProtectedContent(isLoggedIn) {
  const protectedContent = document.querySelectorAll("[data-is-protected]");

  if (isLoggedIn) {
    protectedContent.forEach((content) => {
      content.classList.remove("is-hidden");
    });

    return;
  }

  protectedContent.forEach((content) => {
    content.classList.add("is-hidden");
  });
}
