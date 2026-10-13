export interface Evento {
  id: number;
  titulo: string;
  data: string;            // o <input type="date"> devolve 'aaaa-mm-dd'
  local: string;
  emailResponsavel: string;
  vagas: number | null;    // o <input type="number"> vazio vale null
}

/** O que esta sendo digitado: tudo do Evento, menos o id (gerado ao salvar). */
export type RascunhoEvento = Omit<Evento, 'id'>;

export type CampoEvento = keyof RascunhoEvento;

export type ErrosEvento = Partial<Record<CampoEvento, string>>;

export const LOCAIS: string[] = ['Auditório', 'Laboratório 1', 'Laboratório 2', 'Sala 101'];

export function eventoEmBranco(): RascunhoEvento {
  return {
    titulo: '',
    data: '',
    local: '',
    emailResponsavel: '',
    vagas: null
  };
}
