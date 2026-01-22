import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getIconPath } from "../utils";
import { BoxType } from "../types";
import "./Icon.js";
import { buttonFollow } from "../styles";

@customElement("medium-box")
export class MediumBox extends LitElement {
  @property()
  text = 'Some("undefined")';
  @property({ reflect: true, attribute: "box-type" })
  boxType: BoxType = "empty";

  static styles = [
    buttonFollow,
    css`
      :host {
        display: block;
        padding: var(--box-padding);
        margin: 0px 6px;
        border-radius: var(--std-radius);
        height: var(--std-box-height);
        width: 100%;
        background-color: #ffffff;
        box-shadow: var(--std-box-shadow);

        .box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      :host p {
        margin: 0;
      }
    `
  ];

  render() {
    const iconPath = getIconPath(this.boxType);

    return html`
      <div>
        <div class="box-header">
          <icon-element
            name="${this.boxType}"
            size="32"
            image="${iconPath}"
          ></icon-element>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "medium-box": MediumBox;
  }
}
