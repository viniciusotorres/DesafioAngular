import { Component, OnInit } from '@angular/core';
import {ThemeModeService} from "../../services/theme-mode/theme-mode.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
/**
 * @class NavBarComponent
 * @description
 * Componente que representa a barra de navegação da aplicação.
 */

export class NavBarComponent implements OnInit {
  isDarkMode: boolean = false;

  /**
   * @constructor
   * @param themeModeService
   * @description
   * Construtor que recebe o serviço de tema.
   * Aplica o tema da aplicação.
   *
   */
  constructor(
    private themeModeService: ThemeModeService,
  ) { }

  /**
   * @method ngOnInit
   * @description
   * Método que é executado ao iniciar o componente.
   * Aplica o tema da aplicação.
   */
  ngOnInit(): void {
    this.isDarkMode = this.themeModeService.isDark();
    this.themeModeService.applyMode()
  }

  /**
   * @method changeTheme
   * @description
   * Método que altera o tema da aplicação.
   */
  changeTheme() {
    this.themeModeService.toggleMode();
    this.isDarkMode = this.themeModeService.isDark();
  }

}
