import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("icon-element")
export class Icon extends LitElement {
  @property() name = "";
  @property({ type: Number }) size = 18;
  @property() image = "/icons/default.svg";
  @property() bgStyle: "transparent" | "black" | "white" = "transparent";

  static styles = css`
    :host .black {
      background-color: #111111;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 4px;
      margin: 0 4px;
    }

    :host .white {
      background-color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 4px;
      margin: 0 4px;
    }

    :host .transparent {
      background-color: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      padding: 4px;
      margin: 0 4px;
    }
  `;

  render() {
    return html`
      <img
        class="${this.bgStyle === "black"
          ? "black"
          : this.bgStyle === "white"
            ? "white"
            : "transparent"}"
        src="${this.image}"
        alt="${this.name} icon"
        width="${this.size}"
        height="${this.size}"
      />
    `;
  }
}
