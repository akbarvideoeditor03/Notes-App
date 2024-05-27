class FooterBar extends HTMLElement {
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
                background-color : #7B5713;
                box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
                color: white;
                padding: 24px 24px;
                text-align: center;
                font-weight: bold;
            }

            .apps-name {
                margin: 0px;
                font-size: 1.5em;
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
                <ion-icon name="list-box"></ion-icon>
                Notes App © 2024 | Ahmad Akbar - F4296YB073
            </div>
        `;
    }
}

customElements.define('footer-bar', FooterBar); 