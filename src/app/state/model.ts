import {ID} from '@datorama/akita';

export interface List{
    id: ID;
    name: string;
    date: number | Date;
    items: Item[];
}

export interface Item{
    id: ID;
    label: string;
    quantity: number;
    purchased: boolean;
}