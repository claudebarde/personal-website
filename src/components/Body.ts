import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./SmallBox.js";
import "./MediumBox.js";
import "./LargeBox.js";

@customElement("app-main")
export class Body extends LitElement {
  @state() private isMobile = false;
  private mediaQuery = window.matchMedia("(max-width: 768px)");

  static styles = css`
    :host {
      display: block;
      width: 80%;
      height: 100%;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      gap: 1rem;
      height: 100%;
      width: 100%;
    }

    .grid-item {
      background-color: transparent;
      border: none;
      padding: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .merged {
      grid-row: span 2;
    }

    @media (max-width: 768px) {
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .grid {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .grid-item {
        width: 100%;
        height: 332px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.onMediaChange = this.onMediaChange.bind(this);
    this.mediaQuery.addEventListener("change", this.onMediaChange);
    this.isMobile = this.mediaQuery.matches;
  }

  disconnectedCallback() {
    this.mediaQuery.removeEventListener("change", this.onMediaChange);
    super.disconnectedCallback();
  }

  private onMediaChange(e: MediaQueryListEvent) {
    this.isMobile = e.matches;
  }

  render() {
    return this.isMobile
      ? html`<div class="grid">
          <div class="grid-item">
            <large-box text="Current Location" box-type="location"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="GitHub" box-type="github"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="YouTube" box-type="youtube"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="Twitter" box-type="twitter"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="LinkedIn" box-type="linkedin"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="Telegram" box-type="telegram"></large-box>
          </div>
          <div class="grid-item">
            <large-box text="Blog" box-type="blog"></large-box>
          </div>
        </div>`
      : html`
          <div class="grid">
            <div class="grid-item">
              <small-box
                text="Current Location"
                box-type="location"
              ></small-box>
              <small-box text="GitHub" box-type="github"></small-box>
            </div>
            <div class="grid-item merged">
              <large-box text="YouTube" box-type="youtube"></large-box>
            </div>
            <div class="grid-item">
              <medium-box text="Twitter" box-type="twitter"></medium-box>
            </div>
            <div class="grid-item">
              <small-box text="LinkedIn" box-type="linkedin"></small-box>
              <small-box text="Telegram" box-type="telegram"></small-box>
            </div>
            <div class="grid-item">
              <medium-box text="Blog" box-type="blog"></medium-box>
            </div>
          </div>
        `;
  }
}
