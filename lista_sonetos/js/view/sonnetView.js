export class SonnetView {
    constructor() {
        this.selectElement = document.getElementById('sonnet-select');
        this.displayContainer = document.getElementById('sonnet-display');
    }

    // Poblar el selector con la lista de opciones
    populateSelector(sonnetFiles) {
        sonnetFiles.forEach(sonnet => {
            const option = document.createElement('option');
            option.value = sonnet.id;
            
            // Mostramos el ID formateado como nombre de opción inicial, si no encuentra el titulo
            option.textContent = sonnet.id;
            this.selectElement.appendChild(option);
        });
    }

    // Actualizar el texto del selector con el título real tras parsearlo
    updateOptionTitle(id, title) {
        const option = this.selectElement.querySelector(`option[value="${id}"]`);
        if (option) {
            option.textContent = title;
        }
    }

    bindSelectSonnet(handler) {
        this.selectElement.addEventListener('change', (event) => {
            const selectedId = event.target.value;
            handler(selectedId);
        });
    }

    showLoading() {
        this.displayContainer.innerHTML = '<p class="poem-card__placeholder">Cargando soneto...</p>';
    }

    showError(message) {
        this.displayContainer.innerHTML = `<p class="poem-card__placeholder" style="color: var(--color-accent);">${message}</p>`;
    }

    // Renderizado en el DOM
    renderSonnet(sonnet) {
        if (!sonnet) return;

        this.displayContainer.innerHTML = '';

        const titleEl = document.createElement('h2');
        titleEl.className = 'poem-card__title';
        titleEl.textContent = sonnet.title;

        const authorEl = document.createElement('p');
        authorEl.className = 'poem-card__author';
        authorEl.textContent = sonnet.author;

        this.displayContainer.appendChild(titleEl);
        this.displayContainer.appendChild(authorEl);

        sonnet.stanzas.forEach(stanzaVerses => {
            const stanzaEl = document.createElement('section');
            stanzaEl.className = 'stanza';

            stanzaVerses.forEach(verseText => {
                const verseEl = document.createElement('p');
                verseEl.className = 'verse';
                verseEl.textContent = verseText;
                stanzaEl.appendChild(verseEl);
            });

            this.displayContainer.appendChild(stanzaEl);
        });
    }
}