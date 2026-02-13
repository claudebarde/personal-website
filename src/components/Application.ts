import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import "./Header.js";
import "./Body.js";
import "./Modal.js";
import "./ContactBox.js";
import "./Clouds.js";
import { appContext, type AppContext, type Location } from "../app-context.js";

@customElement("lit-app")
export class LitApp extends LitElement {
  private updateLocation = (location: Location | undefined) => {
    this.appContext = { ...this.appContext, location };
    if (location?.city && location?.country) {
      this.city = `${this.slugify(location.city)}-${this.slugify(location.country)}`;
    }
  };

  @provide({ context: appContext }) appContext: AppContext = {
    location: undefined,
    setLocation: this.updateLocation
  };
  @property({ type: Boolean, reflect: true }) isModalOpen = false;
  @property({ type: String }) city = "";
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      position: relative;
      isolation: isolate;
      height: calc(100vh - 40px);
      width: calc(100vw - 40px);
      padding: 20px;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
    }

    :host::before {
      content: "";
      position: fixed;
      inset: 0;
      background-color: #f6f5f1;
      background-image: var(--bg-image);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.4;
      pointer-events: none;
      z-index: 0;
    }

    .foreground {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
    }
  `;

  private onQrCodeClick() {
    this.isModalOpen = true;
  }

  private slugify(value: string) {
    if (value.toLowerCase() == "united kingdom") {
      return "uk";
    }

    return value.trim().toLowerCase().replace(/\s+/g, "-");
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("city")) {
      this.style.setProperty("--bg-image", `url("/bg-maps/${this.city}.png")`);
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <app-clouds></app-clouds>
      <div class="foreground">
        <app-header></app-header>
        <app-main @qr-code-click=${this.onQrCodeClick}></app-main>
        <contact-box></contact-box>
        <app-modal
          ?open=${this.isModalOpen}
          @close-modal=${() => (this.isModalOpen = false)}
          trigger="telegram-qr-code"
        ></app-modal>
      </div>
    `;
  }
}
