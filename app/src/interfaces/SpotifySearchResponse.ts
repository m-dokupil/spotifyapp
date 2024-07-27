import { SpotifyItem } from "./SpotifyItem";

export interface SpotifySearchResponse {
  [key: string]: {
    map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode; items: SpotifyItem[] 
} | undefined;
}
