import { Routes } from '@angular/router';
import {CountriesComponent} from "./componentes/countries/countries.component";
import {ShowCountryComponent} from "./componentes/show-country/show-country.component";

/**
 * Definição de rotas da aplicação
 */
export const routes: Routes = [

  /**
   * Rota para a página inicial da aplicação que lista os países
   */
  {
    path: '',
    component: CountriesComponent
  },

  /**
   * Rota para a página de detalhes de um país
   */
  {
    path: 'show-country/:code',
    component: ShowCountryComponent
  }
];
