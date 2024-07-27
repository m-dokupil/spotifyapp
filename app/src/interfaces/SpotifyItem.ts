export interface SpotifyItem {
  id: string;
  name: string;
  description: string;
  uri: string;
  external_urls: { spotify: string };
  images: { url: string }[];
  preview_url?: string;
  album?: any;
  artists?: { name: string }[];
  isFavorite?: boolean;
}
