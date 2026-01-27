import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  getGithubBody,
  getIconPath,
  getTelegramBody,
  GithubInfo,
  TelegramInfo
} from "../utils";
import { BoxType, BoxSize } from "../types";
import "./Icon.js";
import "./TwitterBox.js";
import { buttonFollow } from "../styles";

@customElement("medium-box")
export class MediumBox extends LitElement {
  @property()
  text = 'Some("undefined")';
  @property({ reflect: true, attribute: "box-type" })
  boxType: BoxType = "empty";
  @property()
  githubInfo?: GithubInfo;
  @property()
  telegramInfo?: TelegramInfo;
  @property()
  boxSize: BoxSize = "medium";

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

      :host([box-type="twitter"]) {
        padding: 0px;
      }

      :host p {
        margin: 0;
      }
    `
  ];

  getBoxBody() {
    switch (this.boxType) {
      case "location":
        return "Under construction 🚧";
      case "youtube":
        return "Under construction 🚧";
      case "github":
        if (this.githubInfo) {
          return getGithubBody(this.githubInfo, this.boxSize);
        } else {
          return "No GitHub data available.";
        }
      case "linkedin":
        return "Under construction 🚧";
      case "telegram":
        if (this.telegramInfo) {
          return getTelegramBody(this.telegramInfo, this.boxSize);
        } else {
          return "No Telegram data available.";
        }
      case "blog":
        return "Under construction 🚧";
      default:
        return "";
    }
  }

  render() {
    const iconPath = getIconPath(this.boxType);

    if (this.boxType === "twitter") {
      return html`<twitter-box box-size="medium"></twitter-box>`;
    }

    return html`
      <div>
        <div class="box-header">
          <icon-element
            name="${this.boxType}"
            size="32"
            image="${iconPath}"
          ></icon-element>
        </div>
        <div class="box-body">${this.getBoxBody()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "medium-box": MediumBox;
  }
}
