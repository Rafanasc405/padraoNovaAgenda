import { IniciaisPipe } from './iniciais-pipe';

describe('IniciaisPipe', () => {
  const pipe = new IniciaisPipe();

  it('primeiro e ultimo nome', () => {
    expect(pipe.transform('Maria da Silva Santos')).toBe('MS');
  });

  it('espacos sobrando e minusculas', () => {
    expect(pipe.transform('  joão   guedes de brito ')).toBe('JB');
  });

  it('um nome so', () => {
    expect(pipe.transform('Ana')).toBe('A');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('so espacos devolve vazio', () => {
    expect(pipe.transform('   ')).toBe('');
  });

  it('null devolve vazio', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
