import axios from "axios";
import mock from "./newest.mock";
import { ResponseData } from "./anime.types";

// Flag per abilitare la modalità mock (esempio: da variabile di ambiente)
const isMockMode = import.meta.env.VITE_USE_MOCK === "true";

export async function getNewest(payload: { page: number, limit: number }): Promise<ResponseData> {

    if (isMockMode) {
        console.log("Modalità Mock attiva. Restituisco dati mock.");
        return new Promise((resolve) => setTimeout(() => resolve(mock), 1000));
    }

    try {
        // Chiamata al servizio tramite Axios
        const response = await axios.get<ResponseData>(`/api/anime?offset=${payload.page}&size=${payload.limit}`);

        // Estrazione dei tipi e ritorno dei dati
        const dataWithTypes = { ...response.data };

        return dataWithTypes;
    } catch (error) {
        console.error("Errore durante la chiamata al servizio, uso mock:", error);

        throw new Error(<string>error)
    }
}

export async function getReferences(payload: { ids: Array<string> }): Promise<ResponseData> {

    if (isMockMode) {
        console.log("Modalità Mock attiva. Restituisco dati mock.");
        return new Promise((resolve) => setTimeout(() => resolve(mock), 1000));
    }

    try {
        // Chiamata al servizio tramite Axios
        const response = await axios.post<ResponseData>(
            `/api/anime`,
            { ids: payload.ids }
        );

        // Estrazione dei tipi e ritorno dei dati
        const dataWithTypes = { ...response.data };

        return dataWithTypes;
    } catch (error) {
        console.error("Errore durante la chiamata al servizio, uso mock:", error);

        throw new Error(<string>error)
    }
}

