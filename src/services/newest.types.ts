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
    image: Image;
    tags: Tag[];
}

// Define the ResponseData interface
export interface ResponseData {
    data: Item[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
