import React from "react";
import { Box, Typography } from "@mui/material";
import { SpotifyItem } from "../interfaces/SpotifyItem";
import { ItemCard } from "./ItemCard";
import { SpotifySearchResponse } from "../interfaces/SpotifySearchResponse";

interface SearchResultsProps {
  results: SpotifySearchResponse;
  onPlay: (item: SpotifyItem) => void;
  onDetails: (item: SpotifyItem) => void;
  onFavorite: (item: SpotifyItem, category: string) => void;
  favorites: Set<string>;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onPlay, onDetails, onFavorite, favorites }) => {
  return (
    <Box>
      {Object.entries(results).map(([category, items]) => (
        <Box key={category} sx={{ maxWidth: '550px', backgroundColor: '#f0f0f0', p: 1 }}>
          <Typography variant="h5">{category.toUpperCase()}</Typography>
          {items && items.items.length === 0 && <Typography variant="body1">No results found</Typography>}
          {items && items.items.map((item) => (
            <ItemCard
              category={category}
              key={item.id}
              item={item}
              onPlay={() => onPlay(item)}
              onDetails={() => onDetails(item)}
              onFavorite={() => onFavorite(item, category)}
              isFavorite={favorites.has(item.id)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
