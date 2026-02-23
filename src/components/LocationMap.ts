import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { appContext, type AppContext } from "../app-context";
import L from "leaflet";
import { defaultData } from "../config";
import leafletCss from "leaflet/dist/leaflet.css?inline";

@customElement("location-map")
export class LocationMap extends LitElement {
  @property()
  currentLocationIsloaded = false;
  @property({ reflect: true, attribute: "box-size" })
  boxSize: "small" | "medium" | "large" = "small";
  @consume({ context: appContext }) appContext!: AppContext;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: calc(var(--std-box-height) + var(--box-padding) * 2);
        border-radius: var(--std-radius);
      }

      :host([box-size="large"]) #map-title {
        display: none;
      }

      #map {
        width: 100%;
        height: calc(var(--std-box-height) + var(--box-padding) * 2);
        border-radius: var(--std-radius);
        position: relative;
        background-color: #e0e0e0;
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
          height: 100%;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
        }

        #map {
          width: 100%;
          height: 100%;
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
        if (!currentLocation.ok) {
          throw new Error("Unable to fetch current location.");
        }

        const locationData: {
          data: {
            coordinates: [number, number];
            city: string | null;
            country: string | null;
          };
        } = await currentLocation.json();

        if (locationData.data.city && locationData.data.country) {
          this.appContext.setLocation({
            city: locationData.data.city,
            country: locationData.data.country
          });
        }

        return locationData.data.coordinates;
      } catch (_error) {
        // default location is set to London, UK
        this.appContext.setLocation({
          city: defaultData.currentLocation.name.city,
          country: defaultData.currentLocation.name.country
        });
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
    const showMapTitle = this.boxSize !== "large";

    return html`<div id="map">
      ${this.currentLocationIsloaded
        ? html`${showMapTitle
              ? html`<div id="map-title">Current location</div>`
              : ""}
            <div id="map-plane">✈️</div>`
        : html`${showMapTitle ? html`<div id="map-title">Loading...</div>` : ""}`}
    </div>`;
  }
}
