import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import L from "leaflet";
import { defaultData } from "../config";
import leafletCss from "leaflet/dist/leaflet.css?inline";

@customElement("location-map")
export class LocationMap extends LitElement {
  @property()
  currentLocationIsloaded = false;

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
        position: relative;
      }

      #map-title {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        z-index: 1000;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;
        text-align: center;
        box-shadow: var(--std-box-shadow);
      }

      #map-plane {
        position: absolute;
        bottom: -1.5rem;
        left: -1.5rem;
        z-index: 999;
        font-size: 1.5rem;
        animation: map-plane-fly 15s ease-in-out 2s infinite;
        will-change: left, bottom;
      }

      @keyframes map-plane-fly {
        from {
          bottom: -1.5rem;
          left: -1.5rem;
        }
        to {
          left: calc(100% + 1.5rem);
          bottom: calc(100% + 1.5rem);
        }
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

  async firstUpdated() {
    const getCoordinates = async () => {
      try {
        const currentLocation = await fetch(
          "/.netlify/functions/fetchCurrentLocation"
        );
        const locationData: { data: { coordinates: [number, number] } } =
          await currentLocation.json();
        return locationData.data.coordinates;
      } catch (_error) {
        return defaultData.currentLocation.coordinates;
      }
    };

    const coordinates = await getCoordinates();
    if (!coordinates) {
      this.currentLocationIsloaded = true;
      return;
    }

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
      }).setView(coordinates, zoomLevel, {});
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: zoomLevel,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      // adds a marker to the map
      L.marker(coordinates).addTo(map);
      this.currentLocationIsloaded = true;
    }
  }

  render() {
    return html`<div id="map">
      ${this.currentLocationIsloaded
        ? html`<div id="map-title">Current location</div>
            <div id="map-plane">✈️</div>`
        : html`<div id="map-title">Loading...</div>`}
    </div>`;
  }
}
