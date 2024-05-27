class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();
        this._shadowRoot = this.attachShadow( { mode: 'open' } );
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host{
                display: block;
                width: 100%
            }
            
            div {
                background-image: url(/src/public/flat-lay-notebook-with-list-desk.svg);
                background-position: 0% 25%;
                background-size: cover;
                box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
                color: white;
                padding: 24px 24px;
            }

            .apps-name {
                margin: 0px;
                font-size: 2.5em;
            }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div>
                <h2>Notes App <ion-icon name="list-box" size="large"></ion-icon></h2>
            </div>
        `;
    }
}

customElements.define('app-bar', AppBar);