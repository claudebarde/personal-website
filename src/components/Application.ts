import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./Header.js";
import "./Body.js";
import "./Modal.js";
import "./ContactBox.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  @property({ type: Boolean, reflect: true }) isModalOpen = false;
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      height: calc(100vh - 40px);
      width: calc(100vw - 40px);
      padding: 20px;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
    }
  `;

  private onQrCodeClick() {
    this.isModalOpen = true;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <app-header></app-header>
      <app-main @qr-code-click=${this.onQrCodeClick}></app-main>
      <contact-box></contact-box>
      <app-modal
        ?open=${this.isModalOpen}
        @close-modal=${() => (this.isModalOpen = false)}
        trigger="telegram-qr-code"
      ></app-modal>
    `;
  }
}
