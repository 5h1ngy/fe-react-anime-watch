import mock from "./newest.mock";
import { ResponseData } from "./newest.types";

export async function getNewest(): Promise<ResponseData> {
    return await new Promise((resolve, _reject) => setTimeout(() => resolve(mock), 1000));
}