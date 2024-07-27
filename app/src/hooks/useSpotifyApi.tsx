import { useState, useEffect } from "react";
import axios from "axios";
import { SpotifyUserResponse } from "../interfaces/SpotifyUserResponse";
import { LoginResponse } from "../interfaces/LoginResponse";
import { SpotifySearchResponse } from "../interfaces/SpotifySearchResponse";
import { useAppContext } from "../context/context";

const LOGIN_ENDPOINT = "http://localhost:8000/login";
const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const useSpotifyApi = (authCode: string) => {
  const [error, setError] = useState<string | null>(null);
  const { userData, setUserData } = useAppContext();

  useEffect(() => {
    if (!authCode) return;

    const fetchAccessToken = async () => {
      try {
        const response = await axios.post<LoginResponse>(LOGIN_ENDPOINT, {
          auth: authCode,
        });

        const { accessToken } = response.data;

        axios.defaults.baseURL = SPOTIFY_API_BASE_URL;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';

        // setSpotifyApi(axios);

        const userResponse = await axios.get<SpotifyUserResponse>("/me");
        setUserData(userResponse.data);
      } catch (err) {
        setError("Error initializing Spotify API: " + (err as Error).message);
      }
    };

    fetchAccessToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCode]);

  const search = async (query: string, types: string[]) => {
    try {
      const { data } = await axios.get<SpotifySearchResponse>(`/search`, {
        params: {
          q: query,
          type: types.join(','),
        },
      } as { params: { q: string; type: string } });

      const promises = [] as Promise<any>[];

      Object.entries(data).forEach(([searchGroup, category]) => {
        if (!category || !category.items) return;

        const searchResponseItems = category.items;
        if (searchResponseItems.length === 0) return;

        const ids = searchResponseItems.map((item: any) => item.id);
        
        promises.push(getFavorites(ids, searchGroup));
      });
      
      const results = await Promise.allSettled(promises);

      results.forEach(({ value }: any) => {
        if (value) {
          value.body.forEach((isFavorite: boolean, index: number) => {
            if (typeof data?.[value.type]?.items?.[index] !== 'undefined') {
              // @ts-ignore
              data?.[value?.type]?.items && Object.assign(data[value.type].items[index], { isFavorite: isFavorite });
            }
          })
        }
      });

      return data;
    } catch (err) {
      setError("Error fetching search results: " + (err as Error).message);
      return null;
    }
  };

  const play = async ({ contextUri }: { contextUri: string }) => {
    try {
      await axios.put(`/me/player/play`, {
        context_uri: contextUri,
      });
    } catch (err) {
      setError("Error starting playback: " + (err as Error).message);
    }
  };

  const getFavorites = async (ids: string[], type: string) => {
    try {
      if (type === 'playlists') return ;

      const params: { ids: string, type?: string }= {
        ids: ids.join(','),
      }

      if (type === 'artists') {
        type = 'following';
        params.type = 'artist';
      }

      const response = await axios.get(`/me/${type}/contains`, { 
        params
      })

      return {
        body: response.data,
        type,
      };
    } catch (err) {
      setError("Error fetching favorites: " + (err as Error).message);
      return null;
    }
  };

  const addToFavorites = async (id: string, type: string) => {
    try {
      switch(type) {
        case 'tracks':
          await axios.put(`/me/tracks`, {
            ids: [id],
          })
          break;
        case 'albums':
          await axios.put(`/me/albums`, {
            ids: [id],
          })
          break;
        case 'playlists':
          await axios.put(`/playlists/${id}/tracks`, {
            uris: [id],
          })
          break;
        case 'shows':
          await axios.put(`/me/shows`, {
            ids: [id],
          })
          break;
        case 'artists':
          await axios.put(`/me/following`, {
            ids: [id],
          })
          break;
        case 'episodes':
          await axios.put(`/me/episodes`, {
            ids: [id],
          })
          break;
      }
    } catch (err) {
      setError("Error adding to favorites: " + (err as Error).message);
    }
  };

  const removeFromFavorites = async (id: string, type: string) => {
    try {
      switch(type) {
        case 'tracks':
          await axios.delete(`/me/tracks`, {
            data: { ids: [id] },
          })
          break;
        case 'albums':
          await axios.delete(`/me/albums`, {
            data: { ids: [id] },
          })
          break;
        case 'playlists':
          await axios.delete(`/playlists/${id}/tracks`, {
            data: { tracks: [{ uri: id }] },
          })
          break;
        case 'shows':
          await axios.delete(`/me/shows`, {
            data: { ids: [id] },
          })
          break;
        case 'artists':
          await axios.delete(`/me/following`, {
            data: { ids: [id] },
          })
          break;
        case 'episodes':
          await axios.delete(`/me/episodes`, {
            data: { ids: [id] },
          })
          break;
        default:
          throw new Error(`Invalid type: ${type}`);
      }
    } catch (err) {
      setError("Error removing from favorites: " + (err as Error).message);
    }
  };

  return {
    userData,
    error,
    search,
    play,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
  };
};
