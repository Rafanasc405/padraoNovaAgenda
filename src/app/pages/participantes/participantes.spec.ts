import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { Participantes } from './participantes';

registerLocaleData(localePt);

describe('Participantes', () => {
  let fixture: ComponentFixture<Participantes>;
  let texto: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participantes],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
    }).compileComponents();

    fixture = TestBed.createComponent(Participantes);
    fixture.detectChanges();
    texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
  });

  it('mostra a data no formato brasileiro', () => {
    expect(texto).toContain('04/12/2026');
  });

  it('mostra o dia da semana por extenso em portugues', () => {
    expect(texto).toContain('sexta-feira, 4 de dezembro');
  });

  it('formata o telefone', () => {
    expect(texto).toContain('(71) 98888-7777');
    expect(texto).toContain('(71) 3333-4444');
  });

  it('traduz a forma de pagamento', () => {
    expect(texto).toContain('Cartão de crédito');
    expect(texto).toContain('Não informado');
  });

  it('mostra as iniciais do participante', () => {
    expect(texto).toContain('MS');
    expect(texto).toContain('JB');
  });

  it('marca evento passado como Encerrado', () => {
    expect(texto).toContain('Encerrado');
  });

  it('nao altera o dado guardado', () => {
    expect(fixture.componentInstance.participantes[0].telefone).toBe('71988887777');
    expect(fixture.componentInstance.eventos[0].data).toBe('2026-12-04');
  });
});
