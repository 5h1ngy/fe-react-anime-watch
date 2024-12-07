// Define the Tag interface
export interface Tag {
    id: string;
    label: string;
}

// Define the Image interface
export interface Image {
    id: string;
    thumbnail: string;
}

// Define the Item interface
export interface Item {
    id: string;
    title: string;
    type: string;
    episodes: number;
    season: string | null;
    year_start: number | null;
    year_end: number | null;
    image: Image;
    tags: Tag[];
    description: string | null;
}

// Define the ResponseData interface
export interface ResponseData {
    occurrence: Item;
}
