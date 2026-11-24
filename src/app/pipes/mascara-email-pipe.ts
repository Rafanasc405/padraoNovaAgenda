import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraEmail'
})
export class MascaraEmailPipe implements PipeTransform {

  /**
   * 'joaosilva1@gmail.com' -> 'jo********@gmail.com'
   * Duas primeiras letras, um * para cada letra escondida e o dominio inteiro.
   *
   * Texto sem formato de e-mail devolve vazio, e nao o original: este pipe
   * existe para esconder dado pessoal, entao na duvida ele nao mostra nada.
   */
  transform(email: string | null | undefined): string {
    if (!email) {
      return '';
    }

    const arroba = email.trim().lastIndexOf('@');
    if (arroba < 1) {
      return '';
    }

    const usuario = email.trim().slice(0, arroba);
    const dominio = email.trim().slice(arroba);

    // usuario curto: mostra so a primeira letra para sempre esconder algo
    const visiveis = usuario.length <= 2 ? 1 : 2;
    return usuario.slice(0, visiveis) + '*'.repeat(usuario.length - visiveis) + dominio;
  }

}
