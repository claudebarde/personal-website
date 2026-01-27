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
  YoutubeInfo,
  getYoutubeBody,
  getChannelVideos,
  type YoutubeData
} from "../utils";
import { defaultData } from "../config";
import type { BoxType } from "../types";
import "./Icon.js";
import { buttonFollow, linkToButton } from "../styles";

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
  @property()
  youtubeInfo?: YoutubeInfo;
  @property()
  youtubeVideos: Array<YoutubeData> = [];

  static styles = [
    buttonFollow,
    linkToButton,
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
        transition:
          transform 300ms ease,
          background-color 300ms ease;
        transform-origin: center;
        will-change: transform;

        .box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      :host(:hover) {
        background-color: #f8f9fa;
        transform: scale(1.1);
        z-index: 999;
      }

      :host p {
        margin: 14px 0px;
      }

      :host([box-type="location"]) {
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      :host([box-type="youtube"]) .box-body {
        display: flex;
        flex-direction: column;
        gap: 0px;
      }
        height: 100%;
        width: 100%;
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
      } else if (this.boxType === "youtube") {
        // gets YouTube videos
        getChannelVideos().then(videos => {
          this.youtubeVideos = videos;
        });
      }
    }
  }

  getBoxBody() {
    switch (this.boxType) {
      case "location":
        return "Under construction 🚧";
      case "youtube":
        if (this.youtubeVideos.length > 0) {
          return getYoutubeBody(this.youtubeVideos, "large");
        } else {
          return "No YouTube data available.";
        }
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
            : this.boxType === "youtube"
              ? "My YouTube Channel"
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
