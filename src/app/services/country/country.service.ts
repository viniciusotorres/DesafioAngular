import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Country} from "../../interfaces/country.interface";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

/**
 * Serviço para manipulação de dados de países
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  /**
   * URL da API de países
   */
  private apiCountryUrl = environment.apiCountry;
  private countryDetailApiUrl = environment.showCountry;


  constructor(
    private http: HttpClient
  ) { }


  /**
   * Retorna a lista de países
   * @returns Lista de países
   */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiCountryUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching countries:', error);
          return of([]);
        })
      );
  }

  /**
   * Retorna um país pelo código
   * @param code Código do país
   * @returns País
   */
  getCountryByCode(code: string): Observable<Country | null> {
    return this.http.get<Country>(`${this.countryDetailApiUrl}/${code}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching country with code ${code}:`, error);
          return of(null);
        })
      );
  }
}
