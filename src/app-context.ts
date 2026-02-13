import { createContext } from "@lit/context";

export type Location = { city: string; country: string };

export interface AppContext {
  location: Location | undefined;
  setLocation: (location: Location | undefined) => void;
}

export const appContext = createContext<AppContext>({
  location: undefined,
  setLocation: () => {}
});
