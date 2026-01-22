import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("telegram-qr-button")
export class TelegramQrButton extends LitElement {
  @property() label = "Open Telegram QR";
  @property() image = "/icons/qr-code.svg";

  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
    }

    img {
      width: 32px;
      height: 32px;
      display: block;
      padding: 4px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.onClick);
  }

  private onClick() {
    this.dispatchEvent(
      new CustomEvent("qr-code-click", { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <button type="button" aria-label="${this.label}">
        <img src="${this.image}" alt="" />
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "telegram-qr-button": TelegramQrButton;
  }
}
