class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <header>
                <h2>Notes App</h2>
            </header>
        `;
  }
}

customElements.define('app-bar', AppBar);
