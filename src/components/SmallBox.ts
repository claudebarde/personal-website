import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { BoxType } from "../types";
import "./Icon.js";
import "./TelegramQrButton.js";
import "./LocationMap.js";
import {
  getIconPath,
  getGithubInfo,
  getGithubBody,
  type GithubInfo,
  type TelegramInfo,
  getTelegramInfo,
  getTelegramBody
} from "../utils";
import { buttonFollow, linkToButton } from "../styles";

@customElement("small-box")
export class SmallBox extends LitElement {
  @property()
  text = "";
  @property({ reflect: true, attribute: "box-type" })
  boxType: BoxType = "empty";
  @property()
  githubInfo?: GithubInfo;
  @property()
  telegramInfo?: TelegramInfo;

  static styles = [
    buttonFollow,
    linkToButton,
    css`
      :host {
        display: grid;
        grid-template-rows: 1fr 2fr;
        padding: var(--box-padding);
        margin: 0px 6px;
        border-radius: var(--std-radius);
        height: var(--std-box-height);
        width: 50%;
        background-color: #ffffff;
        box-shadow: var(--std-box-shadow);
        transition:
          transform 300ms ease,
          background-color 300ms ease;
        transform-origin: center;
        will-change: transform;
      }

      .box-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      :host([box-type="github"]) {
        cursor: pointer;
      }
      :host(:hover) {
        background-color: #f8f9fa;
        transform: scale(1.1);
      }

      :host([box-type="location"]) {
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      :host p {
        margin: 0;
      }

      :host span#github-handle {
        display: inline-block;
        transform: translateX(100px);
        opacity: 0;
        font-style: italic;
        transition:
          transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s,
          opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s;
      }

      :host(:hover) span#github-handle {
        transform: translateX(0);
        opacity: 1;
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.onClick);
  }

  private onClick() {
    // opens the current link in a separate window
    if (this.boxType === "github" && this.githubInfo?.html_url) {
      window.open(this.githubInfo.html_url, "_blank");
    }
  }

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
          return getGithubBody(this.githubInfo, "small");
        } else {
          return "No GitHub data available.";
        }
      case "twitter":
        return "Under construction 🚧";
      case "linkedin":
        return "Under construction 🚧";
      case "telegram":
        if (this.telegramInfo) {
          return getTelegramBody(this.telegramInfo, "small");
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

    // Early return for location box type
    if (this.boxType === "location") {
      return html`<location-map></location-map>`;
    }

    return html`
      <div class="box-header">
        <icon-element
          name="${this.boxType}"
          size="32"
          image="${iconPath}"
        ></icon-element>
        <div>
          ${this.boxType === "telegram"
            ? html`<telegram-qr-button></telegram-qr-button>`
            : this.boxType === "github"
              ? html`<span id="github-handle">@claudebarde</span>`
              : ""}
        </div>
      </div>
      <div class="box-body">${this.getBoxBody()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "small-box": SmallBox;
  }
}
