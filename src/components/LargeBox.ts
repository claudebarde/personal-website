import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  getIconPath,
  GithubInfo,
  TelegramInfo,
  getGithubBody,
  getTelegramBody,
  getGithubInfo,
  getTelegramInfo,
  defaultData
} from "../utils";
import type { BoxType } from "../types";
import "./Icon.js";
import { buttonFollow } from "../styles";

@customElement("large-box")
export class LargeBox extends LitElement {
  @property()
  text = 'Some("undefined")';
  @property({ reflect: true, attribute: "box-type" })
  boxType: BoxType = "empty";
  @property()
  githubInfo?: GithubInfo;
  @property()
  telegramInfo?: TelegramInfo;

  static styles = [
    buttonFollow,
    css`
      :host {
        display: block;
        padding: var(--box-padding);
        margin: 0px 6px;
        border-radius: var(--std-radius);
        height: calc(
          var(--std-box-height) * 2 + 1rem + (2 * var(--box-padding))
        );
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

      :host([box-type="location"]) {
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      @media (max-width: 768px) {
        :host {
          height: var(--mobile-box-height);
        }

        .box-header {
          height: 50px;
        }
      }
    `
  ];

  updated(changed: Map<string, unknown>) {
    if (changed.has("boxType")) {
      // react to boxType change here
      if (this.boxType === "github") {
        getGithubInfo().then(data => {
          if (data?.html_url) {
            this.githubInfo = data;
          }
        });
      } else if (this.boxType === "telegram") {
        getTelegramInfo().then(data => {
          if (data?.url) {
            this.telegramInfo = data;
          }
        });
      }
    }
  }

  getBoxBody() {
    switch (this.boxType) {
      case "location":
        return "Under construction 🚧";
      case "youtube":
        return "Under construction 🚧";
      case "github":
        if (this.githubInfo) {
          return getGithubBody(this.githubInfo, "large");
        } else {
          return "No GitHub data available.";
        }
      case "twitter":
        return "Under construction 🚧";
      case "linkedin":
        return "Under construction 🚧";
      case "telegram":
        if (this.telegramInfo) {
          return getTelegramBody(this.telegramInfo, "large");
        } else {
          return "No Telegram data available.";
        }
      case "blog":
        return "Read my latest articles and tutorials on my blog.";
      default:
        return "";
    }
  }

  render() {
    const iconPath = getIconPath(this.boxType);

    return html`
      <div class="box-header">
        <icon-element
          name="${this.boxType}"
          size="32"
          image="${iconPath}"
        ></icon-element>
        <div>
          ${this.boxType === "location"
            ? `Now in ${defaultData.currentLocation.name}`
            : ""}
        </div>
        <div>
          ${this.boxType === "telegram"
            ? html`<telegram-qr-button></telegram-qr-button>`
            : ""}
        </div>
      </div>
      ${this.boxType === "location"
        ? html`<location-map></location-map>`
        : html`<div class="box-body">${this.getBoxBody()}</div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "large-box": LargeBox;
  }
}
