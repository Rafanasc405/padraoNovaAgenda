import { TituloPipe } from './titulo-pipe';

describe('TituloPipe', () => {
  const pipe = new TituloPipe();

  it('ligacoes ficam minusculas no meio', () => {
    expect(pipe.transform('semana de tecnologia da unijorge'))
      .toBe('Semana de Tecnologia da Unijorge');
  });

  it('tudo maiusculo: normaliza e mantem ligacao minuscula', () => {
    expect(pipe.transform('DE VOLTA AO CAMPUS')).toBe('De Volta ao Campus');
  });

  it('ligacao na primeira posicao fica maiuscula', () => {
    expect(pipe.transform('da silva')).toBe('Da Silva');
  });

  it('so espacos devolve vazio', () => {
    expect(pipe.transform('   ')).toBe('');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('null devolve vazio', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('espacos sobrando entre as palavras', () => {
    expect(pipe.transform('  oficina   de   angular ')).toBe('Oficina de Angular');
  });
});
