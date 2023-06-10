import { Rectangle } from "./rectangle";

export class Property{
    type: string;
    address: string;
    rooms: number;
    area: number;
    owner: string;
    layout: Rectangle[];
    doors: Rectangle[];
    id: number;
    _id: string;
}