import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./Icon.js";

@customElement("app-modal")
export class AppModal extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: "telegram-qr-code" }) trigger = "";

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      display: block;
      z-index: 1000;
      pointer-events: none;
    }

    :host([open]) {
      pointer-events: auto;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 300ms ease;
    }

    :host([open]) .backdrop {
      opacity: 1;
    }

    .modal {
      position: absolute;
      inset: 50%;
      transform: translate(-50%, -50%) scale(0.98);
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      width: 50vw;
      height: 50vh;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition:
        opacity 200ms ease,
        transform 200ms ease;
    }

    :host([open]) .modal {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
    }

    .close-modal {
      background: none;
      border: none;
      cursor: pointer;
    }

    .modal-content {
      width: 100%;
      height: calc(100% - 40px);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
    }

    @media (max-width: 768px) {
      .modal {
        width: 90vw;
        height: 70vh;
      }
    }
  `;

  private closeModal() {
    this.dispatchEvent(
      new CustomEvent("close-modal", { bubbles: true, composed: true })
    );
  }

  private modalHeader() {
    if (this.trigger === "telegram-qr-code") {
      return html`<h2>Scan Telegram QR Code</h2>`;
    }
  }

  private modalContent() {
    if (this.trigger === "telegram-qr-code") {
      return html`<img src="telegram-qr-code.JPG" alt="Telegram QR Code" />`;
    }
    return html`<slot></slot>`;
  }

  render() {
    return html`
      <div class="backdrop" @click=${this.closeModal}></div>
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          ${this.modalHeader()}
          <button
            @click=${this.closeModal}
            aria-label="Close modal"
            class="close-modal"
          >
            <icon-element
              name="close"
              size="32"
              image="icons/close.svg"
            ></icon-element>
          </button>
        </div>
        <div class="modal-content">${this.modalContent()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-modal": AppModal;
  }
}
