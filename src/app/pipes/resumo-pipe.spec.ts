import { ResumoPipe } from './resumo-pipe';

describe('ResumoPipe', () => {
  const pipe = new ResumoPipe();
  const longo = 'Semana de Tecnologia da Unijorge com palestras e oficinas';

  it('sem parametro corta em 30, sem partir palavra', () => {
    expect(pipe.transform(longo)).toBe('Semana de Tecnologia da…');
  });

  it('com limite de 40', () => {
    expect(pipe.transform(longo, 40)).toBe('Semana de Tecnologia da Unijorge com…');
  });

  it('texto menor que o limite volta igual, sem reticencias', () => {
    expect(pipe.transform('Oficina de Angular')).toBe('Oficina de Angular');
  });

  it('limite caindo exatamente no fim de uma palavra', () => {
    expect(pipe.transform('Semana de Tecnologia', 9)).toBe('Semana de…');
  });

  it('palavra unica maior que o limite: corta mesmo', () => {
    expect(pipe.transform('Anticonstitucionalissimamente', 10)).toBe('Anticonsti…');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('null devolve vazio', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
