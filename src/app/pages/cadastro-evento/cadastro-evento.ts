import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CampoEvento,
  ErrosEvento,
  Evento,
  LOCAIS,
  RascunhoEvento,
  eventoEmBranco
} from '../../models/evento';
import { validarEvento } from '../../models/evento.validacao';

@Component({
  selector: 'app-cadastro-evento',
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {

  readonly locais: string[] = LOCAIS;

  rascunho: RascunhoEvento = eventoEmBranco();

  tocados: Partial<Record<CampoEvento, boolean>> = {};

  eventos: Evento[] = [];

  get erros(): ErrosEvento {
    return validarEvento(this.rascunho);
  }

  get temErro(): boolean {
    return Object.keys(this.erros).length > 0;
  }

  deveMostrar(campo: CampoEvento): boolean {
    return this.tocados[campo] === true && this.erros[campo] !== undefined;
  }

  mensagem(campo: CampoEvento): string {
    return this.erros[campo] ?? '';
  }

  marcarTocado(campo: CampoEvento): void {
    this.tocados[campo] = true;
  }

  salvar(): void {
    if (this.temErro) {
      for (const campo of Object.keys(this.rascunho) as CampoEvento[]) {
        this.tocados[campo] = true;
      }
      return;
    }

    this.eventos = [...this.eventos, { id: this.proximoId(), ...this.rascunho }];
    this.limpar();
  }

  limpar(): void {
    this.rascunho = eventoEmBranco();
    this.tocados = {};
  }

  remover(id: number): void {
    this.eventos = this.eventos.filter(e => e.id !== id);
  }

  private proximoId(): number {
    return this.eventos.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  }
}
