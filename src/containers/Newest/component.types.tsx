import { History } from "@/store/pageLanding";
import { STATUS as STATUS_NEWEST } from "@/store/containerNewest";
import { Reference } from "@/store/containerMyList";
import { Item as NewestItem } from "@/services/anime.types";

export interface ComponentProps {
    state: {
        pageLanding: {
            history: History[];
        },
        containerNewest: {
            occurrences: Array<NewestItem>;
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            types: string[];
            status: STATUS_NEWEST;
            error: any;
        },
        containerMyList: {
            references: Array<Reference>
        }
    };
    actions: {
        pageLanding: {
            clearHistory: Function;
        },
        containerNewest: {
            doGetNewest: Function;
            setDialogOpenId: Function;
        },
        containerMyList: {
            addReference: Function;
        }
    };
}