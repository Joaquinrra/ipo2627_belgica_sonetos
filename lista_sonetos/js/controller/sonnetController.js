export class SonnetController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        // 1. Mostrar de inmediato las opciones en el selector para evitar que quede vacío
        const availableSonnets = this.model.getAvailableSonnets();
        this.view.populateSelector(availableSonnets);

        // 2. Vincular el evento de selección
        this.view.bindSelectSonnet(this.handleSelectSonnet.bind(this));

        // 3. Intentar actualizar los títulos reales en segundo plano (sin bloquear la interfaz)
        this.preloadTitles(availableSonnets);
    }



    async preloadTitles(sonnets) {
        for (const sonnetInfo of sonnets) {
            try {
                const loaded = await this.model.loadSonnet(sonnetInfo.id);
                this.view.updateOptionTitle(sonnetInfo.id, `${loaded.title} — ${loaded.author}`);
            } catch (error) {
                console.warn(`Aviso: No se pudo precargar el título de '${sonnetInfo.id}'. Verifica la ruta del archivo.`, error);
            }
        }
    }


    
    async handleSelectSonnet(id) {
        this.view.showLoading();
        try {
            const sonnet = await this.model.loadSonnet(id);
            this.view.renderSonnet(sonnet);
        } catch (error) {
            this.view.showError(`Error al cargar el soneto: ${error.message}`);
            console.error("Detalle del error:", error);
        }
    }
}