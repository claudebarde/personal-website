import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import L from "leaflet";
import { defaultData } from "../utils";
import leafletCss from "leaflet/dist/leaflet.css?inline";

@customElement("location-map")
export class LocationMap extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: calc(var(--std-box-height) + var(--box-padding) * 2);
        border-radius: var(--std-radius);
      }

      #map {
        width: 100%;
        height: calc(var(--std-box-height) + var(--box-padding) * 2);
        border-radius: var(--std-radius);
      }

      @media (max-width: 768px) {
        :host {
          height: calc(var(--mobile-box-height) - 50px);
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
        }

        #map {
          width: 100%;
          height: calc(var(--mobile-box-height) - 50px);
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
        }
      }
    `,
    unsafeCSS(leafletCss)
  ];

  firstUpdated() {
    const zoomLevel = 12;
    const el = this.renderRoot.querySelector("#map") as HTMLElement | null;
    if (el) {
      const map = L.map(el, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false
      }).setView(defaultData.currentLocation.coordinates, zoomLevel, {});
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: zoomLevel,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      // adds a marker to the map
      L.marker(defaultData.currentLocation.coordinates).addTo(map);
    }
  }

  render() {
    return html` <div id="map"></div> `;
  }
}
