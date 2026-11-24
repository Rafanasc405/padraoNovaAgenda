import { DiasParaPipe } from './dias-para-pipe';

describe('DiasParaPipe', () => {
  const pipe = new DiasParaPipe();
  const hoje = new Date(2026, 10, 10);   // 10/11/2026 (o mes comeca em 0)

  it('mesmo dia: Hoje', () => {
    expect(pipe.transform('2026-11-10', hoje)).toBe('Hoje');
  });

  it('dia seguinte: Amanha', () => {
    expect(pipe.transform('2026-11-11', hoje)).toBe('Amanhã');
  });

  it('daqui a 10 dias', () => {
    expect(pipe.transform('2026-11-20', hoje)).toBe('Faltam 10 dias');
  });

  it('daqui a 21 dias (virando o mes)', () => {
    expect(pipe.transform('2026-12-01', hoje)).toBe('Faltam 21 dias');
  });

  it('dia anterior: Encerrado', () => {
    expect(pipe.transform('2026-11-09', hoje)).toBe('Encerrado');
  });

  it('vazio devolve vazio', () => {
    expect(pipe.transform('', hoje)).toBe('');
  });

  it('a hora do hoje nao interfere', () => {
    expect(pipe.transform('2026-11-10', new Date(2026, 10, 10, 23, 59))).toBe('Hoje');
  });
});
