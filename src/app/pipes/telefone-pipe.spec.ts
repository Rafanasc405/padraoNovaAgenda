import { TelefonePipe } from './telefone-pipe';

describe('TelefonePipe', () => {
  const pipe = new TelefonePipe();

  it('formata celular (11 digitos)', () => {
    expect(pipe.transform('71988887777')).toBe('(71) 98888-7777');
  });

  it('formata fixo (10 digitos)', () => {
    expect(pipe.transform('7133334444')).toBe('(71) 3333-4444');
  });

  it('ja formatado: limpa e formata de novo, da o mesmo', () => {
    expect(pipe.transform('(71) 98888-7777')).toBe('(71) 98888-7777');
  });

  it('nao reconhece: devolve como chegou', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('null devolve vazio', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('')).toBe('');
  });
});
