import React, { useState, useEffect, } from "react";
import { useAppContext } from "../context/context";
import { useSpotifyApi } from "../hooks/useSpotifyApi";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { ItemModal } from "./ItemModal";
import { SpotifyItem } from "../interfaces/SpotifyItem";
import { SpotifySearchResponse } from "../interfaces/SpotifySearchResponse";

interface SpotifyPlayerProps {
  authCode: string;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ authCode }) => {
  const spotifyApi = useSpotifyApi(authCode);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SpotifySearchResponse>({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState<SpotifyItem | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { searchTypes } = useAppContext();

  //Remove window query ?code after its consumed
  window.history.pushState({}, document.title, window.location.pathname);

  useEffect(() => {
    if (!authCode) return;
    if (!search || search.trim() === "" || !search.length) {
      setSearchResults({});
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await spotifyApi.search(search, searchTypes);

        response && setSearchResults(response);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, authCode, searchTypes]);

  const handlePlay = (item: SpotifyItem) => {
    spotifyApi.play({ contextUri: item.uri });
  };

  const handleDetails = (item: SpotifyItem) => {
    setModalItem(item);
    setOpenModal(true);
  };

  const handleFavorite = async (item: SpotifyItem, category: string) => {
    const isFavorite = favorites.has(item.id);
    try {
      if (isFavorite) {
        await spotifyApi.removeFromFavorites(item.id, category);
        //@ts-expect-error
        setFavorites((prev) => new Set([...prev].filter((id) => id !== item.id)));
      } else {
        await spotifyApi.addToFavorites(item.id, category);
        setFavorites((prev) => new Set(prev).add(item.id));
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />

      <SearchResults
        results={searchResults}
        onPlay={handlePlay}
        onDetails={handleDetails}
        onFavorite={handleFavorite}
        favorites={favorites}
      />

      {modalItem && (
        <ItemModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          item={modalItem}
        />
      )}
    </>
  );
};
