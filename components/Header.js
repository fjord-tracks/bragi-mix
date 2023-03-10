class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .is-active {
          color: green;
        }
      </style>
      <div class="u-row c-nav-controls">
        <h1><slot></slot></h1>
        <div class="u-row">
          <nav>
            <a href="/">Home</a>
            <a href="/randomizer">Randomizer</a>
          </nav>

          <button id="js-logout-btn" data-is-protected="true">Log out</button>
        </div>
      </div>
    `;

    const currentUrl = window.location.pathname;

    const links = this.shadowRoot.querySelectorAll("a");

    links.forEach((link) => {
      if (currentUrl.includes(link.pathname) && link.pathname !== "/") {
        link.classList.add("is-active");
        return;
      }
    });
  }
}

customElements.define("custom-header", Header);
