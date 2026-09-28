export class SonnetModel {
    constructor() {
        // Lista de sonetos, con id y ruta donde está el archivo.
        this.sonnetFiles = [
            {   id: "eraseUnHombre", 
                file: "./lista-sonetos/eraseUnHombre.md"
            },{
                id: "escritoEstaEnMiAlma", 
                file: "./lista-sonetos/escritoEstaEnMiAlma.md"
            },{
                id: "mientrasPorCompetir", 
                file: "./lista-sonetos/mientrasPorCompetir.md"
            },{
                id: "mireLosMuros", 
                file: "./lista-sonetos/mireLosMuros.md"
            },{
                id: "unSonetoMeManda", 
                file: "./lista-sonetos/unSonetoMeManda.md"
            }
        ];
    }


    // Retorna la lista de sonetos disponibles para llenar el select inmediatamente
    getAvailableSonnets() {
        return this.sonnetFiles;
    }


    // Carga asíncronamente y procesa el archivo .md solicitado
    async loadSonnet(id) {

        const fileInfo = this.sonnetFiles.find(item => item.id === id);
        if (!fileInfo) throw new Error("Soneto no encontrado en el registro");

        const response = await fetch(fileInfo.file);
        if (!response.ok) {
            throw new Error(`No se pudo acceder a '${fileInfo.file}' (Status: ${response.status})`);
        }
        
        const rawText = await response.text();
        return this._parseSonnetText(id, rawText);
    }





    // Parsea el contenido del soneto
    _parseSonnetText(id, rawText) {
        const lines = rawText.split(/\r?\n/);
        
        let title = "";
        let author = "";
        let poemLines = [];
        let isPoemSection = false;

        // Para cada linea
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (trimmed.toLowerCase().startsWith('titulo:')) {
                title = trimmed.substring(7).replace(/"/g, '').trim();
            } else if (trimmed.toLowerCase().startsWith('autor:')) {
                author = trimmed.substring(6).replace(/"/g, '').trim();
            } else if (trimmed.toLowerCase() === 'soneto') {
                isPoemSection = true;
            } else if (isPoemSection) {
                poemLines.push(line);
            }
        }

        // Agrupar los versos en estrofas separadas por líneas en blanco
        const stanzas = [];
        let currentStanza = [];

        poemLines.forEach(line => {
            if (line.trim() === '') {
                if (currentStanza.length > 0) {
                    stanzas.push(currentStanza);
                    currentStanza = [];
                }
            } else {
                currentStanza.push(line.trim());
            }
        });

        if (currentStanza.length > 0) {
            stanzas.push(currentStanza);
        }


        return {
            id,
            title: title || id,
            author: author || "Anónimo",
            stanzas
        };
    }
}