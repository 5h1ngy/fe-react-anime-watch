import axios from "axios";
import mock from "./newest.mock";
import { ResponseData, Item } from "./newest.types";

function extractTypes(data: Item[]): string[] {
    // Usa un Set per evitare duplicati
    const typesSet = new Set<string>();

    data.forEach((item) => {
        if (item.type) {
            typesSet.add(item.type);
        }
    });

    // Converte il Set in un array
    return Array.from(typesSet);
}

// Flag per abilitare la modalità mock (esempio: da variabile di ambiente)
const isMockMode = import.meta.env.VITE_USE_MOCK === "true";

export async function getNewest(payload: { page: number, limit: number }): Promise<ResponseData> {

    if (isMockMode) {
        console.log("Modalità Mock attiva. Restituisco dati mock.");
        return new Promise((resolve) =>
            setTimeout(() => resolve({ ...mock, types: extractTypes(mock.occurrences) }), 1000)
        );
    }

    try {
        // Chiamata al servizio tramite Axios
        const response = await axios.get<ResponseData>(`/api/anime/newest?offset=${payload.page}&size=${payload.limit}`);

        // Estrazione dei tipi e ritorno dei dati
        const dataWithTypes = {
            ...response.data,
            types: extractTypes(response.data.occurrences),
        };

        return dataWithTypes;
    } catch (error) {
        console.error("Errore durante la chiamata al servizio, uso mock:", error);

        // Fallback ai dati mock in caso di errore
        return {
            ...mock,
            types: extractTypes(mock.occurrences),
        };
    }
}
