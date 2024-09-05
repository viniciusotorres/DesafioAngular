import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../services/country/country.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShowCountryInterface} from "../../interfaces/show-country.interface";
import {forkJoin, map} from "rxjs";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'app-show-country',
  standalone: true,
  imports: [],
  templateUrl: './show-country.component.html',
  styleUrl: './show-country.component.css'
})
/**
 * @class ShowCountryComponent
 * @description
 * Componente que mostra as informações de um país.
 */
export class ShowCountryComponent implements OnInit {
  /**
   * Informações do país.
   */
  country?: any[] = [];
  name!: string;
  nameOficial!: string;
  population!: number;
  region!: string;
  subregion!: string;
  capital!: string[];
  flag!: string;
  topLevelDomain!: string;
  currencies!: string;
  languages!: string;
  borders: { name: string; code: string }[] = [];
  code!: string;



  /**
   * Construtor da classe.
   * @param countryService
   * Serviço que contém as informações dos países.
   */
  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  )
  {}

  /**
   * Método chamado ao iniciar o componente.
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.bringCountryInfo(code);
      }
    });
  }

  /**
   * Método que traz as informações do país.
   * @param code Código do país.
   */
  bringCountryInfo(code: string) {
    this.countryService.getCountryByCode(code)
      .subscribe((country: any) => {
        this.country = country;
        this.name = country[0].name.common;
        this.nameOficial = country[0].name.official;
        this.population = country[0].population;
        this.region = country[0].region;
        this.subregion = country[0].subregion;
        this.capital = country[0].capital;
        this.flag = country[0].flags.svg;
        this.topLevelDomain = country[0].tld.join(', ');

        this.currencies = this.formatCurrencies(country[0].currencies);
        this.languages = this.formatLanguages(country[0].languages);

        const borderCodes = country[0].borders.map((code: string) => code.toLowerCase());
        this.getBorderCountryNames(borderCodes);
      });
  }

  /**
   * Método que formata as moedas.
   * @param currencies Objeto de moedas.
   * @returns String formatada com as moedas.
   */
  private formatCurrencies(currencies: { [key: string]: { name: string; symbol: string } }): string {
    return Object.keys(currencies)
      .map(key => `${currencies[key].name} (${currencies[key].symbol})`)
      .join(', ');
  }

  /**
   * Método que formata os idiomas.
   * @param languages Objeto de idiomas.
   * @returns String formatada com os idiomas.
   */
  private formatLanguages(languages: { [key: string]: string }): string {
    return Object.keys(languages)
      .map(key => languages[key])
      .join(', ');
  }

  /**
   * Método que traz os nomes dos países vizinhos.
   * @param codes
   * Códigos dos países vizinhos.
   */
  getBorderCountryNames(codes: string[]) {
    const requests = codes.map(code => this.countryService.getCountryByCode(code));
    forkJoin(requests).subscribe((countries: any[]) => {
      this.borders = countries.map(country => ({
        name: country[0].name.common,
        code: country[0].ccn3
      }));
    });
  }

  /**
   * Método que volta para a tela de países.
   */
  navigateBack() {
    this.router.navigate(['/']);
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

  bringingCountry(code: string) {
    this.router.navigate([`/show-country/${code}`]);
  }
  }
