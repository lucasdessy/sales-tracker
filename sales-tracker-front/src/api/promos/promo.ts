export interface IPromo  {
  _id: string;
  nome: string;
  data_validade: Date;
  id_produto: string;
  tipo: {
    tipo: string;
    valor: string;
    quantidade: string;
  }
}
