export interface Fornecedor {
    id: number; 
    cnpj: string;
    razao_social: string;
    email: string;
    cep: string;
    logradouro: string;
    complemento: string;
    municipio: string;
    uf: string;
    ddd: string;
    telefone: string;
}

export const FornecedorStore = writable<Fornecedor[]>([]);
