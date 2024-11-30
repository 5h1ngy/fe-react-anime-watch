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

export async function getNewest(): Promise<ResponseData> {
    return await new Promise((resolve, _reject) => setTimeout(() => resolve({ ...mock, types: extractTypes(mock.data) }), 1000));
}