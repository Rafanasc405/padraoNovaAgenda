import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pessoa } from './pessoa/pessoa';
import { Padrao } from './padrao/padrao';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { NaoEncontrada } from './nao-encontrada/nao-encontrada';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home',   component: Home },
  { path: 'pessoa', component: Pessoa },
  { path: 'padrao', component: Padrao },
  { path: 'eventos/novo', component: CadastroEvento },

  // curinga: precisa ser SEMPRE a ultima rota
  { path: '**', component: NaoEncontrada }
];
