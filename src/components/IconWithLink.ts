import { html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Icon } from "./Icon.js";

@customElement("icon-with-link")
export class IconWithLink extends Icon {
  @property() linkUrl = "#";
  @property() linkName = "link";

  constructor() {
    super();
  }

  static styles = css`
    :host {
      transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      text-align: center;
      position: relative;
    }

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

    #link-name {
      font-size: 0.5rem;
      opacity: 0;
      position: absolute;
      width: max-content;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      color: inherit;
    }

    :host(:hover) {
      transform: scale(2.2);
      background-color: white;
      border: solid 1px #ddd;
      border-radius: 12px;
      padding: 15px;
      position: relative;
      z-index: 10;
    }

    :host(:hover) #link-name {
      opacity: 1;
    }

    @media (max-width: 768px) {
      :host {
        transform: scale(1.5);
      }
    }
  `;

  render() {
    return html`
      <a
        href="${this.linkUrl}"
        title="${this.linkName}"
        target="_blank"
        rel="noopener noreferrer"
      >
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
        <p id="link-name">${this.linkName}</p>
      </a>
    `;
  }
}
