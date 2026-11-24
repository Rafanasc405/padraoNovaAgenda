import { Pipe, PipeTransform } from '@angular/core';

const LIGACOES = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

@Pipe({
  name: 'iniciais'
})
export class IniciaisPipe implements PipeTransform {

  transform(nome: string | null | undefined): string {
    if (!nome) {
      return '';
    }

    const partes = nome
      .trim()
      .split(/\s+/)
      .filter(parte => parte.length > 0 && !LIGACOES.has(parte.toLowerCase()));

    if (partes.length === 0) {
      return '';
    }

    const primeira = partes[0][0];
    if (partes.length === 1) {
      return primeira.toUpperCase();
    }

    const ultima = partes[partes.length - 1][0];
    return (primeira + ultima).toUpperCase();
  }

}
