import { Pipe, PipeTransform } from '@angular/core';

// palavras de ligacao: ficam minusculas, menos quando sao a primeira
const LIGACOES = new Set([
  'a', 'o', 'as', 'os', 'e',
  'de', 'da', 'do', 'das', 'dos',
  'em', 'no', 'na', 'nos', 'nas',
  'ao', 'aos', 'com', 'para', 'por'
]);

@Pipe({
  name: 'titulo'
})
export class TituloPipe implements PipeTransform {

  transform(texto: string | null | undefined): string {
    if (!texto) {
      return '';
    }

    // split(/\s+/) de '   ' devolve ['', '']: por isso o trim e o filter
    const palavras = texto
      .trim()
      .split(/\s+/)
      .filter(palavra => palavra.length > 0);

    return palavras
      .map((palavra, posicao) => {
        const minuscula = palavra.toLowerCase();
        if (posicao > 0 && LIGACOES.has(minuscula)) {
          return minuscula;
        }
        return minuscula[0].toUpperCase() + minuscula.slice(1);
      })
      .join(' ');
  }

}
