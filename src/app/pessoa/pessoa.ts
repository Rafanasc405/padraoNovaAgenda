import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type UFOrigem = '' | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' |
  'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' |
  'RR' | 'SC' | 'SP' | 'SE' | 'TO';

type CampoPessoa =
  | 'nomeCompleto'
  | 'dataNascimento'
  | 'cpf'
  | 'rg'
  | 'nomeMae'
  | 'nomePai'
  | 'paisOrigem'
  | 'ufOrigem'
  | 'email'
  | 'telefone'
  | 'homePage';

type ErrosPessoa = Partial<Record<CampoPessoa, string>>;
type CamposTocados = Partial<Record<CampoPessoa, boolean>>;

@Component({
  selector: 'app-pessoa',
  imports: [FormsModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css'
})
export class Pessoa {
  readonly titulo = 'Cadastro de pessoa';
  readonly ufs: UFOrigem[] = ['', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  rascunho = {
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    nomeMae: '',
    nomePai: '',
    paisOrigem: '',
    ufOrigem: '' as UFOrigem,
    email: '',
    telefone: '',
    homePage: ''
  };

  tocados: CamposTocados = {};

  get erros(): ErrosPessoa {
    const erros: ErrosPessoa = {};

    const validarNome = (valor: string): string | null => {
      if (!valor.trim()) return 'O nome completo nao pode ficar em branco.';
      if (valor.trim().length < 3) return 'O nome completo deve ter entre 3 e 80 caracteres.';
      if (/\d/.test(valor)) return 'O nome completo nao pode conter numeros.';
      return null;
    };

    const validarData = (valor: string): string | null => {
      if (!valor.trim()) return 'A data de nascimento nao pode ficar em branco.';
      const nascimento = new Date(`${valor}T00:00:00`);
      if (Number.isNaN(nascimento.getTime())) return 'Data de nascimento invalida.';
      const hoje = new Date();
      if (nascimento > hoje) return 'A data de nascimento nao pode estar no futuro.';
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      const aindaNaoFezAniversario = mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate());
      if (aindaNaoFezAniversario) idade -= 1;
      return idade >= 16 && idade <= 120 ? null : 'A idade deve estar entre 16 e 120 anos.';
    };

    const validarCpf = (valor: string): string | null => {
      const digitos = valor.replace(/\D/g, '');
      if (!valor.trim()) return 'O CPF nao pode ficar em branco.';
      return digitos.length === 11 ? null : 'O CPF deve ter 11 digitos.';
    };

    const validarRg = (valor: string): string | null => {
      if (!valor.trim()) return 'O RG nao pode ficar em branco.';
      if (valor.replace(/\D/g, '').length < 5) return 'O RG deve ter ao menos 5 digitos.';
      return null;
    };

    const validarEmail = (valor: string): string | null => {
      if (!valor.trim()) return 'O e-mail nao pode ficar em branco.';
      const formato = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return formato.test(valor.trim()) ? null : 'E-mail em formato invalido.';
    };

    const validarTelefone = (valor: string): string | null => {
      if (!valor.trim()) return 'O telefone nao pode ficar em branco.';
      const digitos = valor.replace(/\D/g, '');
      return digitos.length === 11 ? null : 'O telefone deve ter 11 digitos.';
    };

    const validarHome = (valor: string): string | null => {
      if (!valor.trim()) return null;
      const formato = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+(?:[\/\w .?%&=-]*)*$/i;
      return formato.test(valor.trim()) ? null : 'A home page deve iniciar com http:// ou https://.';
    };

    const campos: Array<[CampoPessoa, string | null]> = [
      ['nomeCompleto', validarNome(this.rascunho.nomeCompleto)],
      ['dataNascimento', validarData(this.rascunho.dataNascimento)],
      ['cpf', validarCpf(this.rascunho.cpf)],
      ['rg', validarRg(this.rascunho.rg)],
      ['nomeMae', this.rascunho.nomeMae.trim() ? null : 'O nome da mae nao pode ficar em branco.'],
      ['nomePai', this.rascunho.nomePai.trim() ? null : 'O nome do pai nao pode ficar em branco.'],
      ['paisOrigem', this.rascunho.paisOrigem.trim() ? null : 'O pais de origem nao pode ficar em branco.'],
      ['ufOrigem', this.rascunho.ufOrigem ? null : 'A UF de origem e obrigatoria.'],
      ['email', validarEmail(this.rascunho.email)],
      ['telefone', validarTelefone(this.rascunho.telefone)],
      ['homePage', validarHome(this.rascunho.homePage)]
    ];

    for (const [campo, mensagem] of campos) {
      if (mensagem) {
        erros[campo] = mensagem;
      }
    }

    return erros;
  }

  get quantidadeDeErros(): number {
    return Object.keys(this.erros).length;
  }

  get temErro(): boolean {
    return this.quantidadeDeErros > 0;
  }

  deveMostrar(campo: CampoPessoa): boolean {
    return this.tocados[campo] === true && this.erros[campo] !== undefined;
  }

  mensagem(campo: CampoPessoa): string {
    return this.erros[campo] ?? '';
  }

  marcarTocado(campo: CampoPessoa): void {
    this.tocados[campo] = true;
  }

  mostrarTudo(): void {
    const campos = Object.keys(this.rascunho) as CampoPessoa[];
    for (const campo of campos) {
      this.tocados[campo] = true;
    }
  }

  limpar(): void {
    this.rascunho = {
      nomeCompleto: '',
      dataNascimento: '',
      cpf: '',
      rg: '',
      nomeMae: '',
      nomePai: '',
      paisOrigem: '',
      ufOrigem: '' as UFOrigem,
      email: '',
      telefone: '',
      homePage: ''
    };
    this.tocados = {};
  }

  salvar(): void {
    if (this.temErro) {
      this.mostrarTudo();
      return;
    }

    console.log('Dados salvos:', this.rascunho);
    this.limpar();
  }
}

