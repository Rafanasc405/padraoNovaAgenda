import { ErrosEvento, RascunhoEvento } from './evento';

/**
 * Contrato de toda funcao daqui:
 *   string -> ha erro, e o texto e a mensagem
 *   null   -> valor valido
 */

export function validarTitulo(titulo: string): string | null {
  const texto = titulo.trim();
  if (texto.length === 0) {
    return 'O título não pode ficar em branco.';
  }
  if (texto.length < 5 || texto.length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }
  return null;
}

export function validarData(data: string): string | null {
  if (data.trim().length === 0) {
    return 'A data não pode ficar em branco.';
  }
  const escolhida = new Date(`${data}T00:00:00`);
  if (Number.isNaN(escolhida.getTime())) {
    return 'Data inválida.';
  }
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  if (escolhida < hoje) {
    return 'A data não pode estar no passado.';
  }
  return null;
}

export function validarLocal(local: string): string | null {
  return local.trim().length === 0 ? 'O local não pode ficar em branco.' : null;
}

export function validarEmailResponsavel(email: string): string | null {
  const texto = email.trim();
  if (texto.length === 0) {
    return 'O e-mail do responsável não pode ficar em branco.';
  }
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return formato.test(texto) ? null : 'E-mail em formato inválido.';
}

export function validarVagas(vagas: number | null): string | null {
  if (vagas === null || vagas === undefined || (vagas as unknown) === '') {
    return 'As vagas não podem ficar em branco.';
  }
  if (!Number.isInteger(vagas) || vagas < 1 || vagas > 200) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }
  return null;
}

/** [CRUZADA] laboratorio comporta no maximo 30 vagas. */
export function validarVagasNoLocal(vagas: number | null, local: string): string | null {
  const ehLaboratorio = local === 'Laboratório 1' || local === 'Laboratório 2';
  if (ehLaboratorio && vagas !== null && vagas > 30) {
    return 'Em laboratório, as vagas podem ser no máximo 30.';
  }
  return null;
}

/** Devolve so os campos com problema. Formulario valido = {}. */
export function validarEvento(rascunho: RascunhoEvento): ErrosEvento {
  const erros: ErrosEvento = {};

  const defina = (campo: keyof ErrosEvento, mensagem: string | null): void => {
    if (mensagem !== null) {
      erros[campo] = mensagem;
    }
  };

  defina('titulo', validarTitulo(rascunho.titulo));
  defina('data', validarData(rascunho.data));
  defina('local', validarLocal(rascunho.local));
  defina('emailResponsavel', validarEmailResponsavel(rascunho.emailResponsavel));
  defina(
    'vagas',
    validarVagas(rascunho.vagas) ?? validarVagasNoLocal(rascunho.vagas, rascunho.local)
  );

  return erros;
}
