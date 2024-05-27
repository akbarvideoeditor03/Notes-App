import {
    deleteNotes
} from '../../index.js';
class NoteItem extends HTMLElement {
    constructor() {
        super();

        this._note = {
            id: 0,
            title: 'NEED_TITLE',
            body: 'NEED_BODY',
            createdAt: 'NEED_DATE',
        };

        this._style = document.createElement('style');
    }

    setNote(value) {
        this._note['id'] = value.id;
        this._note['title'] = value.title;
        this._note['body'] = value.body;
        this._note['createdAt'] = value.createdAt;

        this.render();
    }

    connectedCallback() {
        this.render();
        this.querySelector('.button-remove').addEventListener('click', () => {
            const noteID = this._note.id;
            deleteNotes(noteID);
        });
    }

    updateStyle() {
        this._style.textContent = `
            note-item {
                padding: 1rem 0rem;
                border-radius: 5px;
                grid-auto-columns: repeat(auto-fit, minmax(min(100px, 100%), 1fr));
                grid-auto-row: auto;
            }

            .note__title {
                margin-block-start: 0;
                margin-block-end: 1rem;

                font-size: 1.5em;
                font-weight: bold;
                
            }

            .note__body {
                text-align: justify;
            }

            article {
                background-color: #F3F3F3;
            }

            .link {
                text-decoration: none;
                color: #EC9A02;
            }

            .link:hover{
                color: #976200;
            }

            .date {
                font-size: small;
                margin-bottom: 5%;
            }

            .button {
                padding: 8px;
                border-radius: 3px;
                border-style: none;
                font-weight: bold;
                color: white;
                margin-block-start: 10px;
                margin-block-end: 10px;
            }
            
            .button-remove {
                background-color: #e16954;
            }
            
            .button-remove:hover {
                background-color: #fa8570;
                box-shadow: 3px 3px 10px #ea2a088e;
                transition: all ease-in-out 300ms;
                position: relative;
                z-index: 1;
                bottom: 1px;
            }

            .body-notes {
                font-weight: bold;
                font-size: 120%;
            }

            .notelist-flex {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            
        `;
    }

    render() {
        this.updateStyle();
        this.setAttribute('id', this._note.id);
        this.innerHTML = `
            ${this._style.outerHTML}
            <article class="card notelist-flex">
                <section>
                    <div>
                        <h4 class="note__title">
                            <a href="#" class="link">${this._note.title}</a>
                        </h4>
                    </div>
                    <div class="date">
                        <p>${this._note.createdAt}</p>
                    </div>
                </section>
                <section>
                    <div class="note__body">
                    <p  class="body-notes"
                        style="overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;">${this._note.body}</p>
                    </div>
                </section>
                <section>
                    <div>
                        <button id="button-remove" type="button" class="button button-remove">Hapus</button>
                    </div>
                </section>
            </article>
        `;
    };
};

customElements.define('note-item', NoteItem);