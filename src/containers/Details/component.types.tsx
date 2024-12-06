import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerDetails";
import { Item } from "@/services/details.types";

export interface ComponentProps {
    state: {
        pageLanding: {
            history: History[];
        },
        containerDetails: {
            occurrence: Item | null,
            status: STATUS,
            error: any,
        },
    };
    actions: {
        pageLanding: {
            clearHistory: Function;
        }
    };
}