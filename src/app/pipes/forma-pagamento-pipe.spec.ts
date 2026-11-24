import { FormaPagamentoPipe } from './forma-pagamento-pipe';

describe('FormaPagamentoPipe', () => {
  const pipe = new FormaPagamentoPipe();

  it('pix', () => {
    expect(pipe.transform('pix')).toBe('Pix');
  });

  it('cartao', () => {
    expect(pipe.transform('cartao')).toBe('Cartão de crédito');
  });

  it('boleto', () => {
    expect(pipe.transform('boleto')).toBe('Boleto');
  });

  it('dinheiro', () => {
    expect(pipe.transform('dinheiro')).toBe('Dinheiro');
  });

  it('vazio devolve Nao informado', () => {
    expect(pipe.transform('')).toBe('Não informado');
  });

  it('null devolve Nao informado', () => {
    expect(pipe.transform(null)).toBe('Não informado');
  });
});
