import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * @class ThemeModeService
 * @description
 * Serviço que gerencia o tema da aplicação.
 */
export class ThemeModeService {
  private isDarkMode: boolean = false;
  private renderer: Renderer2;

  /**
   * @constructor
   * @description
   * Inicializa o serviço e verifica o tema salvo no localStorage.
   * @param {RendererFactory2} rendererFactory - Fábrica para criar instância do Renderer2.
   */
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  /**
   * @method toggleMode
   * @description
   * Alterna o estado do tema entre claro e escuro, e salva no localStorage.
   */
  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyMode();
  }

  /**
   * @method applyMode
   * @description
   * Aplica o tema da aplicação adicionando/removendo classes no body.
   */
  applyMode(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  /**
   * @method isDark
   * @description
   * Retorna o estado atual do tema.
   * @returns {boolean} - Se o tema atual é o modo escuro ou não.
   */
  isDark(): boolean {
    return this.isDarkMode;
  }
}
