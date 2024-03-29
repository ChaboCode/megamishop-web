export interface INewProduct {
    name: string
    price: number
    stock: number
    image: File
    imageURL: string
    desc: string  // Description
    discount: number
    rarity: string
    colors: string[] | undefined
}

export interface IProductState {
    id: number
    name: string
    price: number
    stock: number
    images: number
    desc: string  // Description
    rarity: string
    colors: string[] | undefined
    //TODO: Add discount field
}

export interface IProductCardState {
    id: number
    name: string
    price: number
    stock: number
}

export interface ProductViewParams {
    product: IProductState | undefined | null;
}
