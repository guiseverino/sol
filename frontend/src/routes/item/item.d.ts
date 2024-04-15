export interface Item {
    id: number; 
    nome_item: string;
    descricao_item: string;
}

export const ItemStore = writable<Item[]>([]);
