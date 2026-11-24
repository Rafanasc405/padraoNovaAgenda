import { Pipe, PipeTransform } from '@angular/core';

const UM_DIA_EM_MS = 24 * 60 * 60 * 1000;

@Pipe({
  name: 'diasPara'
})
export class DiasParaPipe implements PipeTransform {

  /**
   * "hoje" entra como parametro: na tela ninguem o passa e vale a data real;
   * no teste a gente passa uma data fixa e a tabela vale em qualquer dia.
   *
   * Nada de new Date('2026-11-20'): data so com dia e lida em UTC, e em
   * Salvador (UTC-3) isso ja seria dia 19. As duas datas sao montadas com
   * Date.UTC para nenhuma sofrer fuso.
   */
  transform(data: string | null | undefined, hoje: Date = new Date()): string {
    if (!data) {
      return '';
    }

    const partes = data.split('-').map(Number);
    if (partes.length !== 3 || partes.some(p => Number.isNaN(p))) {
      return '';
    }
    const [ano, mes, dia] = partes;

    const alvo = Date.UTC(ano, mes - 1, dia);
    const base = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const dias = Math.round((alvo - base) / UM_DIA_EM_MS);

    if (dias < 0) {
      return 'Encerrado';
    }
    if (dias === 0) {
      return 'Hoje';
    }
    if (dias === 1) {
      return 'Amanhã';
    }
    return `Faltam ${dias} dias`;
  }

}
