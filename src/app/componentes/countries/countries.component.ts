import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country/country.service';
import { Country } from '../../interfaces/country.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatSelectModule} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
/**
 * @class CountriesComponent
 * @description
 * Componente que representa a listagem de países.
 */
export class CountriesComponent implements OnInit {

  /**
   * @property countries
   * @description
   * Lista de países.
   * @property originalCountries
   * @description
   * Lista de países filtrados.
   * @property searchTerm
   * @description
   * Termo de busca.
   *
   */
  countries: Country[] = [];
  originalCountries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  selectedRegion: string = '';

  /**
   * @constructor
   * @param countryService
   * @description
   * Construtor que recebe o serviço de país.
   */
  constructor(
    private countryService: CountryService,
    private router: Router) { }

  /**
   * @method ngOnInit
   * @description
   * Método que é executado ao iniciar o componente.
   * Chama o método para trazer os países.
   */
  ngOnInit() {
    this.bringingCountries();
  }

  /**
   * @method bringingCountry
   * @description
   * Método que traz o país.
   * @param code
   * @description
   * Código do país.
   * Navega para a página de detalhes do país.
   */
  navigateToCountryDetail(code: string) {
    this.router.navigate([`/show-country/${code}`]);
  }

  /**
   * @method bringingCountries
   * @description
   * Método que traz os países.
   * Caso ocorra algum erro, é retornado um array vazio.
   * Caso contrário, a lista de países é ordenada pelo nome comum.
   * A lista original de países é armazenada.
   * A lista de países filtrados é atualizada.
   * @returns
   * Retorna a lista de países.
   */
  bringingCountries() {
    this.countryService.getCountries()
      .pipe(
        catchError(error => {
          console.error('Error fetching countries:', error);
          return of([]);
        })
      )
      .subscribe((data: Country[]) => {
        this.countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        this.originalCountries = [...this.countries];
        this.filterCountries();
      });
  }

  /**
   * @method filterCountries
   * @description
   * Método que filtra os países.
   * @param termoBusca
   * @description
   * Termo de busca.
   * Se não for passado nenhum termo de busca, a lista de países filtrados será a lista original.
   * Caso contrário, a lista de países filtrados será a lista original filtrada pelo termo de busca.
   * @returns
   * Retorna a lista de países filtrados.
   */

  filterCountries(termoBusca = '', region = '') {
    let filtered = this.originalCountries;

    if (termoBusca) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(termoBusca)
      );
    }

    if (region) {
      filtered = filtered.filter(country =>
        country.region.toLowerCase() === region.toLowerCase()
      );
    }

    this.filteredCountries = filtered;
  }

  /**
   * @method onSearchTermChange
   * @description
   * Método que é chamado ao alterar o termo de busca.
   * @param event
   * @description
   * Evento de alteração.
   * O termo de busca é atualizado.
   * O método para filtrar os países é chamado.
   * @returns
   * Retorna o termo de busca.
   */

  onSearchTermChange(event: Event) {
    const termoBusca = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterCountries(termoBusca, this.selectedRegion);
  }

  /**
   * @method onRegionChange
   * @description
   * Método que é chamado ao alterar a região.
   * @param event
   * @description
   * Evento de alteração.
   * A região selecionada é atualizada.
   * O método para filtrar os países é chamado.
   * @returns
   * Retorna a região selecionada.
   */
  onRegionChange(event: Event) {
    this.selectedRegion = (event.target as HTMLSelectElement).value;
    this.filterCountries(this.searchTerm, this.selectedRegion);
  }



}
