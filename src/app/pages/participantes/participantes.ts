import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Evento } from '../../models/evento';
import { Participante } from '../../models/participante';
import { DiasParaPipe } from '../../pipes/dias-para-pipe';
import { FormaPagamentoPipe } from '../../pipes/forma-pagamento-pipe';
import { IniciaisPipe } from '../../pipes/iniciais-pipe';
import { TelefonePipe } from '../../pipes/telefone-pipe';

/**
 * Os dados abaixo sao um array fixo: o criterio desta tela e o pipe, nao a
 * integracao. Repare que tudo esta guardado CRU (data 'aaaa-mm-dd', telefone
 * so com digitos, pagamento em codigo). Quem deixa bonito e o template.
 */
@Component({
  selector: 'app-participantes',
  imports: [DatePipe, DiasParaPipe, FormaPagamentoPipe, IniciaisPipe, TelefonePipe],
  templateUrl: './participantes.html',
  styleUrl: './participantes.css'
})
export class Participantes {

  readonly eventos: Evento[] = [
    { id: 1, titulo: 'Semana de Tecnologia', data: '2026-12-04', local: 'Auditório', emailResponsavel: 'tecnologia@unijorge.edu.br', vagas: 150 },
    { id: 2, titulo: 'Oficina de Angular', data: '2026-11-12', local: 'Laboratório 1', emailResponsavel: 'angular@unijorge.edu.br', vagas: 30 },
    { id: 3, titulo: 'Palestra de Carreira', data: '2026-12-18', local: 'Sala 101', emailResponsavel: 'carreira@unijorge.edu.br', vagas: 60 }
  ];

  readonly participantes: Participante[] = [
    { id: 1, eventoId: 1, descricao: 'Maria da Silva Santos', email: 'maria@exemplo.com', telefone: '71988887777', formaPagamento: 'pix' },
    { id: 2, eventoId: 1, descricao: 'joão guedes de brito', email: 'joao@exemplo.com', telefone: '7133334444', formaPagamento: 'cartao' },
    { id: 3, eventoId: 1, descricao: 'Ana', email: 'ana@exemplo.com', telefone: '123', formaPagamento: '' },
    { id: 4, eventoId: 2, descricao: 'Rafael Nascimento', email: 'rafael@exemplo.com', telefone: '(71) 98888-7777', formaPagamento: 'boleto' },
    { id: 5, eventoId: 2, descricao: 'Kelly Cristina Souza', email: 'kelly@exemplo.com', telefone: '71977776666', formaPagamento: 'dinheiro' }
  ];

  participantesDo(eventoId: number): Participante[] {
    return this.participantes.filter(p => p.eventoId === eventoId);
  }
}
