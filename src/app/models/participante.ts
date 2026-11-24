export type FormaPagamento = 'pix' | 'cartao' | 'boleto' | 'dinheiro' | '';

export interface Participante {
  id: number;
  eventoId: number;
  descricao: string;          // nome de quem vai ao evento
  email: string;
  telefone: string;           // guardado so com digitos: 71988887777
  formaPagamento: FormaPagamento;
}
