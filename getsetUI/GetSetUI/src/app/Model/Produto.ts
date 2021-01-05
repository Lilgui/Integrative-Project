import { Categoria} from './Categoria'
//colocar data
export class Produto {
    public id: number;
    public nome: string;
    public descricao: string;
    public imagem: string;
    public preco: number;
    public estoque: number;
    public categoria: Categoria;
}