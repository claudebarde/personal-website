import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultData } from "../config";

@customElement("twitter-box")
export class TwitterBox extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-rows: 60px auto;
      grid-template-columns: 1fr;
      gap: 0px;
      height: 100%;
      width: 100%;
      position: relative;
    }

    .header {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-top-left-radius: var(--std-radius);
      border-top-right-radius: var(--std-radius);
    }

    .body img.avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid white;
      position: absolute;
      top: 30px;
      left: 15px;
    }

    .info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100%;
    }
    .info .left-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-left: 20px;
      padding-top: 40px;
    }
    .info .left-info h3,
    p {
      margin: 0;
    }
    .info .right-info {
      font-size: 0.8rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  `;

  render() {
    return html`
      <div
        class="header"
        style="background-image: url('${defaultData.twitter.bannerUrl}')"
      ></div>
      <div class="body">
        <img
          class="avatar"
          src="${defaultData.twitter.profilePictureUrl}"
          alt="Twitter Avatar"
        />
        <div class="info">
          <div class="left-info">
            <h3>
              <span>${defaultData.twitter.name}</span>
              <img
                src="/icons/Twitter_Verified_Badge.png"
                alt="Twitter Icon"
                style="width: 20px; height: 20px; vertical-align: middle"
              />
            </h3>
            <p>${defaultData.twitter.handle}</p>
          </div>
          <div class="right-info">${defaultData.twitter.bio}</div>
        </div>
      </div>
    `;
  }
}
