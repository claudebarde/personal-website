import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultData } from "../config";
import { getIconPath } from "../utils";
import "./Icon.js";

type ContactItem = {
  name: string;
  url: string;
  iconType: string;
};

@customElement("contact-box")
export class ContactBox extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 8px 12px;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: var(--std-box-shadow);
      border: solid 1px rgba(0, 0, 0, 0.1);
    }

    a.contact-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 4px;
      transition:
        transform 200ms ease,
        background-color 200ms ease;
    }

    a.contact-link:hover {
      transform: translateY(-2px);
      background-color: #f3f4f6;
    }

    @media (max-width: 768px) {
      :host {
        bottom: 12px;
        padding: 6px 10px;
        width: 70%;
        background-color: rgba(255, 255, 255, 0.9);
        justify-content: space-around;
      }
    }
  `;

  private contactItems: ContactItem[] = [
    {
      name: "Email",
      url: `mailto:${defaultData.email}`,
      iconType: "email"
    },
    {
      name: "GitHub",
      url: defaultData.github.url,
      iconType: "github"
    },
    {
      name: "Telegram",
      url: defaultData.telegram.url,
      iconType: "telegram"
    },
    {
      name: "X",
      url: defaultData.twitter.url,
      iconType: "twitter"
    }
  ];

  render() {
    return html`
      ${this.contactItems.map(
        item => html`
          <a
            class="contact-link"
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="${item.name}"
            title="${item.name}"
          >
            <icon-element
              name="${item.iconType}"
              size="20"
              image="${getIconPath(item.iconType)}"
            ></icon-element>
          </a>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "contact-box": ContactBox;
  }
}
