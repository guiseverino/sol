export interface Cliente {
    id: number; 
    cnpj: string;
    razao_social: string;
    email: string;
    cep: string;
    logradouro: string;
    complemento: string;
    municipio: string;
    uf: string;
    faturamento: number;
    site: string;
    ddd: string;
    telefone: string;
    image: FileList; 
}

export const ClienteStore = writable<Cliente[]>([]);
