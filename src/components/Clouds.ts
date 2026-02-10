import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-clouds")
export class Clouds extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
      display: block;
    }

    .cloud {
      position: absolute;
      left: -220px;
      width: 150px;
      height: 48px;
      background: rgba(211, 211, 211, 1);
      border-radius: 999px;
      filter: blur(0.2px);
      animation: drift var(--duration, 70s) linear var(--delay, 0s) infinite;
      transform: scale(var(--scale, 1));
      opacity: var(--opacity, 0.75);
      will-change: transform;
    }

    .cloud::before,
    .cloud::after {
      content: "";
      position: absolute;
      background: inherit;
      border-radius: 50%;
    }

    .cloud::before {
      width: 58px;
      height: 58px;
      left: 18px;
      top: -28px;
    }

    .cloud::after {
      width: 78px;
      height: 78px;
      left: 58px;
      top: -40px;
    }

    @keyframes drift {
      from {
        transform: translateX(0) scale(var(--scale, 1));
      }
      to {
        transform: translateX(calc(100vw + 340px)) scale(var(--scale, 1));
      }
    }
  `;

  private clouds = [
    { top: "8%", scale: 0.9, duration: "90s", delay: "0s", opacity: 0.58 },
    { top: "22%", scale: 1.1, duration: "78s", delay: "-24s", opacity: 0.68 },
    { top: "36%", scale: 0.75, duration: "94s", delay: "-42s", opacity: 0.55 },
    { top: "50%", scale: 1.25, duration: "86s", delay: "-18s", opacity: 0.74 },
    { top: "66%", scale: 0.95, duration: "82s", delay: "-54s", opacity: 0.61 },
    { top: "82%", scale: 1.05, duration: "88s", delay: "-30s", opacity: 0.66 }
  ];

  render() {
    return html`
      ${this.clouds.map(
        cloud => html`
          <div
            class="cloud"
            style=${`top: ${cloud.top}; --scale: ${cloud.scale}; --duration: ${cloud.duration}; --delay: ${cloud.delay}; --opacity: ${cloud.opacity};`}
          ></div>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-clouds": Clouds;
  }
}
