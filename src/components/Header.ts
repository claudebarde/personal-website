import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./Icon.js";

@customElement("app-header")
export class AppHeader extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 30px;
      align-items: center;
      box-shadow: var(--std-box-shadow);
      background-color: #ffffff;
      padding: 10px 20px;
      border-radius: var(--std-radius);
      width: 70%;
    }

    :host img {
      border-radius: 50%;
    }

    :host h4 {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    @media (max-width: 768px) {
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        text-align: center;
      }
    }
  `;

  render() {
    return html`
      <div>
        <img src="avatar.png" alt="Logo" width="150" />
      </div>
      <div>
        <h1>Claude Barde</h1>
        <h3>Shadowy Super Coder | Crypto Dev | FPV Pilot</h3>
        <h4>
          Current position: Developer Relations @ Midnight
          <icon-element
            name="midnight-white"
            size="18"
            image="midnight-white.png"
            bgStyle="black"
          ></icon-element>
        </h4>
      </div>
    `;
  }
}
