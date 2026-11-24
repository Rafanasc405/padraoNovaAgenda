import { MascaraEmailPipe } from './mascara-email-pipe';

describe('MascaraEmailPipe', () => {
  const pipe = new MascaraEmailPipe();

  it('duas letras, asteriscos e dominio inteiro', () => {
    expect(pipe.transform('joaosilva1@gmail.com')).toBe('jo********@gmail.com');
  });

  it('um asterisco para cada letra escondida', () => {
    expect(pipe.transform('maria@exemplo.com')).toBe('ma***@exemplo.com');
  });

  it('usuario curto: ainda esconde algo', () => {
    expect(pipe.transform('ab@x.com')).toBe('a*@x.com');
  });

  it('usuario de uma letra', () => {
    expect(pipe.transform('a@x.com')).toBe('a@x.com');
  });

  it('sem arroba devolve vazio', () => {
    expect(pipe.transform('naoeumemail')).toBe('');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('null devolve vazio', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
