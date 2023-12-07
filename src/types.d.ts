import exp from "constants";

export interface UserType {
    id: number;
    email: string;
    password: string;
}

export interface ProductType {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface OrderType {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
}