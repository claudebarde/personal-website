import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("youtube-link-large")
export class YouTubeLinkLarge extends LitElement {
  @property()
  title = "";
  @property()
  description = "";
  @property()
  thumbnail = "";
  @property()
  url = "";
  @property()
  publishedAt = "";
  @property()
  viewCount = "";
  @property()
  likeCount = "";

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 3fr;
      padding: 4px;
      margin: 0px 6px;
    }

    :host(:hover) {
      background-color: #ebebeb;
      cursor: pointer;
    }

    .thumbnail {
      width: 100%;
      height: auto;
    }

    .video-info {
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .video-info h4 {
      padding: 0px 0px 0px 10px;
      margin: 0;
    }

    .video-info .published-at {
      font-size: 0.875rem;
      padding: 0px;
      margin: 3px;
      text-align: right;
      font-style: italic;
      color: rgba(0, 0, 0, 0.6);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this.onClick);
  }

  private onClick() {
    // opens the current link in a separate window
    window.open(this.url, "_blank");
  }

  render() {
    return html`
      <img class="thumbnail" src="${this.thumbnail}" alt="Video Thumbnail" />
      <div class="video-info">
        <h4>${this.title}</h4>
        <p class="published-at">
          Published on: ${new Date(this.publishedAt).toLocaleDateString()}
        </p>
      </div>
    `;
  }
}
