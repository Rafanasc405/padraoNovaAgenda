import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo'
})
export class ResumoPipe implements PipeTransform {

  /**
   * Corta em "limite" caracteres sem partir palavra e termina com reticencias.
   * O limite vale para o texto; as reticencias vem depois dele.
   */
  transform(texto: string | null | undefined, limite: number = 30): string {
    if (!texto) {
      return '';
    }

    const limpo = texto.trim();
    if (limpo.length <= limite) {
      return limpo;
    }

    let corte = limpo.slice(0, limite);

    // se o caractere seguinte e letra, a palavra foi partida: volta ao ultimo espaco
    const partiuPalavra = limpo[limite] !== ' ';
    if (partiuPalavra) {
      const ultimoEspaco = corte.lastIndexOf(' ');
      // palavra unica maior que o limite: nao ha onde voltar, corta mesmo
      if (ultimoEspaco > 0) {
        corte = corte.slice(0, ultimoEspaco);
      }
    }

    return corte.trimEnd() + '…';
  }

}
